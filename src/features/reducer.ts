import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  RESETTIME,
  INCREMENTTIME,
  SETLENGTH,
  SETWIDTH,
  SETMINES,
  NEWBOARD,
  IFormAction,
  IClickAction,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { IInitialState, IClickState, IFormState, initialState } from './initialState';
import boardCreator, { IPiece, backupPiece } from './boardCreator';

export const clickReducer = (state: IInitialState = initialState, action: IClickAction) => {
  if (state?.click?.win || state?.click?.loss) {
    return state;
  }
  const piece: IPiece = action.payload || backupPiece;
  const row: number = piece.row;
  const col: number = piece.col;

  if (action.type === LEFTCLICK) {
    return produce(state, (draftState: Draft<IClickState>) => {
      if (!piece.uncovered && !piece.markedAsMine) {
        draftState.board = zeroFinder(row, col, draftState.board);
      }
      if (piece.isMine && !piece.markedAsMine) {
        draftState.loss = true;
        return draftState;
      } else if (checkWin(draftState.board)) {
        draftState.win = true;
        return draftState;
      }
    });
  }
  if (action.type === RIGHTCLICK) {
    return produce(state, (draftState: Draft<IClickState>) => {
      if (!piece.uncovered) {
        draftState.board[row][col].markedAsMine = !piece.markedAsMine;
      }
    });
  }
    if (action.type === NEWBOARD) {
    return produce((draft) => {
      draft.board = boardCreator(draft.length, draft.width, draft.mines, false);
      return draft;
    })
  }
  return state;
};

export const formReducer = (state: IInitialState = initialState, action: IFormAction) => {
  if (action.type === RESETTIME) {
    return produce((draft: Draft<IFormState>) => {
      draft.time = 0;
    });
  }
  if (action.type === INCREMENTTIME) {
    return produce((draft: Draft<IFormState>) => {
      draft.time += 1;
    });
  }
  if (action.type === SETLENGTH) {
    return produce((draft: Draft<IFormState>) => {
      draft.length = action.payload;
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce((draft: Draft<IFormState>) => {
      draft.width = action.payload;
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce((draft: Draft<IFormState>) => {
      draft.mines = action.payload
      return draft;
    });
  }
  return state;
};
