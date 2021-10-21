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
  SETTOTALGAMESPLAYED,
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
  setTotalGamesPlayed,
} from './statsActionCreators';

describe('actionCreators', () => {
  it('should create a LEFTCLICK action in the proper format', () => {
    const piece = {
      val: 0,
      uncovered: false,
      markedAsMine: false,
      row: 0,
      col: 0,
    };
    const left = leftClick(piece);
    expect(left).toEqual({
      payload: {
        col: 0,
        row: 0,
        markedAsMine: false,
        uncovered: false,
        val: 0
      },
      type: LEFTCLICK
    });
  });
  it('should create a RIGHTCLICK action in the proper format', () => {
    const piece = {
      val: 0,
      uncovered: false,
      markedAsMine: false,
      row: 0,
      col: 0,
    };
    const right = rightClick(piece);
    expect(right).toEqual({
      payload: {
        col: 0,
        row: 0,
        markedAsMine: false,
        uncovered: false,
        val: 0
      },
      type: RIGHTCLICK
    });
  });
  it('should create a resetTime action in the proper format', () => {
    const action = resetTime();
    expect(action).toEqual({ type: RESETTIME });
  });
  it('should create a setLength action in the proper format', () => {
    const action = setLength(11);
    expect(action).toEqual({ type: SETLENGTH, payload: { length: 11 } });
  });
  it('should create a setWidth action in the proper format', () => {
    const action = setWidth(12);
    expect(action).toEqual({ type: SETWIDTH, payload: { width: 12 } });
  });
  it('should create a setMines action in the proper format', () => {
    const action = setMines(13);
    expect(action).toEqual({ type: SETMINES, payload: { mines: 13 } });
  });
  it('should create a newBoardAction action in the proper format', () => {
    const action = newBoardAction(10, 10, 10);
    expect(action).toEqual({
      type: NEWBOARD,
      payload: {
        length: 10,
        width: 10,
        mines: 10,
      }
    });
  });
  it('should create a incrementTime action in the proper format', () => {
    const action = incrementTime();
    expect(action).toEqual({
      type: INCREMENTTIME,
    });
  });
});