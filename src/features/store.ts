import clickReducer from '../reducers/clickReducer';
import formReducer from '../reducers/formReducer';
import { createStore, combineReducers } from 'redux';
import initialStateCreator from './initialState';
import statsReducer from '../reducers/statsReducer';

export const rootReducer = combineReducers({ click: clickReducer, form: formReducer, stats: statsReducer });
const initialState: any = initialStateCreator();
const store = createStore(rootReducer, initialState);
export default store;
