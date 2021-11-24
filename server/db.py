from pymongo import MongoClient
from flask.wrappers import Response
from bson.json_util import dumps

client = MongoClient(port=27017)
db = client.minesweeper

def formatIdAndDate(scores):
  for score in scores:
    score["_id"] = str(score["_id"])
    score["date"] = score["date"].isoformat()[:-3] + "Z"
  return scores

def getBeginnerHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDate(dbResponse["beginner"])),
    mimetype='application/json')

def getIntermediateHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDate(dbResponse["intermediate"])),
    mimetype='application/json')

def getExpertHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDate(dbResponse["expert"])),
    mimetype='application/json')

def getHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  strippedResponse = {}
  strippedResponse["beginner"] = formatIdAndDate(dbResponse["beginner"])
  strippedResponse["intermediate"] = formatIdAndDate(dbResponse["intermediate"])
  strippedResponse["expert"] = formatIdAndDate(dbResponse["expert"])
  return Response(dumps(strippedResponse), mimetype='application/json')