import datetime
from datetime import date
from flask import Flask
import flask
from flask.wrappers import Response
from markupsafe import escape
from bson.json_util import dumps
from dateutil.parser import *

from bson import json_util, ObjectId
import json

app = Flask(__name__)

# Temporary DB Stuff

from pymongo import MongoClient

client = MongoClient(port=27017)
db = client.minesweeper

def parse_json(data):
  return json.loads(json_util.dumps(data))

def getBeginnerHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })

  for score in dbResponse["beginner"]:
    score["_id"] = str(score["_id"])
    score["date"] = score["date"].isoformat()[:-3] + "Z"

  return Response(json.dumps(parse_json(dbResponse)), mimetype='application/json')


# /Temporary DB Stuff

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/beginner")
def sendBeginnerScores():
  return getBeginnerHighScores()



# export FLASK_APP=flaskServer
# flask run
