import { IPiece } from './boardCreator';

export const LEFTCLICK: string = 'LEFTCLICK';
export const RIGHTCLICK: string = 'RIGHTCLICK';
export const NEWBOARD: string = 'NEWBOARD';
export const REVERTBOARD: string = 'REVERTBOARD';
export const RESETWINLOSS: string = 'RESETWINLOSS';
export const UPDATEORIGINALBOARD: string = 'UPDATEORIGINALBOARD';
export const TESTBOARD = 'TESTBOARD';

export const newBoardAction = (length = 10, width = 10, mines = 10) => {
  const action = {
    type: NEWBOARD,
    payload: { length, width, mines },
    };
  return action;
};

export const revertBoard = () => {
  const action  = {
    type: REVERTBOARD,
  };
  return action;
};

export const resetWinLoss = () => {
  const action = {
    type: RESETWINLOSS,
  };
  return action;
};
export const updateOriginalBoard = () => {
  const action = {
    type: UPDATEORIGINALBOARD,
  };
  return action;
};

interface Piece {
  val: number,
  isMine: boolean,
  uncovered: boolean,
  markedAsMine: boolean,
  loser: boolean,
  row: number,
  col: number,
};

const click = (piece: IPiece, isLeftClick: boolean) => {
  const val: boolean = piece.hasOwnProperty('val');
  const uncovered: boolean = piece.hasOwnProperty('uncovered');
  const markedAsMine: boolean = piece.hasOwnProperty('markedAsMine');
  const row: boolean = piece.hasOwnProperty('row');
  const col: boolean = piece.hasOwnProperty('col');
  const requisites = val && uncovered && markedAsMine && row && col;

  let action = {
    type: '',
    payload: piece,
  };
  if (requisites && isLeftClick) {
    action.type = LEFTCLICK;
    action.payload = piece;
    return action;
  };
  if (requisites) {
    action.type = RIGHTCLICK;
  }
  return action;
}

export const testBoard = () => {
  const action = {
    type: TESTBOARD,
  };
  return action;
};

export const leftClick = (piece: Piece) => click(piece, true);
export const rightClick = (piece: IPiece) => click(piece, false);
