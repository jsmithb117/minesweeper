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

export const setStats = (updateObject: IStatsUpdate) => baseActionCreator(SETSTATS, updateObject);
export const setUsername = (updateObject: IUserUpdate) => baseActionCreator(SETUSERNAME, updateObject);
export const setBestBeginnerScore = (bestBeginnerScore: IScore) => baseActionCreator(SETBESTBEGINNERSCORE, { bestBeginnerScore });
export const setBestIntermediateScore = (bestIntermediateScore: IScore) => baseActionCreator(SETBESTINTERMEDIATESCORE, { bestIntermediateScore });
export const setBestExpertScore = (bestExpertScore: IScore) => baseActionCreator(SETBESTEXPERTSCORE, { bestExpertScore });
export const setBeginnerScores = (beginnerScores: IScore[]) => baseActionCreator(SETBEGINNERSCORES, { beginnerScores });
export const setIntermediateScores = (intermediateScores: IScore[]) => baseActionCreator(SETINTERMEDIATESCORES, { intermediateScores });
export const setExpertScores = (expertScores: IScore[]) => baseActionCreator(SETEXPERTSCORES, { expertScores });
export const setTotalGamesCompleted = (totalGamesCompleted: number) => baseActionCreator(SETTOTALGAMESCOMPLETED, { totalGamesCompleted });
