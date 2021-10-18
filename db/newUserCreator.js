const newUserCreator = ({ username, password }) => {
  const newUser = {
    username,
    plainTextPassword: password,
    highestDefaultScores: {
      beginner: {
        username,
        seconds: Number.POSITIVE_INFINITY,
        date: new Date(),
      },
      intermediate: {
        username,
        seconds: Number.POSITIVE_INFINITY,
        date: new Date(),
      },
      expert: {
        username,
        seconds: Number.POSITIVE_INFINITY,
        date: new Date(),
      },
    },
    allDefaultScores: {
      beginner: [],
      intermediate: [],
      expert: [],
    },
    numberOfDefaultGamesPlayed: {
      beginner: 0,
      intermediate: 0,
      expert: 0,
    },
    totalNumberOfGamesPlayed: 0,
  };
  return newUser;
};

export default newUserCreator;