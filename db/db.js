import mongoose from 'mongoose';
import newUserCreator from './newUserCreator.js';
import { usersSchema, highScoresSchema } from './schema.js';

const PORT = 27017;
const URI = `mongodb://localhost:${PORT}/minesweeper`;
mongoose.connect(URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => {
  console.log('Mongoose connected to port 27017');
});
db.on('disconnected', () => {
  console.log('Mongoose connection disconnected from port 27017');
});

mongoose.set('returnOriginal', false);

const Users = mongoose.model('Users', usersSchema);
const HighScores = mongoose.model('HighScores', highScoresSchema);

//db methods I need:
//getBeginnerHighScores
//returns HighScores.highDefaultScores.beginner

//getIntermediateHighScores
//returns HighScores.highDefaultScores.intermediate

//getExpertHighScores
//returns HighScores.highDefaultScores.expert


//postLogin({ username, password })
//  if empty response from db
//    call createLogin, passing in username/password
//    returns user's newly created document
//  if response exists and password matches,
//    return entire user document
//  if response exists and password doesn't match (either username doesn't exist or passwords do no match)
//    sendStatus(401)


//createLogin({ username, password })
// creates a new blank user with given username/password.


//postCompletedBoard
//  update highDefaultScores as necessary
//  return highDefaultScores