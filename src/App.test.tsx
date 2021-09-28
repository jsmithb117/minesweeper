import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { createStore } from 'redux';

import reducer from './features/reducer';
import App from './App';
import initialState from './features/initialState';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Piece from './components/Piece';

const testBoard = true;
const initialTestState = initialState(testBoard);
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  let store, wrapper: ReactWrapper;
  beforeEach(() => {
    store = createStore(reducer, initialTestState);
    wrapper = mount(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    );
  })

  const findPieceAtRowCol = (row: number, col: number) => {
    return wrapper.find(Piece).filterWhere((n) => {
      return n.props().piece.row === row && n.props().piece.col === col;
    });
  };

  it('should render 100 Piece components on testBoard', () => {
    expect(wrapper.find(Piece).length).toEqual(100)
  });
  it('should render 10 Piece components whose isMine property is set to true on testBoard', () => {
    expect(wrapper.find(Piece).filterWhere((n) => n.props().piece.isMine).length).toBe(10);
  });
  it('should render 10 Piece components whose \'markedAsMine\' property is set to true on testBoard', () => {
    expect(wrapper.find(Piece).filterWhere((n) => n.props().piece.markedAsMine).length).toBe(10);
  });
  it('should render 10 Piece components whose \'uncovered\' property is set to true on testBoard', () => {
    expect(wrapper.find(Piece).filterWhere((n) => n.props().piece.uncovered).length).toBe(10);
  });
  it('should not change \'uncovered\' property when markedAsMine is true', () => {
    const button = findPieceAtRowCol(1, 1);
    expect(button.props().piece.uncovered).toBe(false);
    expect(button.props().piece.markedAsMine).toBe(false);
    button.simulate('contextmenu', { ...button.props() });
    const button2 = findPieceAtRowCol(1,1);
    expect(button2.props().piece.markedAsMine).toBe(true);
    button2.simulate('click', { ...button2.props() });
    const button3 = findPieceAtRowCol(1,1);
    expect(button3.props().piece.uncovered).toBe(false);
  });
  it('should toggle \'markedAsMine\' property when piece is right clicked', () => {
    const button = findPieceAtRowCol(9, 9);
    expect(button.props().piece.markedAsMine).toBe(false);
    button.simulate('contextmenu', { ...button.props().piece });
    const button2 = findPieceAtRowCol(9, 9);
    expect(button2.props().piece.markedAsMine).toBe(true);
    button.simulate('contextmenu', { ...button.props() });
    expect(findPieceAtRowCol(9, 9).props().piece.markedAsMine).toBe(false);
  });
  it('should set \'uncovered\' property to true when piece is left clicked', () => {
    const button = findPieceAtRowCol(9, 9);
    expect(button.props().piece.uncovered).toBe(false);
    button.simulate('click', { ...button.props() });
    expect(findPieceAtRowCol(9, 9).props().piece.uncovered).toBe(true);
  });
  it('should set \'loss\' property to true when an unset mine is clicked', () => {
    const button = findPieceAtRowCol(0, 0);
    expect(button.props().piece.uncovered).toBe(false);
    expect(button.props().piece.markedAsMine).toBe(true);
    button.simulate('contextmenu', { ...button.props().piece });
    const button2 = findPieceAtRowCol(0, 0);
    expect(button2.props().piece.markedAsMine).toBe(false);
    button.simulate('click', { ...button.props().piece });
    expect(findPieceAtRowCol(0, 0).props().loss).toBe(true);
  });
  it('should set \'win\' property to true when all pieces whose value is not \'X\' are uncovered', () => {
    const buttons = wrapper.find(Piece).filterWhere((n) => n.props().piece.markedAsMine === false);
    buttons.forEach((node) => {
      node.simulate('click', { ...node?.props()?.piece });
    });
    expect(wrapper.find(Piece).at(0).props().win).toBe(true);
  });
  it('should set \'loss\' property to true when an uncovered mine is clicked', () => {
    const button = findPieceAtRowCol(0, 0);
    expect(button.props().piece.markedAsMine).toBe(true);
    button.simulate('contextmenu', { ...button.props().piece });
    const button2 = findPieceAtRowCol(0, 0);
    expect(button2.props().piece.markedAsMine).toBe(false);
    expect(button2.props().loss).toBe(false);
    button2.simulate('click', { ...button2.props().piece });
    expect(findPieceAtRowCol(0, 0).props().loss).toBe(true);
  });
});

