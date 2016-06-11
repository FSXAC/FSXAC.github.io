import os
import webapp2
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(loader = jinja2.FileSystemLoader('templates'))

class MainHandler(webapp2.RequestHandler):
    def get(self):
        # login page vars
        login_var = {
            "page_title" : "Login",
            "title" : "LOGIN",
            "footer" : "none"
            }
        self.response.out.write(JINJA_ENVIRONMENT.get_template("login.html").render(login_var))
    def post(self):
        username = self.request.get("login")
        password = self.request.get("password")
        
	login_after_vars = {
            "page_title" : "Login",
            "title" : "LOGIN",
            "footer" : "none",
            "login_username": username,
            "login_password": password
            }

        self.response.out.write(JINJA_ENVIRONMENT.get_template("login_after.html").render(login_after_vars))

app = webapp2.WSGIApplication([
    ('/login', MainHandler)
    ], debug=True)
