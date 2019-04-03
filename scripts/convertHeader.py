import argparse
import re
import os

re_getDate = re.compile(r'<small>.*([0-9]{4}-[0-9]{2}-[0-9]{2}).*</small>')
re_getTitle = re.compile(r'^#\s([A-Za-z\s]+)$')

parser = argparse.ArgumentParser(description='Process note md files')
parser.add_argument('path', help="path to the .md files")
parser.add_argument('--category')
args = parser.parse_args()

for file in os.listdir(args.path):
    if not file.endswith('.md'):
        continue

    filepath = os.path.join(args.path, file)
    mdlines = list()
    date = ''
    title = ''

    with open(filepath, 'r', encoding='utf-8') as mdfile:
        mdlines = mdfile.readlines()

        combinedLines = ''.join(mdlines)

        # for line in mdlines:
        dateMatches = re_getDate.findall(line)
        titleMatches = re_getTitle(line)

        if dateMatches:
            assert len(dateMatches) == 1
            date = dateMatches[0]
        
        if titleMatches:
            assert len(titleMatches) == 1
            title = titleMatches[0]


    with open(filepath, 'w', encoding='utf-8') as mdfile:

        front_matter = False
        for line in mdlines:

            stripped = line.strip('\n')

            if stripped == '---' and not front_matter:
                front_matter = True
                mdfile.write(line)
                mdfile.write('date: {}\n'.format(date))
            
            elif stripped == '---' and front_matter:
                front_matter = False

            elif stripped.startswith('title: ') and front_matter:
                mdfile.write('title: {}\n'.format(title))

            elif stripped == '# {}'.format(title):
                continue

            elif stripped == ':floppy_disk: [Go Back](/documents)':
                continue

            elif re_getDate.findall(stripped):
                continue
            
            elif stripped == '[TOC]':
                mdfile.write('-toc\n')
                mdfile.write('{:toc}\n')

            else:
                mdfile.write(line)
