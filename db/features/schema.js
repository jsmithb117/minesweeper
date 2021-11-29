import mongoose from 'mongoose';

export const usersSchema = new mongoose.Schema({
  username: String,
  plainTextPassword: String,
  bestBeginnerScore: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  bestIntermediateScore: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  bestExpertScore: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  beginnerScores: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  intermediateScores: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  expertScores: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  totalGamesCompleted: Number,
}, { retainKeyOrder: true });

export const highScoresSchema = new mongoose.Schema({
  id: Number,
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
  globalGamesCompleted: Number,
});