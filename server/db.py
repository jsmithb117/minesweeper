from pymongo import MongoClient
from flask.wrappers import Response
from bson.json_util import dumps
import datetime

client = MongoClient(port=27017)
db = client.minesweeper
highscores = db.highscores
users = db.users

def formatIdAndDateList(scores):
  for score in scores:
    score = formatIdAndDate(score)
  return scores

def formatIdAndDate(score):
  isDateTime = isinstance(score["date"], datetime.date)
  score["date"] = score["date"].isoformat()[:-3] + "Z" if isDateTime else datetime.datetime.strptime(score["date"], "%Y-%m-%dT%H:%M:%S.%f").isoformat()[:-3] + "Z"
  if "_id" in score:
    score["_id"] = str(score["_id"])
  return score

def getBeginnerHighScores():
  dbResponse = highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDateList(dbResponse["beginner"])),
    mimetype='application/json')

def getIntermediateHighScores():
  dbResponse = highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDateList(dbResponse["intermediate"])),
    mimetype='application/json')

def getExpertHighScores():
  dbResponse = highscores.find_one({ "id": 1 })
  return Response(dumps(formatIdAndDateList(dbResponse["expert"])),
    mimetype='application/json')

def getHighScores():
  dbResponse = highscores.find_one({ "id": 1 })
  strippedResponse = {}
  strippedResponse["beginner"] = formatIdAndDateList(dbResponse["beginner"])
  strippedResponse["intermediate"] = formatIdAndDateList(dbResponse["intermediate"])
  strippedResponse["expert"] = formatIdAndDateList(dbResponse["expert"])
  return Response(dumps(strippedResponse), mimetype='application/json')

def getUser(body):
  dbResponse = users.find_one({ "username": body["username"] })
  strippedResponse = {
    "bestBeginnerScore": formatIdAndDate(dbResponse["bestBeginnerScore"]),
    "bestIntermediateScore": formatIdAndDate(dbResponse["bestIntermediateScore"]),
    "bestExpertScore": formatIdAndDate(dbResponse["bestExpertScore"]),
    "beginnerScores": formatIdAndDateList(dbResponse["beginnerScores"]),
    "intermediateScores": formatIdAndDateList(dbResponse["intermediateScores"]),
    "expertScores": formatIdAndDateList(dbResponse["expertScores"]),
    "totalGamesCompleted": dbResponse["totalGamesCompleted"],
  }
  return Response(dumps(strippedResponse), mimetype='application/json')

def setCompleted(body):
  beginnerDif = body["difficulty"] == "Beginner"
  intermediateDif = body["difficulty"] == "Intermediate"
  expertDif = body["difficulty"] == "Expert"
  lowerCaseDifficulty = body["difficulty"].lower()
  isDefaultDifficulty = beginnerDif or intermediateDif or expertDif
  userUpdateObject = {
    "$inc": {
      "totalGamesCompleted": 1
    }
  }
  currentUser = getUser({"username": "user1", "password": "insecurePassword"})
  highScoresUpdateObject = {
    "$inc": {
      "globalGamesCompleted": 1
    }
  }

  if isDefaultDifficulty:
    newHighScoreProps = { "$push": {
      lowerCaseDifficulty: {
        "$each": [{
          "username": body["username"],
          "seconds": body["seconds"],
          "date": body["date"],
        }],
        "$sort": { "seconds": 1 },
        "$slice": 10,
      },
    }}
    highScoresUpdateObject.update(newHighScoreProps)
    newUserProps = {
      "$push": {
        "{difficulty}_scores".format(difficulty=lowerCaseDifficulty): {
          "$each": [{
            "username": body["username"],
            "seconds": body["seconds"],
            "date": body["date"],
          }],
          "$sort": { "seconds": 1 },
          "$slice": 10,
        }
      }
    }
    userUpdateObject.update(newUserProps)
    newSeconds = body["seconds"]
    currentSeconds = currentUser.json["best{dif}Score".format(dif=body["difficulty"])]

    if newSeconds < currentSeconds["seconds"]:
      print('Replace old with new')
    else:
      print('Do not replace')

  users.update_one({"username": body["username"]}, userUpdateObject)
  highscores.update_one({"id": 1}, highScoresUpdateObject)
  return getUser(body)
