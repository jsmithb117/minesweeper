import { IStatsUpdate, IUserUpdate } from '../interfaces/interfaces';
import baseActionCreator from './baseActionCreator';
import { IScore } from '../interfaces/interfaces';

export const SETBESTBEGINNERSCORE = 'SETBESTBEGINNERSCORE';
export const SETBESTINTERMEDIATESCORE = 'SETBESTINTERMEDIATESCORE';
export const SETBESTEXPERTSCORE = 'SETBESTEXPERTSCORE';
export const SETBEGINNERSCORES = 'SETBEGINNERSCORES';
export const SETINTERMEDIATESCORES = 'SETINTERMEDIATESCORES';
export const SETEXPERTSCORES = 'SETEXPERTSCORES';
export const SETTOTALGAMESCOMPLETED = 'SETTOTALGAMESCOMPLETED';
export const SETUSERNAME = 'SETUSERNAME';
export const SETSTATS = 'SETSTATS';

export const setStats = (updateObject: IStatsUpdate) => {
  const action = baseActionCreator(SETSTATS, updateObject);
  return action;
}

export const setUsername = (updateObject: IUserUpdate) => {
  return baseActionCreator(SETUSERNAME, updateObject);
};

export const setBestBeginnerScore = (bestBeginnerScore: IScore) => {
  return baseActionCreator(SETBESTBEGINNERSCORE, { bestBeginnerScore })
};

export const setBestIntermediateScore = (bestIntermediateScore: IScore) => {
  return baseActionCreator(SETBESTINTERMEDIATESCORE, { bestIntermediateScore })
};

export const setBestExpertScore = (bestExpertScore: IScore) => {
  return baseActionCreator(SETBESTEXPERTSCORE, { bestExpertScore })
};

export const setBeginnerScores = (beginnerScores: IScore[]) => {
  return baseActionCreator(SETBEGINNERSCORES, { beginnerScores });
};

export const setIntermediateScores = (intermediateScores: IScore[]) => {
  return baseActionCreator(SETINTERMEDIATESCORES, { intermediateScores });
};

export const setExpertScores = (expertScores: IScore[]) => {
  return baseActionCreator(SETEXPERTSCORES, { expertScores });
};

export const setTotalGamesCompleted = (totalGamesCompleted: number) => {
  return baseActionCreator(SETTOTALGAMESCOMPLETED, { totalGamesCompleted });
}
