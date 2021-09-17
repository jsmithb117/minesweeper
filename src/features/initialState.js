import boardCreator from './boardCreator';

const initialState = {
  board: boardCreator(),
  win: false,
  loss: false
};

export default initialState;