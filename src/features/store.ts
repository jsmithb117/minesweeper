// import { clickReducer, formReducer}  from './reducer';
import clickReducer from './clickReducer';
import formReducer from './formReducer';
import { createStore, combineReducers } from 'redux';
import initialStateCreator from './initialState';

export const rootReducer = combineReducers({ click: clickReducer, form: formReducer });
const initialState: any = initialStateCreator();
const store = createStore(rootReducer, initialState);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;