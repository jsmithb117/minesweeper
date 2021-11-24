from pymongo import MongoClient

client = MongoClient(port=27017)
db = client.minesweeper

def getBeginnerHighScores():
  return db.highscores.find({ id: 1 })
# # Read
# fivestar = db.reviews.find_one({'cuisine': 'Bar Food'})
# print(fivestar)
#   # Returns:
#   # {'_id': ObjectId('619d550ec0288e0092d8beb2'), 'name': 'State Lazy Inc', 'rating': 5, 'cuisine': 'Bar Food'}

# # /Read