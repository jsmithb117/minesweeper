import { createSlice} from '@reduxjs/toolkit';
// import { defaultState } from '../features/initialState';
import { IInitialState, IPiece } from '../interfaces/interfaces';
// import { defaultVal } from '../components/Form';

const backupPiece: IPiece = {
  val: 0,
  isMine: false,
  uncovered: false,
  markedAsMine: false,
  loser: false,
  row: 0,
  col: 0,
};

const defaultState: IInitialState = {
  click: {
    piecesMarkedAsMine: 0,
    board: [[backupPiece]],
    originalBoard: [[backupPiece]],
    win: false,
    loss: false,
  },
  form: {
    minesDisplay: 0,
    time: 0,
    length: 10,
    width: 10,
    mines: 10,
    paused: false,
    difficulty: 'Default',
  },
  stats: {
    bestBeginnerScore: {
      _id: '',
      username: '',
      seconds: Number.NEGATIVE_INFINITY,
      date: new Date().toISOString(),
    },
    bestIntermediateScore: {
      _id: '',
      username: '',
      seconds: Number.NEGATIVE_INFINITY,
      date: new Date().toISOString(),
    },
    bestExpertScore: {
      _id: '',
      username: '',
      seconds: Number.NEGATIVE_INFINITY,
      date: new Date().toISOString(),
    },
    beginnerScores: [{
      _id: '',
      username: '',
      seconds: Number.NEGATIVE_INFINITY,
      date: new Date().toISOString(),
    }],
    intermediateScores: [{
      _id: '',
      username: '',
      seconds: Number.NEGATIVE_INFINITY,
      date: new Date().toISOString(),
    }],
    expertScores: [{
      _id: '',
      username: '',
      seconds: Number.NEGATIVE_INFINITY,
      date: new Date().toISOString(),
    }],
    totalGamesCompleted: 0,
    username: 'user1',
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState: defaultState.form,
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
