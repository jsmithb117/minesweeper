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


export const getBeginnerHighScores = () => {
  return new Promise((resolve, reject) => {
    resolve(HighScores.findOne({ highDefaultScores: 'beginner' }));
    reject('Error finding Beginner high scores');
  });
};

export const getIntermediateHighScores = () => {
  return new Promise((resolve, reject) => {
    resolve(HighScores.findOne({ highDefaultScores: 'intermediate' }));
    reject('Error finding Intermediate high scores');
  });
};

export const getExpertHighScores = () => {
  return new Promise((resolve, reject) => {
    resolve(HighScores.findOne({ highDefaultScores: 'expert' }));
    reject('Error finding Expert high scores');
  });
};

export const postLogin = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    resolve(
      Users.findOne({ username: username })
      .then((dbResponse) => {
        return dbResponse;
      })
    );
    reject(`Error finding username:  ${username}`);
  });
};

export const createLogin = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = newUserCreator(user);
    resolve(Users.create(newUser));
    reject('Error creating new user');
  });
};

export const postCompletedBoard = ({ username, difficulty, seconds, date }) => {
  return new Promise((resolve, reject) => {
    resolve(
      Users.updateOne({ username }, {
        allDefaultScores: {
          [difficulty]: { $push: { seconds, date } }
        }
      }, )
      .then((dbResponse) => {
        console.log('dbResponse: ', dbResponse);
        return dbResponse;
      })
      .catch((err) => new Error(err.toString()))
    );
    reject('Error updating completed board');
  })
}