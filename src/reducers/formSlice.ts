import { createSlice} from '@reduxjs/toolkit';
import { state } from '../features/initialState';

export const formSlice = createSlice({
  name: 'form',
  initialState: state.form,
  reducers: {
    setDifficulty: (state, action) => {
      state.difficulty = action.payload.difficulty || '';
    },
    resetTime: (state) => {
      state.time = 0;
    },
    incrementTime: (state) => {
      if (state) {
        state.time += 1;
      }
    },
    setLength: (state, action) => {
      state.length = action.payload.length || 0;
    },
    setWidth: (state, action) => {
      state.width = action.payload.width || 0;
    },
    setMines: (state, action) => {
      state.mines = action.payload.mines || 0;
    },
    incrementMinesDisplay: (state) => {
      if (state) {
        state.minesDisplay += 1;
      }
    },
    decrementMinesDisplay: (state) => {
      if (state) {
        state.minesDisplay -= 1;
      }
    },
    setMinesDisplay: (state, action) => {
      state.minesDisplay = action.payload.minesDisplay || 0;
    },
    togglePause: (state) => {
      state.paused = !state.paused;
    },
  },
});

export const {
  setDifficulty,
  resetTime,
  incrementTime,
  setLength,
  setWidth,
  setMines,
  incrementMinesDisplay,
  decrementMinesDisplay,
  setMinesDisplay,
  togglePause,
} = formSlice.actions;

export default formSlice.reducer;
