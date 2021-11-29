import mongoose from "mongoose";
import newUserCreator from "./newUserCreator.js";
import { usersSchema, highScoresSchema } from "./schema.js";

const PORT = 27017;
const URI = `mongodb://localhost:${PORT}/minesweeper`;
mongoose.connect(URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("connected", () => console.log("Mongoose connected to port 27017"));
db.on("disconnected", () =>
  console.log("Mongoose connection disconnected from port 27017")
);

mongoose.set("returnOriginal", false);

const Users = mongoose.model("Users", usersSchema);
const HighScores = mongoose.model("HighScores", highScoresSchema);

export const getBeginnerHighScores = () => {
  return new Promise((resolve, reject) => {
    HighScores.findOne({ id: 1 }) //There are better ways to store this in the database, but it works...  FIXME
      .then((dbResponse) => resolve(dbResponse.beginner))
      .catch((err) =>
        reject(new Error(new Error("Error finding Beginner high scores")))
      );
  });
};

export const getIntermediateHighScores = () => {
  return new Promise((resolve, reject) => {
    HighScores.findOne({ id: 1 })
      .then((dbResponse) => resolve(dbResponse.intermediate))
      .catch((err) =>
        reject(new Error(new Error("Error finding Intermediate high scores")))
      );
  });
};

export const getExpertHighScores = () => {
  return new Promise((resolve, reject) => {
    HighScores.findOne({ id: 1 })
      .then((dbResponse) => resolve(dbResponse.expert))
      .catch((err) =>
        reject(new Error(new Error("Error finding Expert high scores")))
      );
  });
};

export const getHighScores = () => {
  const beginner = getBeginnerHighScores();
  const intermediate = getIntermediateHighScores();
  const expert = getExpertHighScores();
  return Promise.all([beginner, intermediate, expert])
    .then(([beginner, intermediate, expert]) => {
      return {
        beginner,
        intermediate,
        expert,
      };
    })
    .catch((err) => {
      throw new Error("Error in rootValue.highscores");
    });
};

export const getUserData = ({ username }) => {
  return new Promise((resolve, reject) => {
    Users.findOne({ username })
      .then((userDoc) => resolve(userDoc))
      .catch((err) => reject(err));
  });
};

// export const createUser = ({ username }) => {
//   return new Promise((resolve, reject) => {
//     resolve(
//       Users.findOne({ username })
//         .catch((err) => reject(err)));
//   });
// };

export const createLogin = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = newUserCreator(user);
    console.log('newUser: ', newUser)
    Users.create(newUser)
      .then((dbResponse) => resolve(dbResponse))
      .catch((err) => reject(new Error("Error creating new user")));
  });
};

export const postCompletedBoard = ({ username, difficulty, seconds, date }) => {
  const beginnerDif = difficulty === "Beginner";
  const intermediateDif = difficulty === "Intermediate";
  const expertDif = difficulty === "Expert";
  const lowerCaseDifficulty = difficulty.toLowerCase();
  const isDefaultDifficulty = beginnerDif || intermediateDif || expertDif;

  return new Promise((resolve, reject) => {
    const userUpdateObject = { $inc: { total_games_completed: 1 } };
    const highScoresNonDefaultUpdateObject = {
      $inc: {
        globalGamesCompleted: 1,
      },
    };
    const highScoresDefaultUpdateObject = {
      ...highScoresNonDefaultUpdateObject,
      $push: {
        [lowerCaseDifficulty]: {
          $each: [{ username, seconds, date }],
          $sort: { seconds: 1 },
          $slice: 10,
        },
      },
    };

    if (isDefaultDifficulty) {
      userUpdateObject.$push = {
        [`${lowerCaseDifficulty}_scores`]: {
          $each: [{ username, seconds, date }],
          $sort: { seconds: 1 },
          $slice: 10,
        },
      };
      HighScores.updateOne({ id: 1 }, highScoresDefaultUpdateObject).catch(
        (err) => reject(err)
      );
      Users.findOne({ username }).then((usersResponse) => {
        if (
          seconds < usersResponse[`best_${lowerCaseDifficulty}_score`].seconds
        ) {
          Users.updateOne(
            { username },
            {
              [`best_${lowerCaseDifficulty}_score`]: {
                username,
                seconds,
                date,
              },
            }
          ).catch((err) => reject(err));
        }
      });
    } else {
      HighScores.updateOne(
        { username },
        highScoresNonDefaultUpdateObject
      ).catch((err) => reject(err));
    }
    Users.updateOne({ username }, userUpdateObject)
      .then(() => resolve(Users.findOne({ username })))
      .catch((err) => reject(err));
  });
};

export const createHighScores = () => {
  return new Promise((resolve, reject) => {
    HighScores.create({
      id: 1,
      beginner: [],
      intermediate: [],
      expert: [],
      globalGamesCompleted: 0,
    })
      .then((dbResponse) => resolve(dbResponse))
      .catch((err) => reject(err));
  });
};

export const totalGamesCompleted = ({ username }) => {
  return new Promise((resolve, reject) => {
    Users.findOne({ username })
      .then((dbResponse) => resolve(dbResponse.total_games_completed))
      .catch((err) => reject(err));
  });
};
