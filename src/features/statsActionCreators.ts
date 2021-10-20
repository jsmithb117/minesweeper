import { IStatsUpdate } from '../interfaces/interfaces';
import baseActionCreator from './baseActionCreator';
import { IScore } from '../interfaces/interfaces';

export const UPDATEFORM = 'UPDATEFORM';

export const setStats = (updateObject: IStatsUpdate) => {
  const payloadObject = { ...updateObject };
  return baseActionCreator(UPDATEFORM, payloadObject);
};

export const setBestBeginnerScore = (bestBeginnerScore: IScore) => ({ ...baseActionCreator, bestBeginnerScore });

export const setBestIntermediateScore = (bestIntermediateScore: IScore) => ({ ...baseActionCreator, bestIntermediateScore });

export const setBestExpertScore = (bestExpertScore: IScore) => ({ ...baseActionCreator, bestExpertScore });

export const setBeginnerScores = (beginnerScores: IScore[]) => ({ ...baseActionCreator, beginnerScores });

export const setIntermediateScores = (intermediateScores: IScore[]) => ({ ...baseActionCreator, intermediateScores });

export const setExpertScores = (expertScores: IScore[]) => ({ ...baseActionCreator, expertScores });

export const setTotalGamesPlayed = (totalGamesPlayed: number) => ({ ...baseActionCreator, totalGamesPlayed });