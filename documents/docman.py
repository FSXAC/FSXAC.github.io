import json
from pprint import pprint

# path = './documents/documentsTEST.json'
path = './documents/documents.json'
outpath = './documents/documentsTEST.json'
docdata = None
with open(path, 'r') as f:
	docdata = json.load(f)

if docdata == None:
	print('Cannot load document JSON')
	exit()

def displayHelp(subject):
	if subject is None:
		print('DocMan is a small script to help organize the documents in muchen.ca/documents')
		print('\tadd\tAdd new category, course, or document entry')
		print('\tedit\tEdit a particular document entry')
		print('\thelp\tHelp page (you are here)')
		print('\tlist\tList all items')
		print('\tremove\tRemove a particular document entry')
		print('\tverify\tVerify that the links are working')
		print('\tquit\tQuit the program')
	elif subject == 'add':
		print('Usage: `add <category | course | document>`')
	elif subject == 'edit':
		print('Usage: `edit <category | course | document>`')
	elif subject == 'remove':
		print('Usage: `remove <category | course | document>`')

def saveData():
	with open(outpath, 'w') as f:
		json.dump(docdata, f)

def getCategoryNames():
	return [
	 cat['category'].lower() for cat in docdata['docs']
	]

def getCategoryIndex(categoryName, ignoreCase = False):
	index = 0
	for category in docdata['docs']:
		if ignoreCase:
			if category['category'].lower() == categoryName.lower():
				return index
		else:
			if category['category'] == categoryName:
				return index
		index += 1
	return -1

def getCourseNames(inputCategory):
	for category in docdata['docs']:
		if category['category'].lower() == inputCategory.lower():
			return [
			 course['course'].lower() for course in category['courses']
			]

	return None

def getCourseById(courseName):
	for category in docdata['docs']:
		for course in category['courses']:
			if course['course'].lower() == courseName.lower():
				return course
	return None


def listDocs(keyword=''):
	if keyword == '':
		for category in docdata['docs']:
			catName = category['category']
			print('[' + catName + ']' + '=' * (32 - len(catName)))

			count = 0
			for course in category['courses']:
				print('\t' + course['course'], end='')
				count += 1
				if count % 4 == 0:
					print('')
			print('')
	else:
		catIndex = getCategoryIndex(keyword, ignoreCase=True)
		course = getCourseById(keyword)

		if catIndex != -1:
			category = docdata['docs'][catIndex]
			catName = category['category']
			print('[' + catName + ']' + '=' * (32 - len(catName)))

			count = 0
			for course in category['courses']:
				print('\t' + course['course'], end='')
				count += 1
				if count % 4 == 0:
					print('')
			print('')

		if course is not None:
			courseName = course['course']
			print('[' + courseName + ']' + '*' * (32 - len(courseName)))
			for entry in course['entries']:
				print('\t' + entry['title'])

				if 'enum' in entry:
					print('\t\t', end='')
					for e in entry['enum']:
						print('[' + str(e) + ']', end='')
					print('')


def listAllCourses():
	count = 0
	for category in docdata['docs']:
		for course in category['courses']:
			print('\t' + course['course'], end='')
			count += 1
			if count % 4 == 0:
				print('')
	print('')

def addEntryCategory():
	categoryNames = getCategoryNames()

	newCategoryName = ''
	while newCategoryName == '':
		categoryName = input('Enter category name: ')
		if categoryName == '':
			return None

		if categoryName.lower() not in categoryNames:
			newCategoryName = categoryName
		else:
			print('Category with name \"' + categoryName + '\" already exists')

	docdata['docs'].append({ 'category': newCategoryName, 'courses': []})
	saveData()
	print('New category created: ' + newCategoryName)


def addEntryCourse():
	categoryNames = getCategoryNames()
	if len(categoryNames) < 1:
		print('Please add a category first')
		return None

	print('Select a category:')
	for categoryName in categoryNames:
		print('\t' + categoryName)

	chooseCategory = ''
	while chooseCategory == '':
		categoryName = input('Choose category: ')
		if categoryName == '':
			return None

		if categoryName in categoryNames:
			chooseCategory = categoryName

	# Find all existing course names
	courseNames = getCourseNames(chooseCategory)
	print(courseNames)

	# Enter course name and append
	newCourseName = ''
	while newCourseName == '':
		courseName = input('Enter course name (enter nothing to cancel): ')
		if courseName == '':
			return None

		if courseName.lower() not in courseNames:
			newCourseName = courseName
		else:
			print('Coruse \"' + courseName + '\" already exists')

	# Ask for more details
	courseDesc = input('Course description: ')

	# Add
	categoryIndex = getCategoryIndex(chooseCategory)
	docdata['docs'][categoryIndex]['courses'].append({
		'course': newCourseName.upper(),
		'description': courseDesc,
		'entries': []
	})

	# Save
	saveData()
	print('Added new course: ', courseName, '(' + courseDesc + ')')


def addEntryDocument():
	# Select course to add
	print('Choose a course to add to: ')
	listAllCourses()

	# course select
	courseSel = input('Choose a course (enter nothing to cancel):')
	course = getCourseById(courseSel)
	if course is None:
		print('Non existent course; aborting!')
		return None

def addEntry(kind):
	if kind == 'category':
		addEntryCategory()
	elif kind == 'course':
		addEntryCourse()
	elif kind == 'document':
		addEntryDocument()

def continueProgram():
	commandInput = input('[DocMan] > ').split(' ')
	command = commandInput[0]
	hasNoArgs = len(commandInput) <= 1
	commandArgs = commandInput[1:]

	if command == 'quit':
		return False
	elif command == 'help':
		if hasNoArgs:
			displayHelp(None)
		else:
			displayHelp(commandArgs[0])
	elif command == 'add':
		if hasNoArgs:
			displayHelp('add')
		elif commandArgs[0] in ['category', 'course', 'document']:
			addEntry(commandArgs[0])
		else:
			displayHelp('add')
	elif command == 'list':
		if hasNoArgs:
			listDocs()
		else:
			listDocs(' '.join(commandArgs[0:]))
	else:
		displayHelp(None)

	return True

while True:
	if not continueProgram():
		break
