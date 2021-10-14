import produce from 'immer';
import {
  RESETTIME,
  INCREMENTTIME,
  SETLENGTH,
  SETWIDTH,
  SETMINES,
  INCREMENTMINESDISPLAY,
  DECREMENTMINESDISPLAY,
  SETMINESDISPLAY,
  PAUSE
} from './formActionCreators';
import TAction from '../interfaces/interfaces';
import { IFormState } from './initialState';

const formReducer = (state: IFormState | null = null, action: TAction) => {
  if (action.type === RESETTIME) {
    return produce(state, (draft) => {
      if (draft) {
        draft.time = 0;
      }
      return draft;
    });
  }
  if (action.type === INCREMENTTIME) {
    return produce(state, (draft) => {
      if (draft) {
        draft.time += 1;
      }
      return draft;
    });
  }
  if (action.type === SETLENGTH) {
    return produce(state, (draft) => {
      if (draft && typeof action.payload === 'number') {
        draft.length = action.payload;
      }
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce(state, (draft) => {
      if (draft) {
        if (typeof action.payload === 'number') {
          draft.width = action.payload;
        }
      }
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce(state, (draft) => {
      if (draft && typeof action.payload === 'number') {
        draft.mines = action.payload
      }
      return draft;
    });
  }
  if (action.type === INCREMENTMINESDISPLAY) {
    return produce(state, (draft) => {
      if (draft) {
        draft.minesDisplay += 1;
      }
      return draft;
    });
  }
  if (action.type === DECREMENTMINESDISPLAY) {
    return produce(state, (draft) => {
      if (draft) {
        draft.minesDisplay -= 1;
      }
      return draft;
    }
    )
  };
  if (action.type === SETMINESDISPLAY) {
    return produce(state, (draft) => {
      if (draft && typeof action.payload?.minesDisplay === 'number') {
        draft.minesDisplay = action.payload.minesDisplay;
      }
      return draft;
    });
  }
  if (action.type === PAUSE) {
    return produce(state, (draft) => {
      if (draft) {
        draft.paused = !draft.paused;
      }
      return draft;
    });
  }
  return state;
};

export default formReducer;
