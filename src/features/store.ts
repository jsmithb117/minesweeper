import reducer  from './reducer';
import { createStore } from 'redux';
import initialStateCreator from './initialState';

const initialState = initialStateCreator(10, 10, 10, false);
const store = createStore(reducer, initialState);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;