from pymongo import MongoClient
from flask.wrappers import Response
from bson.json_util import dumps

client = MongoClient(port=27017)
db = client.minesweeper

def getBeginnerHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  for score in dbResponse["beginner"]:
    score["_id"] = str(score["_id"])
    score["date"] = score["date"].isoformat()[:-3] + "Z"
  return Response(dumps(dbResponse["beginner"]), mimetype='application/json')

def getIntermediateHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  for score in dbResponse["intermediate"]:
    score["_id"] = str(score["_id"])
    score["date"] = score["date"].isoformat()[:-3] + "Z"
  return Response(dumps(dbResponse["intermediate"]), mimetype='application/json')