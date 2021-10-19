const newUserCreator = ({ username, password }) => {
  const newUser = {
    username,
    plainTextPassword: password,
    best_beginner_score: {
      username,
      seconds: Number.POSITIVE_INFINITY,
      date: new Date(),
    },
    best_intermediate_score: {
      username,
      seconds: Number.POSITIVE_INFINITY,
      date: new Date(),
    },
    best_expert_score: {
      username,
      seconds: Number.POSITIVE_INFINITY,
      date: new Date(),
    },
    beginner_scores: [],
    intermediate_scores: [],
    expert_scores: [],
    total_games_played: 0,
  };
  return newUser;
};

export default newUserCreator;