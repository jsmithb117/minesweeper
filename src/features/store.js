import reducer from './reducer';
import { createStore } from 'redux';
import boardCreator from './boardCreator';
import Board from './boardCreator';

interface InitialState {
  board: Board,
  win: boolean,
  loss: boolean
};

const initialState: InitialState = {
  board: boardCreator(),
  win: false,
  loss: false,
};

const store = createStore(reducer, initialState);
console.log('store: ', store);

export default store;
export interface RootState extends store.getState {};
export interface AppDispatch extends store.dispatch{};
