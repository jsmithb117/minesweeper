import boardCreator from './boardCreator';

const initialState = (test = false) => {
  const state = {
    win: false,
    loss: false,
  };
  if (test) {
    return { ...state, board: boardCreator(10, 10, 10, true) }
  }
  return { ...state, board: boardCreator() };

};

export default initialState;