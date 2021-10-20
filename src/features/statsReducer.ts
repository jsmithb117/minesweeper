import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  REVERTBOARD,
  RESETWINLOSS,
  NEWBOARD,
  UPDATEORIGINALBOARD,
} from './clickActionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { IClickState } from './initialState';
import boardCreator from './boardCreator';
import { TESTBOARD } from './clickActionCreators';
import { IStatsState } from '../interfaces/interfaces';
import { SETBEGINNERSCORES, SETBESTBEGINNERSCORE, SETBESTEXPERTSCORE, SETBESTINTERMEDIATESCORE, SETEXPERTSCORES, SETINTERMEDIATESCORES, SETTOTALGAMESPLAYED } from './statsActionCreators';
const statsReducer = (state: IStatsState | null = null, action: any) => {
  if (action.type.slice(0,7) === '@@redux') {
    return state;
  }
  if (action.type === SETBESTBEGINNERSCORE) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.bestBeginnerScore = action.payload.bestBeginnerScore;
      return draft;
    });
  }
  if (action.type === SETBESTINTERMEDIATESCORE) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.bestIntermediateScore = action.payload.bestIntermediateScore;
      return draft;
    });
  }
  if (action.type === SETBESTEXPERTSCORE) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.bestExpertScore = action.payload.bestExpertScore;
      return draft;
    });
  }
  if (action.type === SETBEGINNERSCORES) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.beginnerScores = action.payload.beginnerScores;
      return draft;
    });
  }
  if (action.type === SETINTERMEDIATESCORES) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.intermediateScores = action.payload.intermediateScores;
      return draft;
    });
  }
  if (action.type === SETEXPERTSCORES) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.expertScores = action.payload.expertScores;
      return draft;
    });
  }
  if (action.type === SETTOTALGAMESPLAYED) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.totalGamesPlayed = action.payload.totalGamesPlayed;
      return draft;
    });
  }

  return state;
};

export default statsReducer;
