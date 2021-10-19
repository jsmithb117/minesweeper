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

export const getBeginnerHighScores = () => {
  return new Promise((resolve, reject) => {
    resolve(HighScores.findOne({ highDefaultScores: 'beginner' }));
    reject(new Error('Error finding Beginner high scores'));
  });
};

export const getIntermediateHighScores = () => {
  return new Promise((resolve, reject) => {
    resolve(HighScores.findOne({ highDefaultScores: 'intermediate' }));
    reject(new Error('Error finding Intermediate high scores'));
  });
};

export const getExpertHighScores = () => {
  return new Promise((resolve, reject) => {
    resolve(HighScores.findOne({ highDefaultScores: 'expert' }));
    reject(new Error('Error finding Expert high scores'));
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
    reject(new Error(`Error finding username:  ${username}`));
  });
};

export const createLogin = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = newUserCreator(user);
    resolve(Users.create(newUser));
    reject(new Error('Error creating new user'));
  });
};

export const postCompletedBoard = ({ username, difficulty, seconds, date, }) => {
  const beginnerDif = difficulty === 'beginner';
  const intermediateDif = difficulty === 'intermediate';
  const expertDif = difficulty === 'expert';
  const customDif = difficulty === 'custom';

  const isDefaultDifficulty = beginnerDif || intermediateDif || expertDif;

  return new Promise((resolve, reject) => {
    const userUpdateObject = {
      $inc: { total_games_played: 1 },
    };
    const highScoresUpdateObject = {
      $push: {
        [difficulty]: {
          $each: [{ username, seconds, date }],
          $sort: { seconds: 1 },
          $slice: 10,
        },
      },
    };

    if (isDefaultDifficulty) {
      userUpdateObject.$push = {
        [`${difficulty}_scores`]: { username, seconds, date }
      };
      HighScores.updateOne({ id: 1 }, highScoresUpdateObject)
        .catch((err) => reject(err));
      Users.findOne({ username })
        .then((usersResponse) => {
          if (seconds < usersResponse[`best_${difficulty}_score`].seconds) {
            Users.updateOne({ username }, {
                [`best_${difficulty}_score`]: { username, seconds, date }
              })
              .catch((err) => reject(err));
          }
        });
    }

    if (isDefaultDifficulty || difficulty === 'custom') {
      Users.updateOne({ username }, userUpdateObject)
        .then(() => {
          resolve(Users.findOne({ username }));
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    } else {
      reject(new Error('Unknown difficulty: ', difficulty));
    }
  });
};

export const createHighScores = () => {
  return new Promise((resolve, reject) => {
    HighScores.create({
        id: 1,
        beginner: [],
        intermediate: [],
        expert: [],
      })
      .then((dbResponse) => {
        resolve(dbResponse);
      })
      .catch((err) => {
        reject(err);
      });
  });
};