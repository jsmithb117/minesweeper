import { createSlice} from '@reduxjs/toolkit';
import { state } from '../features/initialState';

export const statsSlice = createSlice({
  name: 'stats',
  initialState: state.stats,
  reducers: {
    setStats: (state, action) => {
      const {
        bestBeginnerScore,
        bestIntermediateScore,
        bestExpertScore,
        beginnerScores,
        intermediateScores,
        expertScores,
      } = action.payload;
      state.bestBeginnerScore = bestBeginnerScore;
      state.bestIntermediateScore = bestIntermediateScore;
      state.bestExpertScore = bestExpertScore;
      state.beginnerScores = beginnerScores;
      state.intermediateScores = intermediateScores;
      state.expertScores = expertScores;
    },
    setBestBeginnerScore: (state, action) => {
      state.bestBeginnerScore = action.payload.bestBeginnerScore;
    },
    setBestIntermediateScore: (state, action) => {
      state.bestIntermediateScore = action.payload.bestIntermediateScore;
    },
    setBestExpertScore: (state, action) => {
      state.bestExpertScore = action.payload.bestExpertScore;
    },
    setBeginnerScores: (state, action) => {
      state.beginnerScores = action.payload.beginnerScores;
    },
    setIntermediateScores: (state, action) => {
      state.intermediateScores = action.payload.intermediateScores;
    },
    setExpertScores: (state, action) => {
      state.expertScores = action.payload.expertScores;
    },
    setTotalGamesCompleted: (state, action) => {
      state.totalGamesCompleted = action.payload.totalGamesCompleted;
    },
  },
});

export const {
  setStats,
  setBestBeginnerScore,
  setBestIntermediateScore,
  setBestExpertScore,
  setBeginnerScores,
  setIntermediateScores,
  setExpertScores,
  setTotalGamesCompleted,
} = statsSlice.actions;

export default statsSlice.reducer;
