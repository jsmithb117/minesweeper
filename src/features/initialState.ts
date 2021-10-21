import boardCreator from './boardCreator';
import { Board, IInitialState } from '../interfaces/interfaces';
import { defaultVal } from '../components/Form';

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
      difficulty: defaultVal,
    },
    stats: {
      bestBeginnerScore: { username: '', seconds: Number.NEGATIVE_INFINITY, date: new Date() },
      bestIntermediateScore: { username: '', seconds: Number.NEGATIVE_INFINITY, date: new Date() },
      bestExpertScore: { username: '', seconds: Number.NEGATIVE_INFINITY, date: new Date() },
      beginnerScores: [{ username: '', seconds: Number.NEGATIVE_INFINITY, date: new Date() }],
      intermediateScores: [{ username: '', seconds: Number.NEGATIVE_INFINITY, date: new Date() }],
      expertScores: [{ username: '', seconds: Number.NEGATIVE_INFINITY, date: new Date() }],
      totalGamesPlayed: 0,
      username: 'user1',
    }
  }
  return state;
};

export default initialStateCreator;
