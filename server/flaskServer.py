from flask import Flask
from flask import request
from dateutil.parser import *
from db import (getBeginnerHighScores,
  getIntermediateHighScores,
  getExpertHighScores,
  getHighScores,
  getUser,
  setCompleted,
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

# This should be a GET request, but was a POST in Express.  FIXME
@app.route("/user", methods=["POST"])
def sendUser():
  return getUser(request.json)

@app.route("/completed", methods=["POST"])
def setAndGetCompleted():
  return setCompleted(request.json)