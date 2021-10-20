import { IPiece } from '../interfaces/interfaces';
import baseActionCreator from './baseActionCreator';

export const LEFTCLICK: string = 'LEFTCLICK';
export const RIGHTCLICK: string = 'RIGHTCLICK';
export const NEWBOARD: string = 'NEWBOARD';
export const REVERTBOARD: string = 'REVERTBOARD';
export const RESETWINLOSS: string = 'RESETWINLOSS';
export const UPDATEORIGINALBOARD: string = 'UPDATEORIGINALBOARD';
export const TESTBOARD = 'TESTBOARD';

export const newBoardAction = (length = 10, width = 10, mines = 10) => {
  const payloadObject = {
    length,
    width,
    mines,
  }
  return baseActionCreator(NEWBOARD, payloadObject);
};

export const revertBoard = () => {
  return baseActionCreator(REVERTBOARD, null);
};

export const resetWinLoss = () => {
  return baseActionCreator(RESETWINLOSS, null);
};
export const updateOriginalBoard = () => {
  return baseActionCreator(UPDATEORIGINALBOARD, null);
};

const click = (piece: IPiece, isLeftClick: boolean) => {
  const val: boolean = piece.hasOwnProperty('val');
  const uncovered: boolean = piece.hasOwnProperty('uncovered');
  const markedAsMine: boolean = piece.hasOwnProperty('markedAsMine');
  const row: boolean = piece.hasOwnProperty('row');
  const col: boolean = piece.hasOwnProperty('col');
  const requisites = val && uncovered && markedAsMine && row && col;

  let action = baseActionCreator('', null);
  if (requisites && isLeftClick) {
    action = baseActionCreator(LEFTCLICK, { piece });
    return action;
  };
  if (requisites) {
    return baseActionCreator(RIGHTCLICK, { piece });
  }
  return baseActionCreator('', null);
}

export const testBoard = () => {
  return baseActionCreator(TESTBOARD, null);
};

export const leftClick = (piece: IPiece) => {
  return click(piece, true)
};
export const rightClick = (piece: IPiece) => click(piece, false);
