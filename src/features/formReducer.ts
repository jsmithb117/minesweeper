import produce, { Draft } from 'immer';
import {
  RESETTIME,
  INCREMENTTIME,
  SETLENGTH,
  SETWIDTH,
  SETMINES,
  IFormPayload,
  INCREMENTMINESDISPLAY,
  DECREMENTMINESDISPLAY,
  SETMINESDISPLAY,
} from './actionCreators';
import { IFormState } from './initialState';

const formReducer = (state: IFormState | null = null, action: IFormPayload) => {
  if (action.type === RESETTIME) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.time = 0;
      return draft;
    });
  }
  if (action.type === INCREMENTTIME) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.time += 1;
    });
  }
  if (action.type === SETLENGTH) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.length = action.payload;
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.width = action.payload;
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.mines = action.payload
      return draft;
    });
  }
  if (action.type === INCREMENTMINESDISPLAY) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.minesDisplay += 1;
      return draft;
    });
  }
  if (action.type === DECREMENTMINESDISPLAY) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.minesDisplay -= 1;
      return draft;
    }
    )
  };
  if (action.type === SETMINESDISPLAY) {
    return produce(state, (draft: Draft<IFormState>) => {
      draft.minesDisplay = action.payload;
      return draft;
    });
  }
  return state;
};

export default formReducer;
