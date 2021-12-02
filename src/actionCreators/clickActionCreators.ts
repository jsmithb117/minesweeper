import { IPiece } from '../interfaces/interfaces';
import { baseActionCreator } from './index';

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

const click = (piece: IPiece, isLeftClick: boolean) => {
  const val: boolean = piece.hasOwnProperty('val');
  const uncovered: boolean = piece.hasOwnProperty('uncovered');
  const markedAsMine: boolean = piece.hasOwnProperty('markedAsMine');
  const row: boolean = piece.hasOwnProperty('row');
  const col: boolean = piece.hasOwnProperty('col');
  const requisites = val && uncovered && markedAsMine && row && col;

  if (requisites && isLeftClick) {
    return baseActionCreator(LEFTCLICK, { piece });
  };
  if (requisites) {
    return baseActionCreator(RIGHTCLICK, { piece });
  }
      /* istanbul ignore next */
  return baseActionCreator('', null);
}

export const revertBoard = () => baseActionCreator(REVERTBOARD, null);
export const resetWinLoss = () => baseActionCreator(RESETWINLOSS, null);
export const updateOriginalBoard = () => baseActionCreator(UPDATEORIGINALBOARD, null);
export const testBoard = () => baseActionCreator(TESTBOARD, null);
export const leftClick = (piece: IPiece) => click(piece, true);
export const rightClick = (piece: IPiece) => click(piece, false);
