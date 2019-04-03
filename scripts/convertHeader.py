import argparse
import re
import os

re_getDate = re.compile(r'<small>.*([0-9]{4}-[0-9]{2}-[0-9]{2}).*</small>')
re_getTitle = re.compile(r'[^#]#\s(.+)\n')

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
    multipleH1s = False

    print(filepath)
    with open(filepath, 'r', encoding='utf-8') as mdfile:
        mdlines = mdfile.readlines()

        combinedLines = ''.join(mdlines)

        # for line in mdlines:
        dateMatches = re_getDate.findall(combinedLines)
        titleMatches = re_getTitle.findall(combinedLines)

        if dateMatches:
            print(dateMatches)
            assert len(dateMatches) == 1
            date = dateMatches[0]
        
        if titleMatches:
            print(titleMatches)
            if len(titleMatches) > 1:
                multipleH1s = True

            title = titleMatches[0]

    if not date or not title:
        continue

    with open(filepath, 'w', encoding='utf-8') as mdfile:

        init_front_matter = False
        front_matter = False
        for line in mdlines:

            stripped = line.strip('\n')

            if stripped == '---' and not front_matter:
                mdfile.write(line)
                if not init_front_matter:
                    front_matter = True
                    mdfile.write('date: {}\n'.format(date))
                    mdfile.write('categories: {}\n'.format(args.category))
                    init_front_matter = True
            
            elif stripped == '---' and front_matter:
                front_matter = False
                mdfile.write(line)

            elif stripped.startswith('title: ') and front_matter and not multipleH1s:
                mdfile.write('title: {}\n'.format(title))

            elif stripped == '# {}'.format(title):
                continue

            elif stripped == ':floppy_disk: [Go Back](/documents)':
                continue

            elif re_getDate.findall(stripped):
                continue
            
            elif stripped == '[TOC]':
                mdfile.write('- toc\n')
                mdfile.write('{:toc}\n')

            else:
                mdfile.write(line)
