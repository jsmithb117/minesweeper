import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { createStore } from 'redux';
import { rootReducer } from '../features/store';
import initialStateCreator from '../features/initialState';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BestGlobalScore from './BestGlobalScore';

const initialTestState: any = initialStateCreator(10,10,10,true);
Enzyme.configure({ adapter: new Adapter() });

describe('BestGlobalScore', () => {
  let store= createStore(rootReducer, initialTestState);
  let wrapper: ReactWrapper;
  const score = {
    _id: '618172424cc87daf91d0bad0',
    username: 'user1',
    seconds: 47,
    date: new Date().toISOString(),
  };
  beforeEach(() => {
    store = createStore(rootReducer, initialTestState);
    wrapper = mount(
      <Provider store={store}>
        <React.StrictMode>
          <BestGlobalScore type={'expert'} score={score} rank={1}/>
        </React.StrictMode>
      </Provider>
    );
  });
  it('has the proper className', () => {
    const bestScore = wrapper.find(BestGlobalScore);
    expect(bestScore.props()).toEqual({
      type: 'expert',
      score,
      rank: 1,
    });
  });
});