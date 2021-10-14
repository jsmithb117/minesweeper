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
  PAUSE
} from './formActionCreators';

import { IFormState } from './initialState';

interface IFormNoPayload {
  type: string,
};
interface IFormNumberPayload {
  type: string,
  payload: number,
};

interface IFormBaseTest {
  type: string,
};

interface IFormNumberPayloadTest extends IFormBaseTest{
  payload: number,
};

interface IFormObjectPayloadTest extends IFormBaseTest {
  payload: {
    length: number,
    width: number,
    mines: number,
  },
};

// type IFormPayloadTest = IFormNumberPayloadTest| IFormObjectPayloadTest | (IFormNumberPayloadTest & IFormObjectPayloadTest);
type actions =
IFormNumberPayloadTest & IFormObjectPayloadTest & IFormNoPayload

const formReducer = (state: IFormState | null = null, action: actions) => {
  // console.log('action: ', action);
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
      if (draft) {
        draft.length = action.payload;
      }
      return draft;
    });
  }
  if (action.type === SETWIDTH) {
    return produce(state, (draft) => {
      if (draft) {
        draft.width = action.payload;
      }
      return draft;
    });
  }
  if (action.type === SETMINES) {
    return produce(state, (draft) => {
      if (draft) {
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
      if (draft) {
        draft.minesDisplay = action.payload;
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
