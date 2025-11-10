#!/usr/bin/env python3
"""
Copyright Image Scanner

This script scans the repository for external image references that may be copyrighted.
It identifies image links pointing to external sites (non-relative URLs) and offers to
replace them with a local placeholder image.

Usage:
    python3 copyright_image_scanner.py [--auto-replace]

Options:
    --auto-replace    Automatically replace all external image references without prompting

Safelist:
    Create a file at scripts/safe_image_urls.txt to specify trusted URLs/domains that
    should not be flagged. One pattern per line. Lines starting with # are comments.
    
    Examples:
        # Trusted image hosting
        i.imgur.com
        images.unsplash.com
        
        # Specific image URL
        https://example.com/images/licensed-photo.jpg
        
        # Wildcard domain
        *.cloudfront.net
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Dict, Tuple


# Configuration
REPO_ROOT = Path(__file__).parent.parent.resolve()
PLACEHOLDER_IMAGE = "assets/img/placement-e.jpeg"
SAFELIST_FILE = REPO_ROOT / "scripts" / "safe_image_urls.txt"
EXCLUDED_DIRS = {'.git', '_site', 'node_modules', '__pycache__', '.venv', 'venv'}
FILE_EXTENSIONS = {'.md', '.html', '.htm', '.markdown'}


class ImageReference:
    """Represents an external image reference found in a file."""
    
    def __init__(self, file_path: Path, line_num: int, line_content: str, 
                 url: str, match_type: str):
        self.file_path = file_path
        self.line_num = line_num
        self.line_content = line_content
        self.url = url
        self.match_type = match_type  # 'markdown', 'html_img', 'html_longdesc', etc.
    
    def __repr__(self):
        return (f"ImageReference(file={self.file_path.relative_to(REPO_ROOT)}, "
                f"line={self.line_num}, type={self.match_type})")


def load_safelist() -> set:
    """
    Load the safelist of URLs that should not be flagged.
    The safelist file should contain one URL/domain pattern per line.
    Lines starting with # are treated as comments.
    Supports:
      - Full URLs: https://example.com/image.jpg
      - Domain patterns: example.com
      - Wildcard patterns: *.example.com
    """
    safelist = set()
    
    if not SAFELIST_FILE.exists():
        return safelist
    
    try:
        with open(SAFELIST_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                # Skip empty lines and comments
                if line and not line.startswith('#'):
                    safelist.add(line)
    except (UnicodeDecodeError, PermissionError) as e:
        print(f"Warning: Could not read safelist file: {e}")
    
    return safelist


def is_external_url(url: str) -> bool:
    """
    Check if a URL is external (not a relative path).
    Returns True for http://, https://, and // URLs.
    """
    url = url.strip()
    return (url.startswith('http://') or 
            url.startswith('https://') or 
            url.startswith('//'))


def is_safelisted(url: str, safelist: set) -> bool:
    """
    Check if a URL is in the safelist.
    Supports exact matches and domain-based matching.
    """
    if not safelist:
        return False
    
    url = url.strip()
    
    # Check for exact match
    if url in safelist:
        return True
    
    # Check for domain matches
    for safe_pattern in safelist:
        # Simple domain matching
        if safe_pattern in url:
            return True
        
        # Wildcard pattern matching (e.g., *.example.com)
        if safe_pattern.startswith('*.'):
            domain = safe_pattern[2:]
            if domain in url:
                return True
    
    return False


def scan_file(file_path: Path, safelist: set) -> List[ImageReference]:
    """
    Scan a single file for external image references.
    Supports multiple formats: Markdown, HTML img tags, HTML longdesc attributes.
    Only returns references that are not in the safelist.
    """
    references = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except (UnicodeDecodeError, PermissionError):
        # Skip binary files or files we can't read
        return references
    
    for line_num, line in enumerate(lines, start=1):
        # Pattern 1: Markdown image syntax ![alt](url)
        md_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
        for match in re.finditer(md_pattern, line):
            url = match.group(2)
            if is_external_url(url) and not is_safelisted(url, safelist):
                references.append(ImageReference(
                    file_path, line_num, line.rstrip(), url, 'markdown'
                ))
        
        # Pattern 2: HTML <img src="url"> tag
        img_pattern = r'<img[^>]+src=["\']([^"\']+)["\']'
        for match in re.finditer(img_pattern, line, re.IGNORECASE):
            url = match.group(1)
            if is_external_url(url) and not is_safelisted(url, safelist):
                references.append(ImageReference(
                    file_path, line_num, line.rstrip(), url, 'html_img'
                ))
        
        # Pattern 3: HTML longdesc attribute (used in some documents)
        longdesc_pattern = r'longdesc=["\']([^"\']+)["\']'
        for match in re.finditer(longdesc_pattern, line, re.IGNORECASE):
            url = match.group(1)
            if is_external_url(url) and not is_safelisted(url, safelist):
                references.append(ImageReference(
                    file_path, line_num, line.rstrip(), url, 'html_longdesc'
                ))
        
        # Pattern 4: YAML/Front matter image fields (e.g., "image: http://...")
        yaml_pattern = r'^\s*image:\s*["\']?([^"\']+)["\']?\s*$'
        match = re.match(yaml_pattern, line, re.IGNORECASE)
        if match:
            url = match.group(1)
            if is_external_url(url) and not is_safelisted(url, safelist):
                references.append(ImageReference(
                    file_path, line_num, line.rstrip(), url, 'yaml_frontmatter'
                ))
        
        # Pattern 5: HTML/Markdown thumbnail fields
        thumbnail_pattern = r'thumbnail:\s*["\']?([^"\']+)["\']?'
        for match in re.finditer(thumbnail_pattern, line, re.IGNORECASE):
            url = match.group(1)
            if is_external_url(url) and not is_safelisted(url, safelist):
                references.append(ImageReference(
                    file_path, line_num, line.rstrip(), url, 'yaml_thumbnail'
                ))
    
    return references


def scan_repository() -> Dict[Path, List[ImageReference]]:
    """
    Scan the entire repository for external image references.
    Returns a dictionary mapping file paths to lists of references.
    """
    print(f"Scanning repository: {REPO_ROOT}")
    print(f"Looking for files with extensions: {', '.join(FILE_EXTENSIONS)}")
    
    # Load safelist
    safelist = load_safelist()
    if safelist:
        print(f"Loaded {len(safelist)} safe URL pattern(s) from safelist")
    else:
        print(f"No safelist found at {SAFELIST_FILE.relative_to(REPO_ROOT)}")
        print("(Create this file to exclude trusted domains/URLs)")
    print()
    
    results = {}
    file_count = 0
    
    for root, dirs, files in os.walk(REPO_ROOT):
        # Remove excluded directories from traversal
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
        
        for file in files:
            file_path = Path(root) / file
            
            # Check if file has a relevant extension
            if file_path.suffix.lower() not in FILE_EXTENSIONS:
                continue
            
            file_count += 1
            references = scan_file(file_path, safelist)
            
            if references:
                results[file_path] = references
    
    print(f"Scanned {file_count} files.")
    print(f"Found external image references in {len(results)} files.")
    print()
    
    return results


def print_report(results: Dict[Path, List[ImageReference]]):
    """Print a detailed report of all external image references found."""
    print("=" * 80)
    print("EXTERNAL IMAGE REFERENCE REPORT")
    print("=" * 80)
    print()
    
    if not results:
        print("✓ No external image references found!")
        return
    
    total_refs = sum(len(refs) for refs in results.values())
    print(f"Found {total_refs} external image reference(s) in {len(results)} file(s)")
    print()
    
    for file_path in sorted(results.keys()):
        rel_path = file_path.relative_to(REPO_ROOT)
        refs = results[file_path]
        
        print(f"File: {rel_path}")
        print(f"  {len(refs)} reference(s) found:")
        print()
        
        for ref in refs:
            print(f"  Line {ref.line_num} [{ref.match_type}]:")
            print(f"    URL: {ref.url}")
            # Show truncated line content
            preview = ref.line_content[:100]
            if len(ref.line_content) > 100:
                preview += "..."
            print(f"    Context: {preview}")
            print()
        
        print("-" * 80)
        print()


def replace_in_file(file_path: Path, references: List[ImageReference]) -> int:
    """
    Replace external image URLs with the placeholder image in a single file.
    Returns the number of replacements made.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except (UnicodeDecodeError, PermissionError) as e:
        print(f"  ✗ Error reading file: {e}")
        return 0
    
    original_content = content
    replacements = 0
    
    # Sort references by line number in reverse to avoid offset issues
    sorted_refs = sorted(references, key=lambda r: (r.line_num, r.line_content), reverse=True)
    
    for ref in sorted_refs:
        # Different replacement strategies based on match type
        if ref.match_type == 'markdown':
            # Replace URL in markdown syntax
            old_pattern = re.escape(ref.url)
            new_url = f"/{PLACEHOLDER_IMAGE}"
            content = re.sub(
                rf'(!\[[^\]]*\]\(){old_pattern}(\))',
                rf'\g<1>{new_url}\g<2>',
                content
            )
            replacements += 1
        
        elif ref.match_type in ['html_img', 'html_longdesc']:
            # Replace URL in HTML attributes
            old_pattern = re.escape(ref.url)
            new_url = f"/{PLACEHOLDER_IMAGE}"
            content = re.sub(
                rf'(["\']){old_pattern}(["\'])',
                rf'\g<1>{new_url}\g<2>',
                content
            )
            replacements += 1
        
        elif ref.match_type in ['yaml_frontmatter', 'yaml_thumbnail']:
            # Replace URL in YAML fields
            old_pattern = re.escape(ref.url)
            new_url = f"/{PLACEHOLDER_IMAGE}"
            content = re.sub(
                rf'({re.escape(ref.match_type.split("_")[1])}:\s*["\']?){old_pattern}(["\']?)',
                rf'\g<1>{new_url}\g<2>',
                content
            )
            replacements += 1
    
    # Only write if changes were made
    if content != original_content:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return replacements
        except PermissionError as e:
            print(f"  ✗ Error writing file: {e}")
            return 0
    
    return 0


