const newUserCreator = ({ username }) => {
  const newUser = {
    username,
    best_beginner_score: [{
      username,
      seconds: 100000,
      date: new Date(),
    }],
    best_intermediate_score: [{
        username,
        seconds: 100000,
        date: new Date(),
    }],
    best_expert_score: [{
      username,
      seconds: 100000,
      date: new Date(),
    }],
    beginner_scores: [],
    intermediate_scores: [],
    expert_scores: [],
    total_games_completed: 0,
  };
  return newUser;
};

export default newUserCreator;