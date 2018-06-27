import json
from pprint import pprint

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

def getCategoryIndex(categoryName):
	"""TODO: returns the index by category name"""

def getCourseNames(inputCategory):
	for category in docdata['docs']:
		if category['category'].lower() == inputCategory.lower():
			return [
			 course['course'].lower() for course in category['courses']
			]

	return None

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
	print('Select a category:')
	for categoryName in categoryNames:
		print(' >\t' + categoryName)

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

	# Add
	categoryIndex = 
	docdata['docs']

def addEntry(kind):
	if kind == 'category':
		addEntryCategory()
	elif kind == 'course':
		addEntryCourse()
	elif kind == 'document':
		print('addEntryDocument()')

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
	else:
		displayHelp(None)

	return True

while True:
	if not continueProgram():
		break
