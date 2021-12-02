import produce, { Draft } from 'immer';
import {
  LEFTCLICK,
  RIGHTCLICK,
  REVERTBOARD,
  RESETWINLOSS,
  NEWBOARD,
  UPDATEORIGINALBOARD,
} from '../actionCreators/clickActionCreators';
import { checkWin, zeroFinder, boardCreator } from '../features';
import { IClickState } from '../interfaces/interfaces'
import { TESTBOARD } from '../actionCreators/clickActionCreators';
import { AnyAction } from 'redux';

const clickReducer = (state: IClickState | null = null, action: AnyAction) => {
  if (action?.type?.slice(0,7) === '@@redux') {
    return state;
  }
  if (action?.type === UPDATEORIGINALBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.originalBoard = draft.board;
      return draft;
    });
  }

  if (action?.type === RESETWINLOSS) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.win = false;
      draft.loss = false;
      return draft;
    });
  }

  if (state?.win || state?.loss) {
    return state;
  }

  const row: number = action?.payload?.piece?.row || 0;
  const col = action?.payload?.piece?.col || 0;
  const uncovered = action?.payload?.piece?.uncovered;
  const markedAsMine = action?.payload?.piece?.markedAsMine;
  const isMine = action?.payload?.piece?.isMine;

  if (action?.type === LEFTCLICK) {
    return produce(state, (draft: Draft<IClickState>) => {
      if (!uncovered && !markedAsMine) {
        draft.board = zeroFinder(row, col, draft.board);

      }
      if (isMine && !markedAsMine) {
        draft.loss = true;
        draft.board[row || 0][col || 0].loser = true;
        return draft;
      } else if (checkWin(draft.board)) {
        draft.win = true;
        return draft;
      }
    });
  }
  if (action?.type === RIGHTCLICK) {
    return produce(state, (draft: Draft<IClickState>) => {
      if (!uncovered) {
        if (!markedAsMine) {
          draft.piecesMarkedAsMine += 1;
        } else {
          draft.piecesMarkedAsMine -= 1;
        }
        draft.board[row][col].markedAsMine = !markedAsMine;
        return draft;
      }
    });
  }
  if (action?.type === NEWBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      let length: number | undefined,
      width: number | undefined,
      mines: number | undefined;
      if (action?.payload) {
        length = action?.payload?.length || undefined;
        width = action?.payload.width || undefined;
        mines = action?.payload.mines || undefined;
      }
      draft.board = boardCreator(length, width, mines, false);
      return draft;
    });
  }
  if (action?.type === REVERTBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.board = draft.originalBoard;
      return draft;
    });
  }

  if (action?.type === TESTBOARD) {
    return produce(state, (draft: Draft<IClickState>) => {
      draft.board = boardCreator(10, 10, 10, true);
      return draft;
    });
  }

  return state;
};

export default clickReducer;
