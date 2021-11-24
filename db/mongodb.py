from pymongo import MongoClient
import datetime
from datetime import date
from flask import Flask
import flask
from flask.wrappers import Response
from markupsafe import escape
from bson.json_util import dumps
from dateutil.parser import *
client = MongoClient(port=27017)
db = client.minesweeper

def getBeginnerHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  for score in dbResponse["beginner"]:
    score["_id"] = str(score["_id"])
    score["date"] = score["date"].isoformat()[:-3] + "Z"
  return Response(dumps(dbResponse["beginner"]), mimetype='application/json')