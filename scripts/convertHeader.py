import argparse
import re
import os

re_getDate = re.compile(r'<small>.*([0-9]{4}-[0-9]{2}-[0-9]{2}).*</small>')

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

    with open(filepath, 'r', encoding='utf-8') as mdfile:
        mdlines = mdfile.readlines()

        for line in mdlines:
            dateMatches = re_getDate.findall(line)
            if dateMatches:
                date = dateMatches[0]
                break

    first_opening = True
    with open(filepath, 'w', encoding='utf-8') as mdfile:
        for line in mdlines:

            stripped = line.strip('\n')
            
            if stripped == '---' and first_opening:
                mdfile.write('date: {}'.format(date))
                first_opening = False
                mdfile.write(line)

            elif stripped == ':floppy_disk: [Go Back](/documents)':
                continue

            elif re_getDate.findall(stripped):
                continue
            
            elif stripped == '[TOC]':
                mdfile.write('-toc\n')
                mdfile.write('{:toc}')
