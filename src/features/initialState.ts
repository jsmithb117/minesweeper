import boardCreator, { Board } from './boardCreator';

export interface IState {
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
  const newState: IState = { ...state, board: boardCreator() }
  return newState;
};

export default initialState;