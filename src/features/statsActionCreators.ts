import { IStatsUpdate, IUserUpdate } from '../interfaces/interfaces';
import baseActionCreator from './baseActionCreator';
import { IScore } from '../interfaces/interfaces';

export const UPDATEFORM = 'UPDATEFORM';
export const SETBESTBEGINNERSCORE = 'SETBESTBEGINNERSCORE';
export const SETBESTINTERMEDIATESCORE = 'SETBESTINTERMEDIATESCORE';
export const SETBESTEXPERTSCORE = 'SETBESTEXPERTSCORE';
export const SETBEGINNERSCORES = 'SETBEGINNERSCORES';
export const SETINTERMEDIATESCORES = 'SETINTERMEDIATESCORES';
export const SETEXPERTSCORES = 'SETEXPERTSCORES';
export const SETTOTALGAMESPLAYED = 'SETTOTALGAMESPLAYED';
export const SETUSERNAME = 'SETUSERNAME';

export const setUsername = (updateObject: IUserUpdate) => {
  return baseActionCreator(SETUSERNAME, updateObject);
};

export const setStats = (updateObject: IStatsUpdate) => {
  return baseActionCreator(UPDATEFORM, updateObject);
};

export const setBestBeginnerScore = (bestBeginnerScore: IScore) => (
  {
    ...baseActionCreator,
    action: SETBESTBEGINNERSCORE,
    bestBeginnerScore
  }
);

export const setBestIntermediateScore = (bestIntermediateScore: IScore) => ({ ...baseActionCreator, bestIntermediateScore });

export const setBestExpertScore = (bestExpertScore: IScore) => ({ ...baseActionCreator, bestExpertScore });

export const setBeginnerScores = (beginnerScores: IScore[]) => ({ ...baseActionCreator, beginnerScores });

export const setIntermediateScores = (intermediateScores: IScore[]) => ({ ...baseActionCreator, intermediateScores });

export const setExpertScores = (expertScores: IScore[]) => ({ ...baseActionCreator, expertScores });

export const setTotalGamesPlayed = (totalGamesPlayed: number) => ({ ...baseActionCreator, totalGamesPlayed });
