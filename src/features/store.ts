import { clickReducer, formReducer, statsReducer } from '../reducers';
import { createStore, combineReducers } from 'redux';
import initialStateCreator from './initialState';

export const rootReducer = combineReducers({ click: clickReducer, form: formReducer, stats: statsReducer });
const initialState: any = initialStateCreator();
const store = createStore(rootReducer, initialState);
export default store;
