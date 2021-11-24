from flask import Flask
from flask import request
from dateutil.parser import *
from db import (getBeginnerHighScores,
  getIntermediateHighScores,
  getExpertHighScores,
  getHighScores,
  getUser,
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

@app.route("/user")
def sendUser():
  return getUser(request.json)