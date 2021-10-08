import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  IClickPayload,
  REVERTBOARD,
  RESETWINLOSS,
  NEWBOARD,
  UPDATEORIGINALBOARD,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { IClickState } from './initialState';
import boardCreator, { IPiece, backupPiece } from './boardCreator';
import { IFormBoard, TESTBOARD } from './actionCreators';

const clickReducer = (state: IClickState | null = null, action: IFormBoard | IClickPayload) => {
  if (state?.win || state?.loss) {
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
    //TESTME -->
    return produce(state, (draft: Draft<IClickState>) => {
      const length = action.payload.length;
      const width = action.payload.width;
      const mines = action.payload.mines;
      draft.board = boardCreator(length, width, mines, false);
      return draft;
      //<-- TESTME
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
    //TESTME -->
  if (action.type === UPDATEORIGINALBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.originalBoard = draft.board;
      return draft;
    });
  }
  if (action.type === TESTBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.board = boardCreator(10, 10, 10, true);
      return draft;
    });
  }
      //<-- TESTME

  return state;
};

export default clickReducer;
