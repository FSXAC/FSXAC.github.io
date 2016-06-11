import os
import jinja2
import webapp2
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

JINJA_ENVIRONMENT = jinja2.Environment(
    autoescape = True,
    loader = jinja2.FileSystemLoader('templates'),
    trim_blocks = True)

##RANDOM_PYTHON = readSplash()
RANDOM_PYTHON = ["Random message generator is broken :P"]

class MainHandler(webapp2.RequestHandler):
    def get(self):
        home_template = JINJA_ENVIRONMENT.get_template("index.html")
        
        template_vars = {
            "isPython": random.choice(RANDOM_PYTHON)
            }
        self.response.out.write(home_template.render(template_vars))

app = webapp2.WSGIApplication(routes = [
    (r'/home', MainHandler)
    ], debug=True)
