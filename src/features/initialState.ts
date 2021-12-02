import { boardCreator } from './index';
import { IInitialState } from '../interfaces/interfaces';
import { defaultVal } from '../components/Form';

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
      bestBeginnerScore: {
        _id: '',
        username: '',
        seconds: Number.NEGATIVE_INFINITY,
        date: new Date(),
      },
      bestIntermediateScore: {
        _id: '',
        username: '',
        seconds: Number.NEGATIVE_INFINITY,
        date: new Date(),
      },
      bestExpertScore: {
        _id: '',
        username: '',
        seconds: Number.NEGATIVE_INFINITY,
        date: new Date(),
      },
      beginnerScores: [{
        _id: '',
        username: '',
        seconds: Number.NEGATIVE_INFINITY,
        date: new Date(),
      }],
      intermediateScores: [{
        _id: '',
        username: '',
        seconds: Number.NEGATIVE_INFINITY,
        date: new Date(),
      }],
      expertScores: [{
        _id: '',
        username: '',
        seconds: Number.NEGATIVE_INFINITY,
        date: new Date(),
      }],
      totalGamesCompleted: 0,
      username: 'user1',
    },
  }
  return state;
};

export default initialStateCreator;
