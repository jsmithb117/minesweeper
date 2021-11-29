import mongoose from "mongoose";
import newUserCreator from "./features/newUserCreator.js";
import { usersSchema, highScoresSchema } from "./features/schema.js";

import {
  userUpdateObjectCreator,
  highScoresUpdateObjectCreator
} from './features/updateObjectCreator.js';

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
    HighScores.findOne({ id: 1 })
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

export const createLogin = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = newUserCreator(user);
    Users.create(newUser)
      .then((dbResponse) => resolve(dbResponse))
      .catch((err) => reject(new Error("Error creating new user")));
  });
};

export const postCompletedBoard = (score) => {
  return new Promise((resolve, reject) => {
    const userUpdateObject = userUpdateObjectCreator(score);
    const highScoresUpdateObject = highScoresUpdateObjectCreator(score);

    HighScores.updateOne({ id: 1 }, highScoresUpdateObject)

    Users.updateOne({ username: score.username }, userUpdateObject)
      .then(() => {
        resolve(Users.findOne({ username: score.username }));
      })
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
      .then((dbResponse) => resolve(dbResponse.totalGamesCompleted))
      .catch((err) => reject(err));
  });
};
