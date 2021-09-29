import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  IAction,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { IState } from './initialState';
import { IPiece } from './boardCreator';

const reducer = (state: any, action: IAction) => {
  if (state.win || state.loss) {
    return state;
  }
  const piece: IPiece = action?.payload?.piece;
  const row: number = piece?.row;
  const col: number = piece?.col;

  if (action.type === LEFTCLICK) {
    const nextState = produce(state, (draftState: Draft<IState>) => {
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
    const nextState = produce(state, (draftState: Draft<IState>) => {
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
