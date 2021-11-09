import {
  LEFTCLICK,
  RIGHTCLICK,
  NEWBOARD,
  leftClick,
  rightClick,
  newBoardAction,
} from './clickActionCreators';
import {
  RESETTIME,
  SETLENGTH,
  SETWIDTH,
  SETMINES,
  INCREMENTTIME,
  resetTime,
  setLength,
  setWidth,
  setMines,
  incrementTime,
} from './formActionCreators';
import {
  SETBESTBEGINNERSCORE,
  SETBESTINTERMEDIATESCORE,
  SETBESTEXPERTSCORE,
  SETBEGINNERSCORES,
  SETINTERMEDIATESCORES,
  SETEXPERTSCORES,
  SETTOTALGAMESCOMPLETED,
  SETUSERNAME,
  SETSTATS,
  setStats,
  setUsername,
  setBestBeginnerScore,
  setBestIntermediateScore,
  setBestExpertScore,
  setBeginnerScores,
  setIntermediateScores,
  setExpertScores,
  setTotalGamesCompleted,
} from './statsActionCreators';

const baseAction = {
  type: '',
  payload: {
    val: null,
    isMine: null,
    uncovered: null,
    markedAsMine: null,
    loser: null,
    row: null,
    col: null,
    piece: {
      val: null,
      isMine: null,
      uncovered: null,
      markedAsMine: null,
      loser: null,
      row: null,
      col: null
    },
    length: null,
    width: null,
    mines: null,
    minesDisplay: null,
    bestBeginnerScore: null,
    bestIntermediateScore: null,
    bestExpertScore: null,
    beginnerScores: null,
    intermediateScores: null,
    expertScores: null,
    totalGamesCompleted: null,
    username: null,
    difficulty: null
  },
};

describe('clickActionCreators', () => {
  const piece = {
    val: 0,
    uncovered: false,
    markedAsMine: false,
    row: 0,
    col: 0,
  };

  it('should create a LEFTCLICK action in the proper format', () => {
    const left = leftClick(piece);
    expect(left).toEqual({
      type: LEFTCLICK,
      payload: {
        piece,
      },
    });
  });
  it('should create a RIGHTCLICK action in the proper format', () => {
    const right = rightClick(piece);
    expect(right).toEqual({
      type: RIGHTCLICK,
      payload: {
        piece,
      },
    });
  });
  it('should create a NEWBOARD action in the proper format', () => {
    const action = newBoardAction(10, 10, 10);
    expect(action).toEqual({
      type: NEWBOARD,
      payload: {
        length: 10,
        width: 10,
        mines: 10,
      },
    });
  });
});

describe('formActionCreators', () => {
  it('should create a resetTime action in the proper format', () => {
    const action = resetTime();
    expect(action).toEqual({
      type: RESETTIME,
    });
  });
  it('should create a SETLENGTH action in the proper format', () => {
    const action = setLength(11);
    expect(action).toEqual({
      type: SETLENGTH,
      payload: {
        length: 11,
      },
    });
  });
  it('should create a SETWIDTH action in the proper format', () => {
    const action = setWidth(12);
    expect(action).toEqual({
      type: SETWIDTH,
      payload: {
        width: 12,
      },
    });
  });
  it('should create a SETMINES action in the proper format', () => {
    const action = setMines(13);
    expect(action).toEqual({
      type: SETMINES,
      payload: {
        mines: 13,
      },
    });
  });
  it('should create a INCREMENTTIME action in the proper format', () => {
    const action = incrementTime();
    console.log('incrementTime action: ', action);
    expect(action).toEqual({
      type: INCREMENTTIME,
    });
  });
});

describe('statsActionCreators', () => {
  const username = 'user1';
  const seconds = 35;
  const date = new Date();
  it('should create a setBestBeginnerScore action in the proper format', () => {
    const date = new Date();
    const action = setBestBeginnerScore({ username, seconds, date });
    expect(action).toEqual({
      type: SETBESTBEGINNERSCORE,
      payload: {
        bestBeginnerScore: { username, seconds, date },
      },
    })
  });
  it('should create a setBestIntermediateScore action in the proper format', () => {
    const date = new Date();
    const action = setBestIntermediateScore({ username, seconds, date });
    expect(action).toEqual({
      type: SETBESTINTERMEDIATESCORE,
      payload: {
        bestIntermediateScore: { username, seconds, date },
      },
    })
  });
  it('should create a setBestExpertScore action in the proper format', () => {
    const action = setBestExpertScore({ username, seconds, date });
    expect(action).toEqual({
      type: SETBESTEXPERTSCORE,
      payload: {
        bestExpertScore: { username, seconds, date },
      },
    })
  });
  it('should create a setBeginnerScores action in the proper format', () => {
    const beginnerScores = [{ username, seconds, date }]
    const action = setBeginnerScores(beginnerScores);
    expect(action).toEqual({
      type: SETBEGINNERSCORES,
      payload: {
        beginnerScores
      },
    });
  });
  it('should create a setIntermediateScores action in the proper format', () => {
    const intermediateScores = [{ username, seconds, date }]
    const action = setIntermediateScores(intermediateScores);
    expect(action).toEqual({
      type: SETINTERMEDIATESCORES,
      payload: {
        intermediateScores
      },
    });
  });
  it('should create a setExpertScores action in the proper format', () => {
    const expertScores = [{ username, seconds, date }]
    const action = setExpertScores(expertScores);
    expect(action).toEqual({
      type: SETEXPERTSCORES,
      payload: {
        expertScores
      },
    });
  });
  it('should create a setTotalGamesCompleted action in the proper format', () => {
    const totalGamesCompleted = 47;
    const action = setTotalGamesCompleted(totalGamesCompleted);
    expect(action).toEqual({
      type: SETTOTALGAMESCOMPLETED,
      payload: {
        totalGamesCompleted,
      },
    });
  });
  it('should create a setUsername action in the proper format', () => {
    const action = setUsername({ username });
    expect(action.payload.username).toBe('user1');
    expect(action.type).toBe('SETUSERNAME');
  });
});