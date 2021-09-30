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
  IActions,
} from './actionCreators';
import zeroFinder from './zeroFinder';
import checkWin from './checkWin';
import { IInitialState } from './initialState';
import boardCreator, { IPiece, backupPiece } from './boardCreator';

const reducer = (state: any, action: IActions) => {
  if (state.win || state.loss) {
    return state;
  }
  const piece: IPiece = action?.payload?.piece || backupPiece;
  const row: number = piece.row;
  const col: number = piece.col;


  if (action.type === LEFTCLICK) {
    return produce(state, (draftState: Draft<IInitialState>) => {
      if (!piece.uncovered && !piece.markedAsMine) {
        draftState.click.board = zeroFinder(row, col, draftState.click.board);
      }
      if (piece.isMine && !piece.markedAsMine) {
        draftState.click.loss = true;
        return draftState;
      } else if (checkWin(draftState.click.board)) {
        draftState.click.win = true;
        return draftState;
      }
    });
  }
  if (action.type === RIGHTCLICK) {
    return produce(state, (draftState: Draft<IInitialState>) => {
      if (!piece.uncovered) {
        draftState.click.board[row][col].markedAsMine = !piece.markedAsMine;
      }
    });
  }
  if (action.type === RESETTIME) {
    return produce((draft) => {
      draft.time = 0;
    });
  }
  if (action.type === INCREMENTTIME) {
    return produce((draft) => {
      draft.time += 1;
    });
  }
  if (action.type === SETLENGTH) {
    return produce((draft) => {
      draft.length = action.payload.length;
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce((draft) => {
      draft.width = action.payload.length;
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce((draft) => {
      draft.mines = action.payload.mines;
      return draft;
    });
  }
  if (action.type === NEWBOARD) {
    return produce((draft) => {
      draft.board = boardCreator(draft.length, draft.width, draft.mines, false);
      return draft;
    })
  }

  if (action.type.slice(0, 7) !== '@@redux') {
    console.error('Action not found: ', action);
  }

  return state;
};

export default reducer;
