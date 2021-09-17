import produce from 'immer';
import clone from 'rfdc/default';
import {
  LEFTCLICK,
  RIGHTCLICK,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';

const reducer = (state, action) => {
  const piece = action.payload.piece;
  const row = piece.row;
  const col = piece.col;

  if (action.type === LEFTCLICK) {
    const nextState = produce(state, (draftState) => {
      if (!piece.uncovered && !piece.markedAsMine) {
        const clonedBoard = clone(state.board);
        draftState.board = zeroFinder(row, col, clonedBoard);
      }
      if (piece.val === 'X' && !piece.markedasMine) {
        draftState.loss = true;
      } else if (checkWin(draftState.board)){
        draftState.win = true;
      }
    });

    return nextState;
  }

  if (action.type === RIGHTCLICK) {
    const nextState = produce(state, (draftState) => {
      if (!action.payload.piece.uncovered) {
        draftState.board[row][col].markedAsMine = !action.payload.piece.markedAsMine;
      }
    });

    return nextState;
  }

  if (action.type.slice(0,7) !== '@@redux') {
    console.error('Action not found: ', action);
  }

  return state;
};