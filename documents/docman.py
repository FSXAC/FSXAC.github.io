import json
from pprint import pprint
from datetime import datetime

path = './documents/documents.json'
outpath = './documents/documents.json'
docdata = None
with open(path, 'r') as f:
	docdata = json.load(f)

if docdata == None:
	print('Cannot load document JSON')
	exit()

def keepAskingInList(prompt, acceptanceList, inversed = False, rejectPrompt = '', emptyToCancel = True):
	userInput = input(prompt)
	if not inversed:
		while userInput not in acceptanceList:
			if userInput == '' and emptyToCancel:
				return ''
			if rejectPrompt != '':
				print(rejectPrompt)
			userInput = input(prompt)
		return userInput
	else:
		while userInput in acceptanceList:
			if userInput == '' and emptyToCancel:
				return ''
			if rejectPrompt != '':
				print(rejectPrompt)
			userInput = input(prompt)
		return userInput

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

	return True

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

def getCategoryByName(categoryName):
	for category in docdata['docs']:
		if category['category'].lower() == categoryName.lower():
			return category

	return None

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

def getCourseGroupedListNames(course):
	entryList = []
	for entry in course['entries']:
		if 'enum' in entry:
			entryList.append(entry)
	return entryList

def getCourseGroupedListByTitle(course, title):
	for entry in course['entries']:
		if 'enum' in entry and title.lower() == entry['title'].lower():
			return entry
	return None

def getTodayDate():
	now = datetime.now()
	return ('%04d-%02d-%02d' % (now.year, now.month, now.day))

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

def listGroupedEntries(course):
	groupedEntryList = getCourseGroupedListNames(course)

	print(course['course'] + ' grouped entries:')
	for groupedEntry in groupedEntryList:
		print('\t', groupedEntry['title'])

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
	if saveData():
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
	# print(courseNames)

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
	categoryToAdd = getCategoryByName(chooseCategory)
	if categoryToAdd is None:
		print('Error occured; aborting...')
		return None

	categoryToAdd['courses'].append({
		'course': newCourseName.upper(),
		'description': courseDesc,
		'date': getTodayDate(),
		'entries': []
	})

	# Save
	if saveData():
		print('Added new course: ', courseName, '(' + courseDesc + ')')

def addEntryDocument():
	# Select course to add
	print('Choose a course to add to: ')
	listAllCourses()

	# course select
	courseSel = input('Choose a course (enter nothing to cancel): ')
	if courseSel == '':
		return None
	course = getCourseById(courseSel)
	while course is None:
		courseSel = input('Choose a course (enter nothing to cancel): ')
		if courseSel == '':
			return None
		course = getCourseById(courseSel)

	# Ask for grouped entry
	inputGrouped = input('Add to a grouped entry? (y/n): ')
	addToGrouped = inputGrouped.lower() in ['y', 'yes']

	if addToGrouped:
		# Display a list of grouped in the course
		listGroupedEntries(course)

		# Ask which one to add to add to
		groupEntryTitles = [groupEntry['title'].lower() for groupEntry in getCourseGroupedListNames(course)]
		groupChooseInput = input('Choose a grouped entry to add to (enter nothing to cancel, enter a new name to create a new group): ')

		# Ask for number and link
		number = input('Enter entry number: ')
		link = input('Enter link to the document: http://www.muchen.ca/documents/')
		if link == '':
			link = '../404'

		if groupChooseInput.lower() not in groupEntryTitles:
			# create a new grouped entry
			newGrouped = {
			 'title': groupChooseInput.capitalize(),
			 'enum': [ number ],
			 'links': [ link ]
			}
			course['entries'].append(newGrouped)
		else:
			groupEntry = getCourseGroupedListByTitle(course, groupChooseInput)
			if groupEntry is None:
				print('Error: something occured! aborting...')
				return None

			while number in groupEntry['enum']:
				print('Entry number already taken.')
				number = input('Enter entry number: ')

			groupEntry['enum'].append(number)
			groupEntry['links'].append(link)

	else:
		name = input('Document name: ')
		link = input('Enter link to the document: http://www.muchen.ca/documents/')
		flag = input('Special flag? (new | draft): ')

		course['entries'].append({
		 'title': name.capitalize(),
		 'link': link,
		 'flag': flag
		})

	# Update date
	course['date'] = getTodayDate()

	if saveData():
		print('Added new entry to ' + course['course'])

def addThing(kind):
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
			addThing(commandArgs[0])
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
