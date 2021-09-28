import reducer from './reducer';
import { createStore } from 'redux';
import boardCreator, { Board } from './boardCreator';

interface IInitialState {
  board: Board,
  win: boolean,
  loss: boolean
};

const initialState: IInitialState = {
  board: boardCreator(10, 10, 10, false),
  win: false,
  loss: false,
};

const store = createStore(reducer, initialState);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;