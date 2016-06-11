def file_len(fname):
    with open(fname) as f:
        for i, l in enumerate(f):
            pass
    return i + 1

print(file_len("static/txt/splash.txt"))
input()

fo = open("static/txt/splash.txt")
lines = fo.readline()
fo.close()

print(lines)
input()
