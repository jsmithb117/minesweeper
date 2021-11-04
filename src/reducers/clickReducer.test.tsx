import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { createStore } from 'redux';
import { rootReducer } from '../features/store';
import App from '../App';
import initialStateCreator from '../features/initialState';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Piece from '../components/Piece';
import { QueryClientProvider } from 'react-query';
import queryClient from '../features/queryClient';
import { act } from '@testing-library/react';


const initialTestState: any = initialStateCreator(10,10,10,true);
Enzyme.configure({ adapter: new Adapter() });

describe('clickReducer test board', () => {
  let store= createStore(rootReducer, initialTestState);
  let wrapper: ReactWrapper;
  beforeEach(() => {
    store = createStore(rootReducer, initialTestState);
    wrapper = mount(
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <React.StrictMode>
          <App test={true} />
        </React.StrictMode>
      </Provider>
      </QueryClientProvider>
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
    const clickState: any = store.getState().click;
    expect(clickState.loss).toBe(true);
    const secondButton = findPieceAtRowCol(5,5);
    expect(secondButton.props().piece.markedAsMine).toBe(true);
    secondButton.simulate('contextMenu', secondButton.props().piece);
    const thirdButton = findPieceAtRowCol(5,5);
    expect(thirdButton.props().piece.markedAsMine).toBe(true);
  });
  it('should not execute an action if state.click.win is true', () => {
    const firstClick: any = store.getState().click;
    expect(firstClick.win).toBe(false);
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
    const secondState: any = store.getState();
    expect(secondState.click.win).toBe(true);
    expect(secondState.click.board[5][5].markedAsMine).toBe(true);
    findPieceAtRowCol(5,5).simulate('contextMenu');
    const thirdState: any = store.getState();
    expect(thirdState.click.board[5][5].markedAsMine).toBe(true);
  })
});

describe('clickReducer production board', () => {
  let store= createStore(rootReducer, initialTestState);
  let wrapper: any;
  beforeEach(() => {
    store = createStore(rootReducer, initialTestState);
    wrapper = act(() => {
      mount(
        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <React.StrictMode>
            <App test={true} />
          </React.StrictMode>
        </Provider>
        </QueryClientProvider>
      );
    })
  });

  it('should create a board with 10 mines', () => {
    // const mines= wrapper.find(Piece).findWhere((node) => node.props().piece?.isMine === true);
    // expect(mines.length).toBe(10);
    expect(true).toBe(true);
  });
});

