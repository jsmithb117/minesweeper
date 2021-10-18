import mongoose from 'mongoose';

export const usersSchema = new mongoose.Schema({
  username: String,
  plainTextPassword: String,
  highestDefaultScores: {
    beginner: {
      seconds: Number,
      date: Date,
    },
    intermediate: {
      seconds: Number,
      date: Date,
    },
    expert: {
      seconds: Number,
      date: Date,
    },
  },
  allDefaultScores: {
    beginner: [{
      username: String,
      seconds: Number,
      date: Date,
    }],
    intermediate: [{
      username: String,
      seconds: Number,
      date: Date,
    }],
    expert: [{
      username: String,
      seconds: Number,
      date: Date,
    }],
  },
  numberOfDefaultGamesPlayed: {
    beginner: Number,
    intermediate: Number,
    expert: Number,
  },
  totalNumberOfGamesPlayed: Number,
}, { retainKeyOrder: true });

export const highScoresSchema = new mongoose.Schema({
  highDefaultScores: {
    beginner: [{
      username: String,
      seconds: Number,
      date: Date,
    }],
    intermediate: [{
      username: String,
      seconds: Number,
      date: Date,
    }],
    expert: [{
      username: String,
      seconds: Number,
      date: Date,
    }],
  },
  totalNumberOfGamesPlayed: Number,
});