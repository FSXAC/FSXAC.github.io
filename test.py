import os
import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
    autoescape = True,
    loader = jinja2.FileSystemLoader('templates'),
    trim_blocks = True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        home_template = JINJA_ENVIRONMENT.get_template("_simple.html")
        self.response.out.write(home_template.render())

app = webapp2.WSGIApplication(routes = [
    (r'/test', MainHandler)
    ], debug=True)
