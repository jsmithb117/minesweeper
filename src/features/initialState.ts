import boardCreator, { Board } from './boardCreator';

export interface IClickState {
    board: Board,
    win: boolean,
    loss: boolean,
};

export interface IFormState {
    piecesMarkedAsMine: 0,
    minesDisplay: 0,
    time: 0,
    length: 10,
    width: 10,
    mines: 10,
};

export interface IInitialState {
  click: IClickState,
  form: IFormState,
};

const initialStateCreator = (
  length: number = 10,
  width: number = 10,
  mines: number = 10,
  test: boolean = false) => {
  const state: IInitialState = {
    click: {
      board: boardCreator(length, width, mines, test),
      win: false,
      loss: false,
    },
    form: {
      piecesMarkedAsMine: 0,
      minesDisplay: 0,
      time: 0,
      length: 10,
      width: 10,
      mines: 10,
    }
  }
  return state;
};

export const initialState: IInitialState = {
  click: {
    board: boardCreator(10, 10, 10, false),
    win: false,
    loss: false,
  },
  form: {
    piecesMarkedAsMine: 0,
    minesDisplay: 0,
    time: 0,
    length: 10,
    width: 10,
    mines: 10,
  }
}

export default initialStateCreator;