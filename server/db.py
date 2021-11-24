from pymongo import MongoClient
from flask.wrappers import Response
from bson.json_util import dumps
from operator import itemgetter

client = MongoClient(port=27017)
db = client.minesweeper

def formatIdAndDateList(scores):
  for score in scores:
    score = formatIdAndDate(score)
  return scores

def formatIdAndDate(score):
  # print('score')
  # print(score)
  if "_id" in score:
    score["_id"] = str(score["_id"])
  score["date"] = score["date"].isoformat()[:-3] + "Z"
  return score

def getBeginnerHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDateList(dbResponse["beginner"])),
    mimetype='application/json')

def getIntermediateHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDateList(dbResponse["intermediate"])),
    mimetype='application/json')

def getExpertHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDateList(dbResponse["expert"])),
    mimetype='application/json')

def getHighScores():
  dbResponse = db.highscores.find_one({ "id": 1 })
  strippedResponse = {}
  strippedResponse["beginner"] = formatIdAndDateList(dbResponse["beginner"])
  strippedResponse["intermediate"] = formatIdAndDateList(dbResponse["intermediate"])
  strippedResponse["expert"] = formatIdAndDateList(dbResponse["expert"])
  return Response(dumps(strippedResponse), mimetype='application/json')

def getUser(body):
  dbResponse = db.users.find_one({ "username": body["username"] })
  print(dbResponse)
  strippedResponse = {
    "bestBeginnerScore": formatIdAndDate(dbResponse["best_beginner_score"]),
    "bestIntermediateScore": formatIdAndDate(dbResponse["best_intermediate_score"]),
    "bestExpertScore": formatIdAndDate(dbResponse["best_expert_score"]),
    "beginnerScores": formatIdAndDateList(dbResponse["beginner_scores"]),
    "intermediateScores": formatIdAndDateList(dbResponse["intermediate_scores"]),
    "expertScores": formatIdAndDateList(dbResponse["expert_scores"]),
    "totalGamesCompleted": dbResponse["total_games_completed"],
  }

  return Response(dumps(strippedResponse), mimetype='application/json')