import TAction from '../interfaces/interfaces';

export const RESETTIME: string = 'RESETTIME';
export const SETLENGTH: string = 'SETLENGTH';
export const SETWIDTH: string = 'SETWIDTH';
export const SETMINES: string = 'SETMINES';
export const INCREMENTTIME: string = 'INCREMENTTIME';
export const INCREMENTMINESDISPLAY: string = 'INCREMENTMINESDISPLAY';
export const DECREMENTMINESDISPLAY: string = 'DECREMENTMINESDISPLAY';
export const SETMINESDISPLAY: string =  'SETMINESDISPLAY';
export const PAUSE = 'PAUSE';

export const resetTime = () => {
  const action: TAction = {
    type: RESETTIME
  };
  return action;
};

export const setLength = (length: number) => {
  const action: TAction = {
    type: SETLENGTH,
    payload: {
      length,
    },
  };
  return action;
};

export const setWidth = (width: number) => {
  const action: TAction = {
    type: SETWIDTH,
    payload: {
      width
    },
  };
  return action;
};

export const setMines = (mines: number) => {
  const action: TAction = {
    type: SETMINES,
    payload: {
      mines
    },
  };
  return action;
};

export const incrementTime = () => {
  const action: TAction  = {
    type: INCREMENTTIME,
  };
  return action;
};

export const incrementMinesDisplay = () => {
  const action: TAction = {
    type: INCREMENTMINESDISPLAY,
  };
  return action;
};

export const decrementMinesDisplay = () => {
  const action: TAction = {
    type: DECREMENTMINESDISPLAY,
  };
  return action;
};

export const setMinesDisplay = (minesDisplay: number = 0) => {
  const action: TAction = {
    type: SETMINESDISPLAY,
    payload: {
      minesDisplay
    },
  };
  return action;
};

export const pause = () => {
  const action: TAction = {
    type: PAUSE,
  };
  return action;
}
