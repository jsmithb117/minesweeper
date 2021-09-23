import reducer from './reducer';
import { createStore } from 'redux';
import boardCreator from './boardCreator';

const initialState = {
  board: boardCreator(),
  win: false,
  loss: false,
};

const store = createStore(reducer, initialState);

export default store;
export type RootState = ReturnType<typeof store.getState>
