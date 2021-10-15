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
import { IFormState } from './initialState';

const formReducer = (state: IFormState | null = null, action: any) => {
  if (action.type === RESETTIME) {
    return produce(state, (draft: { time: number }) => {
      if (draft) {
        draft.time = 0;
      }
      return draft;
    });
  }
  if (action.type === INCREMENTTIME) {
    return produce(state, (draft: { time: number }) => {
      if (draft) {
        draft.time += 1;
      }
      return draft;
    });
  }
  if (action.type === SETLENGTH) {
    return produce(state, (draft: { length: number }) => {
      draft.length = action.payload.length;
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce(state, (draft: { width: number }) => {
          draft.width = action.payload.width;
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce(state, (draft: { mines: number }) => {
        draft.mines = action.payload.mines;
      return draft;
    });
  }
  if (action.type === INCREMENTMINESDISPLAY) {
    return produce(state, (draft: { minesDisplay: number }) => {
        draft.minesDisplay += 1;
      return draft;
    });
  }
  if (action.type === DECREMENTMINESDISPLAY) {
    return produce(state, (draft: { minesDisplay: number }) => {
      if (draft) {
        draft.minesDisplay -= 1;
      }
      return draft;
    }
    )
  };
  if (action.type === SETMINESDISPLAY) {
    return produce(state, (draft: { minesDisplay: number }) => {
        draft.minesDisplay = action.payload.minesDisplay;
      return draft;
    });
  }
  if (action.type === PAUSE) {
    return produce(state, (draft: { paused: boolean }) => {
      if (draft) {
        draft.paused = !draft.paused;
      }
      return draft;
    });
  }
  return state;
};

export default formReducer;
