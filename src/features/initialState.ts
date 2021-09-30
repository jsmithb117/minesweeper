import boardCreator, { Board } from './boardCreator';

export interface IClickState {
  click: {
    board: Board,
    win: boolean,
    loss: boolean,
  },
};

export interface IFormState {
  form: {
    piecesMarkedAsMine: 0,
    minesDisplay: 0,
    time: 0,
    length: 10,
    width: 10,
    mines: 10,
  },
};

export interface IInitialState extends IClickState, IFormState {};

const initialStateCreator = (
  length: number = 10,
  width: number = 10,
  mines: number = 10,
  test: boolean = false) => ({
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
});

// const initialStateCreator = (test: boolean = false, state: IInitialState = defaultState) => {

//   if (test) {
//     const newState: IState = { ...state, board: boardCreator(state.length, state.width, state.mines, true) }
//     return newState;
//   }
//   const newState: IState = { ...state, board: boardCreator() }
//   return newState;
// };

export default initialStateCreator;