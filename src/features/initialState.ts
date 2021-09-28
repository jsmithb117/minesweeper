import boardCreator, { Board } from './boardCreator';

export interface State {
  board: Board,
  win: boolean,
  loss: boolean,
};

const initialState = (test: boolean = false) => {
  const state: { win: boolean, loss: boolean } = {
    win: false,
    loss: false,
  };
  if (test) {
    return { ...state, board: boardCreator(10, 10, 10, true) }
  }
  const newState: State = { ...state, board: boardCreator() }
  return newState;
};

export default initialState;