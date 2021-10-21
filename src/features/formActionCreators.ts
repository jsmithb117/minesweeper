import { IActionMinesDisplay,
  IActionNoPayload,
  IActionLengthPayload,
  IActionWidthPayload,
  IActionMinesPayload,
  IAction,
} from '../interfaces/interfaces';
import baseActionCreator from './baseActionCreator';

export const RESETTIME: string = 'RESETTIME';
export const SETLENGTH: string = 'SETLENGTH';
export const SETWIDTH: string = 'SETWIDTH';
export const SETMINES: string = 'SETMINES';
export const INCREMENTTIME: string = 'INCREMENTTIME';
export const INCREMENTMINESDISPLAY: string = 'INCREMENTMINESDISPLAY';
export const DECREMENTMINESDISPLAY: string = 'DECREMENTMINESDISPLAY';
export const SETMINESDISPLAY: string =  'SETMINESDISPLAY';
export const PAUSE = 'PAUSE';
export const DIFFICULTY = 'DIFFICULTY';

export const setDifficulty = (difficulty: string) => {
  const payloadObject = { difficulty };
  const action: IAction = baseActionCreator(DIFFICULTY, payloadObject);
  return action;
};

export const resetTime = () => {
  const action: IActionNoPayload = {
    type: RESETTIME
  };
  return action;
};

export const setLength = (length: number) => {
  const action: IActionLengthPayload = {
    type: SETLENGTH,
    payload: {
      length,
    },
  };
  return action;
};

export const setWidth = (width: number) => {
  const action: IActionWidthPayload = {
    type: SETWIDTH,
    payload: {
      width
    },
  };
  return action;
};

export const setMines = (mines: number) => {
  const action: IActionMinesPayload = {
    type: SETMINES,
    payload: {
      mines
    },
  };
  return action;
};

export const incrementTime = () => {
  const action: IActionNoPayload  = {
    type: INCREMENTTIME,
  };
  return action;
};

export const incrementMinesDisplay = () => {
  const action: IActionNoPayload = {
    type: INCREMENTMINESDISPLAY,
  };
  return action;
};

export const decrementMinesDisplay = () => {
  const action: IActionNoPayload = {
    type: DECREMENTMINESDISPLAY,
  };
  return action;
};

export const setMinesDisplay = (minesDisplay: number = 0) => {
  const action: IActionMinesDisplay = {
    type: SETMINESDISPLAY,
    payload: {
      minesDisplay
    },
  };
  return action;
};

export const pause = () => {
  const action: IActionNoPayload = {
    type: PAUSE,
  };
  return action;
}
