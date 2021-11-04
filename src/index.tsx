import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './features/store';
import { QueryClientProvider } from 'react-query';
import queryClient from './features/queryClient'

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
        <App test={false} />
      </React.StrictMode>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
);
