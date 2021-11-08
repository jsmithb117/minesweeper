import { buildSchema } from 'graphql';
import { getUserData, postCompletedBoard } from '../db/db.js';

export const schema = buildSchema(`
  type Query {
    hello: String
    users(username: String): UserSchema
  }
  type UserSchema {
    best_beginner_score: Score
    best_intermediate_score: Score
    best_expert_score: Score
    beginner_scores: [Score]
    intermediate_scores: [Score]
    expert_scores: [Score]
    total_games_completed: Int
  }
  type Score {
    username: String
    seconds: Int
    date: String
  }
  type Input {
    username: String
    seconds: Int
    date: String
    difficulty: String
  }
  type Mutation {
    completed(username: String, difficulty: String, seconds: Int, date: String): UserSchema
  }
  `);

export const rootValue = {
  hello: () => 'Hello world!',
  users: (username) => {
    return getUserData(username)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new Error('Error in rootValue.users');
      });
  },
  completed: (score) => {
    return postCompletedBoard(score)
      .then((dbResponse) => {
        return dbResponse;
      })
      .catch((err) => {
        throw new Error('Error in rootValue.completed');
      });
  }
};