import { configureStore } from '@reduxjs/toolkit';

import clickReducer from '../reducers/clickSlice';
import formReducer from '../reducers/formSlice';
import statsReducer from '../reducers/statsSlice';

const store = configureStore({
  reducer: {
    click: clickReducer,
    form: formReducer,
    stats: statsReducer,
  },
});

export default store;