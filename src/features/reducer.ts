import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  Action,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { State } from './initialState';
import { PieceType } from './boardCreator';

const reducer = (state: State, action: Action) => {
  if (state.win || state.loss) {
    return state;
  }
  const piece: PieceType = action?.payload?.piece;
  const row: number = piece?.row;
  const col: number = piece?.col;

  if (action.type === LEFTCLICK) {
    const nextState = produce(state, (draftState: Draft<State>) => {
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
    const nextState = produce(state, (draftState: Draft<State>) => {
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
