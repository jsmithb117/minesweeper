import { IPiece } from './boardCreator';

export const LEFTCLICK: string = 'LEFTCLICK';
export const RIGHTCLICK: string = 'RIGHTCLICK';
export const RESETTIME: string = 'RESETTIME';
export const SETLENGTH: string = 'SETLENGTH';
export const SETWIDTH: string = 'SETWIDTH';
export const SETMINES: string = 'SETMINES';
export const NEWBOARD: string = 'NEWBOARD';
export const INCREMENTTIME: string = 'INCREMENTTIME';
export const REVERTBOARD: string = 'REVERTBOARD';

export interface IFormAction extends IForm {
  payload: number,
};

export interface IClickAction extends IForm {
  payload: IPiece,
};

export interface IForm {
  type: string,
};

export const resetTime = () => {
  const action: IForm = {
    type: RESETTIME
  };
  return action;
};

export const setLength = (length: number) => {
  const action: IFormAction = {
    type: SETLENGTH,
    payload: length,
  };
  return action;
};

export const setWidth = (width: number) => {
  const action: IFormAction = {
    type: SETLENGTH,
    payload: width,
  };
  return action;
};

export const setMines = (mines: number) => {
  const action: IFormAction = {
    type: SETMINES,
    payload: mines,
  };
  return action;
};

export const newBoardAction = () => {
  const action: IForm = {
    type: NEWBOARD,
  };
  return action;
};

export const incrementTime = () => {
  const action: IForm = {
    type: INCREMENTTIME,
  };
  return action;
};

export const revertBoard = () => {
  const action: IForm = {
    type: REVERTBOARD,
  };
  return action;
};

const click = (piece: IPiece, isLeftClick: boolean) => {
  const val: boolean = piece.hasOwnProperty('val');
  const uncovered: boolean = piece.hasOwnProperty('uncovered');
  const markedAsMine: boolean = piece.hasOwnProperty('markedAsMine');
  const row: boolean = piece.hasOwnProperty('row');
  const col: boolean = piece.hasOwnProperty('col');
  const requisites = val && uncovered && markedAsMine && row && col;
  let action: IClickAction = {
    type: '',
    payload: piece,
  };
  if (requisites && isLeftClick) {
    action.type = LEFTCLICK;
    return action;
  };
  if (requisites) {
    action.type = RIGHTCLICK;
  }
  return action;
}
export const leftClick = (piece: IPiece) => click(piece, true);

export const rightClick = (piece: IPiece) => click(piece, false);
