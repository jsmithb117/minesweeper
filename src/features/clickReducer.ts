import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  REVERTBOARD,
  RESETWINLOSS,
  NEWBOARD,
  UPDATEORIGINALBOARD,
} from './clickActionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { IClickState } from './initialState';
import boardCreator, { backupPiece } from './boardCreator';
import { TESTBOARD } from './clickActionCreators';
import TAction from '../interfaces/interfaces';

const clickReducer = (state: IClickState | null = null, action: TAction) => {
  console.log('action: ', action)

  if (action.type === UPDATEORIGINALBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.originalBoard = draft.board;
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

  if (state?.win || state?.loss) {
    return state;
  }
  interface IPayload {
    length?: number,
    width?: number,
    mines?: number,
    row?: number,
    col?: number,
    uncovered?: boolean,
    markedAsMine?: boolean,
    isMine?: boolean,
  };

  const piece = action.payload ? action.payload : backupPiece;
  const row = piece.row || 0;
  const col = piece.col || 0;

  if (action.type === LEFTCLICK) {
    return produce(state, (draft: Draft<IClickState>) => {
      if (!piece.uncovered && !piece.markedAsMine) {
        draft.board = zeroFinder(row, col, draft.board);
      }
      if (piece.isMine && !piece.markedAsMine) {
        draft.loss = true;
        draft.board[piece.row || 0][piece.col || 0].loser = true;
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
      let length, width, mines;
      if (action.payload) {
        length = action.payload.length;
        width = action.payload.width;
        mines = action.payload.mines;
      }
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

  if (action.type === TESTBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.board = boardCreator(10, 10, 10, true);
      return draft;
    });
  }

  return state;
};

export default clickReducer;
