import { createSlice} from '@reduxjs/toolkit';
import { defaultState } from '../features/initialState';
import zeroFinder from '../features/zeroFinder';
import checkWin from '../features/checkWin';
import boardCreator from "../features/boardCreator";

export const clickSlice = createSlice({
  name: 'click',
  initialState: defaultState.click,
  reducers: {
    updateOriginalBoard: (state) => {
      state.originalBoard = state.board;
    },
    resetWinLoss: (state) => {
      state.win = false;
      state.loss = false;
    },
    leftClick: (state, action) => {
      const row: number = action.payload.piece.row || 0;
      const col = action.payload.piece.col || 0;
      const uncovered = action.payload.piece.uncovered;
      const markedAsMine = action.payload.piece.markedAsMine;
      const isMine = action.payload.piece.isMine;

      if (!uncovered && !markedAsMine) {
        state.board = zeroFinder(row, col, state.board);

      }
      if (isMine && !markedAsMine) {
        state.loss = true;
        state.board[row || 0][col || 0].loser = true;
      } else if (checkWin(state.board)) {
        state.win = true;
      }
    },
    rightClick: (state, action) => {
      const row: number = action.payload.piece.row || 0;
      const col = action.payload.piece.col || 0;
      const uncovered = action.payload.piece.uncovered;
      const markedAsMine = action.payload.piece.markedAsMine;

      if (!uncovered) {
        if (!markedAsMine) {
          state.board[row || 0][col || 0].markedAsMine = true;
        } else {
          state.board[row || 0][col || 0].markedAsMine = false;
        }
      }
    },
    newBoard: (state, action) => {
      const { length, width, mines } = action.payload;
      state.board = boardCreator(length, width, mines, false);
    },
    revertBoard: (state) => {
      state.board = state.originalBoard;
    },
    testBoard: (state, action) => {
      const { length, width, mines } = action.payload;
      state.board = boardCreator(length, width, mines, true);
    },
  },
});

export const {
  updateOriginalBoard,
  resetWinLoss,
  leftClick,
  rightClick,
  newBoard,
  revertBoard,
  testBoard,
} = clickSlice.actions;

export default clickSlice.reducer;