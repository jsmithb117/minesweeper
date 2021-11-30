const newUserCreator = ({ username }) => {
  const score = { username, seconds: 100000, date: new Date() }
  const newUser = {
    username,
    bestBeginnerScore: [ score],
    bestIntermediateScore: [ score],
    bestExpertScore: [ score],
    beginnerScores: [],
    intermediateScores: [],
    expertScores: [],
    totalGamesCompleted: 0,
  };
  return newUser;
};

export default newUserCreator;