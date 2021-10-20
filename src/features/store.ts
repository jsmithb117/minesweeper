import clickReducer from './clickReducer';
import formReducer from './formReducer';
import { createStore, combineReducers } from 'redux';
import initialStateCreator from './initialState';
import statsReducer from './statsReducer';

export const rootReducer = combineReducers({ click: clickReducer, form: formReducer, stats: statsReducer });
const initialState: any = initialStateCreator();
const store = createStore(rootReducer, initialState);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;