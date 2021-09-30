import boardCreator, { Board } from './boardCreator';

export interface IClickState {
  board: Board,
  originalBoard: Board,
  win: boolean,
  loss: boolean,
};

export interface IFormState {
  piecesMarkedAsMine: number,
  minesDisplay: number,
  time: number,
  length: number,
  width: number,
  mines: number,
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
  const newBoard = boardCreator(length, width, mines, test);
  const state: IInitialState = {
    click: {
      board: newBoard,
      originalBoard: newBoard,
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

export const initialState: IInitialState = initialStateCreator(10,10,10,false);

export default initialStateCreator;