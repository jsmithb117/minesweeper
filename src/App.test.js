import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import { testBoardCreator } from './features/boardCreator';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Piece from './components/Piece';

const mockStore = configureMockStore([thunk]);
const initialTestState = testBoardCreator();
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  const store = mockStore(initialTestState);
  const wrapper = mount(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
  it('should render 100 Piece components on testBoard', () => {
    expect(wrapper.find(Piece).length).toEqual(100)
  });
  it('should render 10 Piece components whose val is set as \'X\' on testBoard', () => {
    expect(wrapper.findWhere(node => node?.props()?.piece?.val === 'X').length).toEqual(10);
  });
  it('should render 10 Piece components whose \'markedAsMine\' property is set to true on testBoard', () => {
    expect(wrapper.findWhere(node => node?.props()?.piece?.markedAsMine === true).length).toEqual(10);
  });
  it('should render 20 Piece components with the \'uncovered\' property set on testBoard', () => {
    expect(wrapper.findWhere(node => node?.props()?.piece?.uncovered).length).toEqual(20);
  });
});
