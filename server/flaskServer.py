from flask import Flask
from dateutil.parser import *
from db import (getBeginnerHighScores,
  getIntermediateHighScores)

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/beginner")
def sendBeginnerScores():
  return getBeginnerHighScores()

@app.route("/intermediate")
def sendIntermediateScores():
  return getIntermediateHighScores()
