import boardCreator, { Board } from './boardCreator';

export interface IClickState {
  piecesMarkedAsMine: number,
  board: Board,
  originalBoard: Board,
  win: boolean,
  loss: boolean,
};

export interface IFormState {
  minesDisplay: number,
  time: number,
  length: number,
  width: number,
  mines: number,
  paused: boolean,
};

export interface IInitialState {
  click: {
    piecesMarkedAsMine: number,
    board: Board,
    originalBoard: Board,
    win: boolean,
    loss: boolean,
  },
  form: {
    minesDisplay: number,
    time: number,
    length: number,
    width: number,
    mines: number,
    paused: boolean,
  },
};

const initialStateCreator = (
  length: number = 10,
  width: number = 10,
  mines: number = 10,
  test: boolean = false) => {
  const newBoard = boardCreator(length, width, mines, test);
  const state: IInitialState = {
    click: {
      piecesMarkedAsMine: 0,
      board: newBoard,
      originalBoard: newBoard,
      win: false,
      loss: false,
    },
    form: {
      minesDisplay: 0,
      time: 0,
      length: 10,
      width: 10,
      mines: 10,
      paused: false,
    }
  }
  return state;
};

export default initialStateCreator;
