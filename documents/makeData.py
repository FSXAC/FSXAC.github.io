# Make a data .yml file for documents
import json

doc_manifest = None

with open('documents/documents.json', 'r', encoding='utf-8') as manifest:
	try:
		doc_manifest = json.load(manifest)
	except:
		pass

out = ''


for category in doc_manifest['docs']:
	category_name = category['category']

	out += f'- category: {category_name}\n'
	out += f'  courses:\n'

	for course in category['courses']:

		course_number = course['course']
		course_name = course['description']
		date = course['date']
		entries = course['entries']
		
		out += f'  - course_num: \'{course_number}\'\n'
		out += f'    course_name: \'{course_name}\'\n'

		if date:
			out += f'    date: {date}\n'

		if entries:
			out += f'    entries:\n'

			for entry in entries:
				entry_title = entry['title']
				out += f'    - title: \'{entry_title}\'\n'

				if 'enum' in entry:
					entry_enums = entry['enum']
					entry_links = entry['links']

					assert len(entry_enums) == len(entry_links)

					out += f'      group:\n'

					for i in range(len(entry_enums)):
						enum = entry_enums[i]
						link = entry_links[i]

						out += f'      - enum: {enum}\n'
						out += f'        link: {link}\n'

				else:
					entry_link = entry['link']
					entry_flag = entry['flag']

					out += f'      link: \'{entry_link}\'\n'

					if entry_flag:
						out += f'      flag: {entry_flag}\n'




with open('_data/documents.yml', 'w', encoding='utf-8') as data:
	data.write(out)
