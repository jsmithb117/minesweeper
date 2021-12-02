import statsReducer from "./statsReducer";
import { initialStateCreator } from '../features';
import { setBeginnerScores, setBestBeginnerScore, setBestExpertScore, setBestIntermediateScore, setExpertScores, setIntermediateScores, setStats, setTotalGamesCompleted } from "../actionCreators";

const initialState = initialStateCreator();
const username = 'user1';
const seconds = 26;
const date = new Date();
const _id = '618172424cc87daf91d0bad0';
const score = { _id, username, seconds, date };

describe('statsReducer', () => {
  it('should handle SETSTATS action', () => {
    const updateObject = {
      username: 'user1',
      bestBeginnerScore: score,
      bestIntermediateScore: score,
      bestExpertScore: score,
      beginnerScores: [ score ],
      intermediateScores: [ score ],
      expertScores: [ score ],
      totalGamesCompleted: 15,
    };
    const resultState = statsReducer(initialState.stats, setStats(updateObject));
    expect(resultState).toEqual({
        bestBeginnerScore: { _id, username, seconds, date },
        bestIntermediateScore: { _id, username, seconds, date },
        bestExpertScore: { _id, username, seconds, date },
        beginnerScores: [{ _id, username, seconds, date }],
        intermediateScores: [{ _id, username, seconds, date }],
        expertScores: [{ _id, username, seconds, date }],
        totalGamesCompleted: 0,
        username: 'user1',
    });
  });
  it('should handle SETBESTBEGINNERSCORE action', () => {
    const resultState = statsReducer(initialState.stats, setBestBeginnerScore(score));
    expect(resultState?.bestBeginnerScore).toEqual(score);
  });
  it('should handle SETBESTINTERMEDIATESCORE action', () => {
    const resultState = statsReducer(initialState.stats, setBestIntermediateScore(score));
    expect(resultState?.bestIntermediateScore).toEqual(score);
  });
  it('should handle SETBESTEXPERTSCORE action', () => {
    const resultState = statsReducer(initialState.stats, setBestExpertScore(score));
    expect(resultState?.bestExpertScore).toEqual(score);
  });
  it('should handle SETBEGINNERSCORES action', () => {
    const resultState = statsReducer(initialState.stats, setBeginnerScores([score]));
    expect(resultState?.beginnerScores).toEqual([score]);
  });
  it('should handle SETINTERMEDIATESCORES action', () => {
    const resultState = statsReducer(initialState.stats, setIntermediateScores([score]));
    expect(resultState?.intermediateScores).toEqual([score]);
  });
  it('should handle SETEXPERTSCORES action', () => {
    const resultState = statsReducer(initialState.stats, setExpertScores([score]));
    expect(resultState?.expertScores).toEqual([score]);
  });
  it('should handle SETTOTALGAMESCOMPLETED action', () => {
    const resultState = statsReducer(initialState.stats, setTotalGamesCompleted(6));
    expect(resultState?.totalGamesCompleted).toBe(6);
  });
});