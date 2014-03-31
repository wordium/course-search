import flask
import sqlite3 as s

app = flask.Flask(__name__)
app.debug = True

@app.route('/', methods = ["GET"])
def home():
    app.logger.debug("home function called")
    return flask.render_template("index.html")
    
if __name__ == '__main__':
    app.run()