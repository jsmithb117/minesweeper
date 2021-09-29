import boardCreator, { Board } from './boardCreator';

export interface IState extends IInitialState {
  board: Board,
};

interface IInitialState {
  piecesMarkedAsMine: number,
  minesDisplay: number,
  time: number,
  length: number,
  width: number,
  totalMines: number,
  win: boolean,
  loss: boolean,
};

const initialState = (test: boolean = false) => {
  const state: IInitialState = {
    piecesMarkedAsMine: 0,
    minesDisplay: 0,
    time: 0,
    length: 10,
    width: 10,
    totalMines: 10,
    win: false,
    loss: false,
  };
  if (test) {
    const newState: IState = { ...state, board: boardCreator(state.length, state.width, state.totalMines, true) }
    return newState;
  }
  const newState: IState = { ...state, board: boardCreator() }
  return newState;
};

export default initialState;