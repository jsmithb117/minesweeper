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
  mines: number,
  win: boolean,
  loss: boolean,
};

const defaultState: IInitialState = {
  piecesMarkedAsMine: 0,
  minesDisplay: 0,
  time: 0,
  length: 10,
  width: 10,
  mines: 10,
  win: false,
  loss: false,
};

const initialStateCreator = (test: boolean = false, state: IInitialState = defaultState) => {

  if (test) {
    const newState: IState = { ...state, board: boardCreator(state.length, state.width, state.mines, true) }
    return newState;
  }
  const newState: IState = { ...state, board: boardCreator() }
  return newState;
};

export default initialStateCreator;