import produce, { Draft } from 'immer';
import {
  RESETTIME,
  INCREMENTTIME,
  SETLENGTH,
  SETWIDTH,
  SETMINES,
  INCREMENTMINESDISPLAY,
  DECREMENTMINESDISPLAY,
  SETMINESDISPLAY,
  PAUSE,
  DIFFICULTY
} from './formActionCreators';
import { IAction, IFormState } from '../interfaces/interfaces';

const formReducer = (state: IFormState | null = null, action: IAction) => {
  if (action.type === DIFFICULTY) {
    return produce(state, (draft: Draft<{ difficulty: string }>) => {
      draft.difficulty = action.payload.difficulty || '';
      return draft;
    })
  }
  if (action.type === RESETTIME) {
    return produce(state, (draft: any) => {
        draft.time = 0;
      return draft;
    });
  }
  if (action.type === INCREMENTTIME) {
    return produce(state, (draft: any) => {
      if (draft) {
        draft.time += 1;
      }
      return draft;
    });
  }
  if (action.type === SETLENGTH) {
    return produce(state, (draft: any) => {
      draft.length = action.payload.length || 0;
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce(state, (draft: any) => {
          draft.width = action.payload.width || 0;
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce(state, (draft: any) => {
        draft.mines = action.payload.mines || 0;
      return draft;
    });
  }
  if (action.type === INCREMENTMINESDISPLAY) {
    return produce(state, (draft: any) => {
        draft.minesDisplay += 1;
      return draft;
    });
  }
  if (action.type === DECREMENTMINESDISPLAY) {
    return produce(state, (draft: any) => {
      if (draft) {
        draft.minesDisplay -= 1;
      }
      return draft;
    }
    )
  };
  if (action.type === SETMINESDISPLAY) {
    return produce(state, (draft: any) => {
        draft.minesDisplay = action.payload.minesDisplay || 0;
      return draft;
    });
  }
  if (action.type === PAUSE) {
    return produce(state, (draft: any) => {
      if (draft) {
        draft.paused = !draft.paused;
      }
      return draft;
    });
  }
  return state;
};

export default formReducer;
