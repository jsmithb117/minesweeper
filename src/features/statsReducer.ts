import produce, { Draft } from 'immer';
import { IStatsState } from '../interfaces/interfaces';
import {
  SETBEGINNERSCORES,
  SETBESTBEGINNERSCORE,
  SETBESTEXPERTSCORE,
  SETBESTINTERMEDIATESCORE,
  SETEXPERTSCORES,
  SETINTERMEDIATESCORES,
  SETSTATS,
  SETTOTALGAMESPLAYED,
} from './statsActionCreators';

const statsReducer = (state: IStatsState | null = null, action: any) => {
  if (action.type.slice(0,7) === '@@redux') {
    return state;
  }
  if (action.type === SETSTATS) {
    return produce(state, (draft: Draft<IStatsState>) => {
      draft.bestBeginnerScore = action.payload.bestBeginnerScore;
      draft.bestIntermediateScore = action.payload.bestIntermediateScore;
      draft.bestExpertScore = action.payload.bestExpertScore;
      draft.beginnerScores = action.payload.beginnerScores;
      draft.intermediateScores = action.payload.intermediateScores;
      draft.expertScores = action.payload.expertScores;
      return draft;
    });
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
