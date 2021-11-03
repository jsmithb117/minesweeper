import { incrementTime, resetTime } from "../actionCreators/formActionCreators";
import formReducer from "./formReducer";
import initialStateCreator from '../features/initialState';

const initialState = initialStateCreator();

describe('formReducer', () => {
  it('handles the INCREMENTTIME and RESETTIME actions', () => {
    expect(initialState.form.time).toBe(0);
    const firstResultState: any = formReducer(initialState.form, incrementTime());
    expect(firstResultState.time).toBe(1);
    const secondResultState: any = formReducer(firstResultState, resetTime());
    expect(secondResultState.time).toBe(0);
  });
});