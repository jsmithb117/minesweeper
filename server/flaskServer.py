from flask import Flask
from dateutil.parser import *
from db import (getBeginnerHighScores,
  getIntermediateHighScores,
  getExpertHighScores,
  getHighScores,
  )

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

@app.route("/expert")
def sendExpertScores():
  return getExpertHighScores()

@app.route("/highscores")
def sendHighScores():
  return getHighScores()