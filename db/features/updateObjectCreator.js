const isDefault = (difficulty) => {
  const beginnerDif = difficulty === "Beginner";
  const intermediateDif = difficulty === "Intermediate";
  const expertDif = difficulty === "Expert";
  return beginnerDif || intermediateDif || expertDif;
}
export const userUpdateObjectCreator = ({ username, difficulty, seconds, date }) => {
  const isDefaultDifficulty = isDefault(difficulty);

  const userUpdateObject = {
    $inc: { totalGamesCompleted: 1 }
  }

  if (isDefaultDifficulty) {
    userUpdateObject.$push = {
      [`${difficulty.toLowerCase()}Scores`]: {
        $each: [{ username, seconds, date }],
        $sort: { seconds: 1 },
        $slice: 10,
      },
      [`best${difficulty}Score`]: {
        $each: [{ username, seconds, date }],
        $sort: { seconds: 1 },
        $slice: 1,
      }
    };
  }

  return userUpdateObject;
};

export const highScoresUpdateObjectCreator = ({ username, difficulty, seconds, date }) => {
  const isDefaultDifficulty = isDefault(difficulty);

  const highScoresUpdateObject = {
    $inc: {
      globalGamesCompleted: 1,
    }
  };

  if (isDefaultDifficulty) {
    highScoresUpdateObject.$push = {
      [difficulty.toLowerCase()]: {
        $each: [{ username, seconds, date }],
        $sort: { seconds: 1 },
        $slice: 10,
      },
    }
  }

  return highScoresUpdateObject
}
