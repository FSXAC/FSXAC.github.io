import random

def readSplash(directory = "static/txt/splash.txt"):
    splash_file = open(directory, "r")
    splash_list = []

    if not splash_file.closed:
        # read file
        line = splash_file.readline()
        while line != "":
            splash_list.append(line)
            line = splash_file.readline()

    splash_file.close()
    return splash_list

print(random.choice(readSplash()))
