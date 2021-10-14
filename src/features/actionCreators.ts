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
export const INCREMENTMINESDISPLAY: string = 'INCREMENTMINESDISPLAY';
export const DECREMENTMINESDISPLAY: string = 'DECREMENTMINESDISPLAY';
export const SETMINESDISPLAY: string =  'SETMINESDISPLAY';
export const RESETWINLOSS: string = 'RESETWINLOSS';
export const UPDATEORIGINALBOARD: string = 'UPDATEORIGINALBOARD';
export const TESTBOARD = 'TESTBOARD';
export const PAUSE = 'PAUSE';

export interface IFormPayload extends IForm {
  payload: number,
};

export interface IFormBoard extends IForm {
  payload: {
    length: number,
    width: number,
    mines: number,
  };
};

export interface IClickPayload extends IForm {
  payload: IPiece,
};

export interface IForm {
  type: string,
};

export const resetTime = () => {
  const action = {
    type: RESETTIME
  };
  return action;
};

export const setLength = (length: number) => {
  const action = {
    type: SETLENGTH,
    payload: length,
  };
  return action;
};

export const setWidth = (width: number) => {
  const action = {
    type: SETWIDTH,
    payload: width,
  };
  return action;
};

export const setMines = (mines: number) => {
  const action = {
    type: SETMINES,
    payload: mines,
  };
  return action;
};

export const newBoardAction = (length: number = 10, width: number = 10, mines: number = 10) => {
  type actionType = {
    type: string,
    payload: {
      length: number,
      width: number,
      mines: number,
    },
  };
  const action: actionType = {
    type: NEWBOARD,
    payload: { length, width, mines },
    };
  return action;
};

export const incrementTime = () => {
  //FIXME Cannot assign action as IForm for some reason
  const action: IFormPayload = {
    type: INCREMENTTIME,
    payload: 0,
  };
  return action;
};

export const revertBoard = () => {
    //FIXME Cannot assign action as IForm for some reason
  const action: IFormPayload  = {
    type: REVERTBOARD,
    payload: 0,
  };
  return action;
};

export const incrementMinesDisplay = () => {
    //FIXME Cannot assign action as IForm for some reason
  const action: IFormPayload = {
    type: INCREMENTMINESDISPLAY,
    payload: 0,
  };
  return action;
};

export const decrementMinesDisplay = () => {
  const action: IFormPayload = {
      //FIXME Cannot assign action as IForm for some reason
    type: DECREMENTMINESDISPLAY,
    payload: 0,
  };
  return action;
};

export const setMinesDisplay = (minesDisplay: number = 0) => {
  const action: IFormPayload = {
    type: SETMINESDISPLAY,
    payload: minesDisplay,
  };
  return action;
};
export const resetWinLoss = () => {
  const action: IForm = {
    type: RESETWINLOSS,
  };
  return action;
};
export const updateOriginalBoard = () => {
    //FIXME Cannot assign action as IForm for some reason
  const action: IFormPayload = {
    type: UPDATEORIGINALBOARD,
    payload: 0,
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
  interface actionType {
    type: string,
    payload: {
      val: number,
      isMine: boolean,
      uncovered: boolean,
      markedAsMine: boolean,
      loser: boolean,
      row: number,
      col: number,
    }
  }
  let action: actionType = {
    type: '',
    payload: piece,
  };
  if (requisites && isLeftClick) {
    action.type = LEFTCLICK;
    console.log('action: ', action);
    return action;
  };
  if (requisites) {
    action.type = RIGHTCLICK;
  }
  console.log('action: ', action);
  return action;
}

export const testBoard = () => {
  const action = {
    type: TESTBOARD,
  };
  return action;
};

export const pause = () => {
  const action = {
    type: PAUSE,
  };
  return action;
}

export const leftClick = (piece: IPiece) => click(piece, true);

export const rightClick = (piece: IPiece) => click(piece, false);
