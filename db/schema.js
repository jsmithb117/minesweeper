import mongoose from 'mongoose';

export const usersSchema = new mongoose.Schema({
  username: String,
  plainTextPassword: String,
  best_beginner_score: {
    username: String,
    seconds: Number,
    date: Date,
  },
  best_intermediate_score: {
    username: String,
    seconds: Number,
    date: Date,
  },
  best_expert_score: {
    username: String,
    seconds: Number,
    date: Date,
  },
  beginner_scores: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  intermediate_scores: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  expert_scores: [{
    username: String,
    seconds: Number,
    date: Date,
  }],
  total_games_completed: Number,
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