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



# def to_json(score):
#   # print(score)
#   score_list = list(score)
#   new_date = score['date'].isoformat()
#   print('new_date')
#   print(new_date)
#   return dict(_id=score['_id']["$oid"],
#     username=score[score_list[0]],
#     seconds=score[score_list[1]],
#     date=new_date,
#   )


# dbResponse = db.highscores.find_one({ "id": 1 })
# # print(db)

def parse_json(data):
  return json.loads(json_util.dumps(data))

def getBeginnerHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })

  for score in dbResponse["beginner"]:
    score["_id"] = str(score["_id"])
    score["date"] = score["date"].isoformat()[:-3] + "Z"

  parsedResponse = parse_json(dbResponse)

  return Response(json.dumps(parsedResponse["beginner"]), mimetype='application/json')


# /Temporary DB Stuff

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/beginner")
def sendBeginnerScores():
  return getBeginnerHighScores()



# export FLASK_APP=flaskServer
# flask run
