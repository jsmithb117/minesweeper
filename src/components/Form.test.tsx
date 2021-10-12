import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
// import '@testing-library/jest-dom'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../features/store';
import initialStateCreator from '../features/initialState';
import Form from './Form';

const initialTestState: any = initialStateCreator(10, 10, 10, true);

test('updates Form state on \'Beginner\' radio select and updates store on submit', async () => {
  const store = createStore(rootReducer, initialTestState);
  render(
    <Provider store={store}>
      <React.StrictMode>
        <Form />
      </React.StrictMode>
    </Provider>
  );
  const firstState: any = store.getState();
  expect(firstState.form.length).toBe(10);
  expect(firstState.form.width).toBe(10);
  expect(firstState.form.mines).toBe(10);

  const iButton = screen.getByLabelText('Beginner')
  const submit = screen.getByText('Submit')
  fireEvent.click(iButton);
  fireEvent.click(submit);

  const secondState: any = store.getState();
  expect(secondState.form.length).toBe(8);
  expect(secondState.form.width).toBe(8);
  expect(secondState.form.mines).toBe(8);
});

test('updates Form state on \'Default\' radio select and updates store on submit', () => {
  const store = createStore(rootReducer, initialTestState);
  render(
    <Provider store={store}>
      <React.StrictMode>
        <Form />
      </React.StrictMode>
    </Provider>
  );
  const firstState: any = store.getState();
  expect(firstState.form.length).toBe(10);
  expect(firstState.form.width).toBe(10);
  expect(firstState.form.mines).toBe(10);

  const beginnerButton = screen.getByLabelText('Beginner');
  fireEvent.click(beginnerButton);
  const iButton = screen.getByLabelText('Default')
  const submit = screen.getByText('Submit');
  fireEvent.click(iButton);
  fireEvent.click(submit);

  const secondState: any = store.getState();
  expect(secondState.form.length).toBe(10);
  expect(secondState.form.width).toBe(10);
  expect(secondState.form.mines).toBe(10);
});

test('updates Form state on \'Intermediate\' radio select and updates store on submit', () => {
  const store = createStore(rootReducer, initialTestState);
  render(
    <Provider store={store}>
      <React.StrictMode>
        <Form />
      </React.StrictMode>
    </Provider>
  );
  const firstState: any = store.getState();
  expect(firstState.form.length).toBe(10);
  expect(firstState.form.width).toBe(10);
  expect(firstState.form.mines).toBe(10);

  const iButton = screen.getByLabelText('Intermediate')
  const submit = screen.getByText('Submit')
  fireEvent.click(iButton);
  fireEvent.click(submit);

  const secondState: any = store.getState();
  expect(secondState.form.length).toBe(13);
  expect(secondState.form.width).toBe(15);
  expect(secondState.form.mines).toBe(40);
});

test('updates Form state on \'Expert\' radio select and updates store on submit', () => {
  const store = createStore(rootReducer, initialTestState);
  render(
    <Provider store={store}>
      <React.StrictMode>
        <Form />
      </React.StrictMode>
    </Provider>
  );
  const firstState: any = store.getState();
  expect(firstState.form.length).toBe(10);
  expect(firstState.form.width).toBe(10);
  expect(firstState.form.mines).toBe(10);

  const iButton = screen.getByLabelText('Expert')
  const submit = screen.getByText('Submit')
  fireEvent.click(iButton);
  fireEvent.click(submit);

  const secondState: any = store.getState();
  expect(secondState.form.length).toBe(16);
  expect(secondState.form.width).toBe(30);
  expect(secondState.form.mines).toBe(99);
});