def perform_replacements(results: Dict[Path, List[ImageReference]], auto: bool = False):
    """
    Perform replacements of external image URLs with the placeholder.
    If auto is False, prompts the user for confirmation.
    """
    if not results:
        print("No external image references to replace.")
        return
    
    total_refs = sum(len(refs) for refs in results.values())
    
    print()
    print("=" * 80)
    print("REPLACEMENT OPERATION")
    print("=" * 80)
    print()
    print(f"This will replace {total_refs} external image reference(s)")
    print(f"in {len(results)} file(s) with: /{PLACEHOLDER_IMAGE}")
    print()
    
    if not auto:
        response = input("Do you want to proceed with the replacement? (yes/no): ").strip().lower()
        if response not in ['yes', 'y']:
            print("Replacement cancelled.")
            return
        print()
    
    total_replaced = 0
    files_modified = 0
    
    for file_path, refs in results.items():
        rel_path = file_path.relative_to(REPO_ROOT)
        print(f"Processing: {rel_path}")
        
        replaced = replace_in_file(file_path, refs)
        if replaced > 0:
            total_replaced += replaced
            files_modified += 1
            print(f"  ✓ Replaced {replaced} reference(s)")
        else:
            print(f"  ✗ No replacements made")
    
    print()
    print("=" * 80)
    print(f"✓ Replacement complete!")
    print(f"  Modified {files_modified} file(s)")
    print(f"  Replaced {total_replaced} image reference(s)")
    print("=" * 80)


def main():
    """Main entry point for the script."""
    auto_replace = '--auto-replace' in sys.argv
    
    print()
    print("Copyright Image Scanner")
    print("=" * 80)
    print()
    
    # Verify we're in the correct directory
    if not (REPO_ROOT / '.git').exists():
        print("⚠ Warning: Not in a git repository root!")
        response = input("Continue anyway? (yes/no): ").strip().lower()
        if response not in ['yes', 'y']:
            print("Aborted.")
            return
    
    # Verify placeholder image exists
    placeholder_path = REPO_ROOT / PLACEHOLDER_IMAGE
    if not placeholder_path.exists():
        print(f"⚠ Warning: Placeholder image not found at {placeholder_path}")
        print("Continuing scan, but replacement will use this path anyway.")
        print()
    
    # Scan repository
    results = scan_repository()
    
    # Print report
    print_report(results)
    
    # Offer replacement
    if results:
        print()
        response = input("Do you want to replace these references? (yes/no): ").strip().lower()
        if response in ['yes', 'y']:
            perform_replacements(results, auto=auto_replace)
        else:
            print("No replacements made.")
    
    print()
    print("Done.")


if __name__ == '__main__':
    main()
