import clickReducer from './clickReducer';

import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { createStore } from 'redux';
import { rootReducer } from './store';
import App from '../App';
import initialStateCreator from './initialState';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Piece from '../components/Piece';

const initialTestState: any = initialStateCreator(10,10,10,true);
Enzyme.configure({ adapter: new Adapter() });

describe('clickReducer', () => {
  let store: any, wrapper: ReactWrapper;
  beforeEach(() => {
    store = createStore(rootReducer, initialTestState);
    wrapper = mount(
      <Provider store={store}>
        <React.StrictMode>
          <App test={true}/>
        </React.StrictMode>
      </Provider>
    );
  });

  const findPieceAtRowCol = (row: number, col: number) => {
    return wrapper.find(Piece).filterWhere((n) => {
      return n.props().piece.row === row && n.props().piece.col === col;
    });
  };

  it('should not execute an action if state.click.loss is true', () => {
    const button = findPieceAtRowCol(0,0);
    button.simulate('contextMenu', button.props().piece);
    button.simulate('click');
    expect(store.getState().click.loss).toBe(true);
    const secondButton = findPieceAtRowCol(5,5);
    expect(secondButton.props().piece.markedAsMine).toBe(true);
    secondButton.simulate('contextMenu', secondButton.props().piece);
    const thirdButton = findPieceAtRowCol(5,5);
    expect(thirdButton.props().piece.markedAsMine).toBe(true);
  });
  it('should not execute an action if state.click.win is true', () => {
    const firstState = store.getState();
    expect(firstState.click.win).toBe(false);
    const piecesToClick = [
      [1,0],
      [1,1],
      [1,2],
      [1,3],
      [1,4],
      [1,5],
      [1,6],
      [1,7],
      [1,8],
      [1,9],
      [0,5],
      [9,9],
    ];
    piecesToClick.forEach((p) => {
      const button = findPieceAtRowCol(p[0], p[1]);
      button.simulate('click');
    });
    const secondState = store.getState();
    expect(secondState.click.win).toBe(true);
    expect(secondState.click.board[5][5].markedAsMine).toBe(true);
    findPieceAtRowCol(5,5).simulate('contextMenu');
    const thirdState = store.getState();
    expect(thirdState.click.board[5][5].markedAsMine).toBe(true);
  })
});