import produce from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  Action,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { State } from './initialState';

const reducer = (state: State, action: Action) => {
  if (state.win || state.loss) {
    return state;
  }
  const piece = action?.payload?.piece;
  const row = piece?.row;
  const col = piece?.col;

  if (action.type === LEFTCLICK) {
    const nextState = produce(state, (draftState) => {
      if (!piece.uncovered && !piece.markedAsMine) {
        draftState.board = zeroFinder(row, col, draftState.board);
      }
      if (piece.isMine && !piece.markedAsMine) {
        draftState.loss = true;
        return draftState;
      } else if (checkWin(draftState.board)){
        draftState.win = true;
        return draftState;
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

export default reducer;
