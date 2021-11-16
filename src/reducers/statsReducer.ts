import produce from 'immer';
import { IStatsState } from '../interfaces/interfaces';
import {
  SETBEGINNERSCORES,
  SETBESTBEGINNERSCORE,
  SETBESTEXPERTSCORE,
  SETBESTINTERMEDIATESCORE,
  SETEXPERTSCORES,
  SETINTERMEDIATESCORES,
  SETSTATS,
  SETTOTALGAMESCOMPLETED,
} from '../actionCreators/statsActionCreators';
import { IStatsDraft } from '../interfaces/interfaces';
import { AnyAction } from 'redux';

const statsReducer = (state: IStatsState | null = null, action: AnyAction) => {
  if (action.type.slice(0,7) === '@@redux') {
    return state;
  }
  if (action.type === SETSTATS) {
    return produce(state, (draft: IStatsDraft) => {
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
    return produce(state, (draft: IStatsDraft) => {
      draft.bestBeginnerScore = action.payload.bestBeginnerScore;
      return draft;
    });
  }
  if (action.type === SETBESTINTERMEDIATESCORE) {
    return produce(state, (draft: IStatsDraft) => {
      draft.bestIntermediateScore = action.payload.bestIntermediateScore;
      return draft;
    });
  }
  if (action.type === SETBESTEXPERTSCORE) {
    return produce(state, (draft: IStatsDraft) => {
      draft.bestExpertScore = action.payload.bestExpertScore;
      return draft;
    });
  }
  if (action.type === SETBEGINNERSCORES) {
    return produce(state, (draft: IStatsDraft) => {
      draft.beginnerScores = action.payload.beginnerScores;
      return draft;
    });
  }
  if (action.type === SETINTERMEDIATESCORES) {
    return produce(state, (draft: IStatsDraft) => {
      draft.intermediateScores = action.payload.intermediateScores;
      return draft;
    });
  }
  if (action.type === SETEXPERTSCORES) {
    return produce(state, (draft: IStatsDraft) => {
      draft.expertScores = action.payload.expertScores;
      return draft;
    });
  }
  if (action.type === SETTOTALGAMESCOMPLETED) {
    return produce(state, (draft: IStatsDraft) => {
      draft.totalGamesCompleted = action.payload.totalGamesCompleted;
      return draft;
    });
  }

  return state;
};

export default statsReducer;
