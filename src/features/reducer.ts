import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  RESETTIME,
  INCREMENTTIME,
  SETLENGTH,
  SETWIDTH,
  SETMINES,
  IFormPayload,
  IClickPayload,
  REVERTBOARD,
  INCREMENTMINESDISPLAY,
  DECREMENTMINESDISPLAY,
  SETMINESDISPLAY,
  RESETWINLOSS,
  NEWBOARD,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { IInitialState, IClickState, IFormState, initialState } from './initialState';
import boardCreator, { IPiece, backupPiece } from './boardCreator';
import { IFormBoard } from './actionCreators';

export const clickReducer = (state: IInitialState = initialState, action: IFormBoard | IClickPayload ) => {
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
    return produce(state, (draft: Draft<IClickState>) => {
      const length = action.payload.length;
      const width = action.payload.width;
      const mines = action.payload.mines;
      draft.board = boardCreator(length, width, mines, false);
      return draft;
    });
  }
  if (action.type === REVERTBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.board = draft.originalBoard;
      return draft;
    });
  }
  if (action.type === RESETWINLOSS) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.win = false;
      draft.loss = false;
      return draft;
    });
  }
  return state;
};

export const formReducer = (state: IInitialState = initialState, action: IFormPayload) => {
  if (action.type === RESETTIME) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.time = 0;
      return draft;
    });
  }
  if (action.type === INCREMENTTIME) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.time += 1;
    });
  }
  if (action.type === SETLENGTH) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.length = action.payload;
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.width = action.payload;
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.mines = action.payload
      return draft;
    });
  }
  if (action.type === INCREMENTMINESDISPLAY) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.minesDisplay += 1;
      return draft;
    });
  }
  if (action.type === DECREMENTMINESDISPLAY) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.minesDisplay -= 1;
      return draft;
    }
    )};
  if (action.type === SETMINESDISPLAY) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.minesDisplay = action.payload;
      return draft;
    });
  }
  return state;
};
