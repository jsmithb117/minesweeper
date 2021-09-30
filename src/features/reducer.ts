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
  IFormPayload,
  IClickAction,
  REVERTBOARD,
  INCREMENTMINESDISPLAY,
  DECREMENTMINESDISPLAY
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
    return produce(state, (draft: Draft<IClickState>) => {
      if (!piece.uncovered && !piece.markedAsMine) {
        draft.board = zeroFinder(row, col, draft.board);
      }
      if (piece.isMine && !piece.markedAsMine) {
        draft.loss = true;
        return draft;
      } else if (checkWin(draft.board)) {
        draft.win = true;
        return draft;
      }
    });
  }
  if (action.type === RIGHTCLICK) {
    return produce(state, (draft: Draft<IClickState>) => {
      if (!piece.uncovered) {
        if (!piece.markedAsMine) {
          draft.piecesMarkedAsMine += 1;
        } else {
          draft.piecesMarkedAsMine -= 1;
        }
        draft.board[row][col].markedAsMine = !piece.markedAsMine;
        return draft;
      }
    });
  }
    if (action.type === NEWBOARD) {
    return produce((draft) => {
      draft.board = boardCreator(draft.length, draft.width, draft.mines, false);
      return draft;
    });
  }
  if (action.type === REVERTBOARD) {
    return produce((draft) => {
      draft.board = draft.originalBoard;
      return draft;
    });
  }
  return state;
};

export const formReducer = (state: IInitialState = initialState, action: IFormPayload) => {
  if (action.type === RESETTIME) {
    return produce((draft: Draft<IFormState>) => {
      draft.time = 0;
      return draft;
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
  if (action.type === INCREMENTMINESDISPLAY) {
    return produce((draft: Draft<IFormState>) => {
      draft.minesDisplay += 1;
      return draft;
    });
  }
  if (action.type === DECREMENTMINESDISPLAY) {
    return produce((draft: Draft<IFormState>) => {
      draft.minesDisplay -= 1;
      return draft;
    }
    )};

  return state;
};
