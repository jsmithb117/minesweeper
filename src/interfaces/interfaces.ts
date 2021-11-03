import { BaseSyntheticEvent } from 'react';
import store from '../features/store';

export interface IActionNoPayload {
  type: string,
};

export interface IActionNumberPayload extends IActionNoPayload {
  payload: number,
};

export interface IPiece {
  val: number,
  isMine: boolean,
  uncovered: boolean,
  markedAsMine: boolean,
  loser: boolean,
  row: number,
  col: number,
};
export interface IRow extends Array<IPiece>{};
export interface Board extends Array<IRow>{};

export interface IActionPiecePayload extends IActionNoPayload {
  payload: IPiece,
};

export interface IActionLengthPayload extends IActionNoPayload {
  payload: {
    length: number,
  },
};

export interface IActionWidthPayload extends IActionNoPayload {
  payload: {
    width: number,
  },
};

export interface IActionMinesPayload extends IActionNoPayload {
  payload: {
    mines: number,
  },
};

export interface IActionMinesDisplay extends IActionNoPayload {
  payload: {
    minesDisplay: number,
  },
};

export interface DisplayState {
  form: {
    minesDisplay: number,
    time: number,
    length: number,
    width: number,
    mines: number,
    paused: boolean,
  },
};

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
  difficulty: string,
};

export interface IStatsState {
    bestBeginnerScore: IScore,
    bestIntermediateScore: IScore,
    bestExpertScore: IScore,
    beginnerScores: IScore[],
    intermediateScores: IScore[],
    expertScores: IScore[],
    totalGamesCompleted: number,
    username: string,
};

export interface IInitialState {
  click: IClickState,
  form: IFormState,
  stats: IStatsState,
};

export interface IScore {
  username: string,
  seconds: number,
  date: Date,
};


export interface IAction {
  type: String,
  payload: {
    val: Number | null,
    isMine: Boolean | null,
    uncovered: Boolean | null,
    markedAsMine: Boolean | null,
    loser: Boolean | null,
    row: number | null,
    col: Number | null,
    piece: {
      val: Number | null,
      isMine: Boolean | null,
      uncovered: Boolean | null,
      markedAsMine: Boolean | null,
      loser: Boolean | null,
      row: number | null,
      col: number | null,
    },
    length: number | null,
    width: number | null,
    mines: number | null,
    minesDisplay: number | null,
    bestBeginnerScore: IScore | null,
    bestIntermediateScore: IScore | null,
    bestExpertScore: IScore | null,
    beginnerScores: IScore[] | null,
    intermediateScores: IScore[] | null,
    expertScores: IScore[] | null,
    totalGamesCompleted: number | null,
    username: string | null,
    difficulty: string | null,
  }
};

export interface IStatsUpdate {
  bestBeginnerScore: IScore | null,
  bestIntermediateScore: IScore | null,
  bestExpertScore: IScore | null,
  beginnerScores: IScore[] | null,
  intermediateScores: IScore[] | null,
  expertScores: IScore[] | null,
  totalGamesCompleted: number | null,
};
export interface IUserUpdate extends IStatsUpdate {
  username: string,
};

export interface IBestProps {
  type: string,
  score: IScore,
};

export interface IBestGlobalProps {
  type: string,
  scores: IScore[],
};

export interface IBestGlobalScoreProps {
  type: string,
  score: IScore,
  rank: number,
};

export interface event {
  target: {
    value: string,
  }
};

export interface TEvent extends BaseSyntheticEvent {
  target: {
    value: string
  },
};

export interface IProps {
  piece: IPiece,
  loss: boolean | undefined,
  win: boolean | undefined,
};

export interface IState {
  form: {
    width: number,
    length: number,
    paused: boolean,
  },
  click: {
    loss: boolean,
  },
};

export interface IRowProps {
  row: IRow,
  win: boolean | undefined,
  loss: boolean | undefined,
};

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

export type RootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;


export interface IScore {
  username: string,
  seconds: number,
  date: Date,
  _id: string
}
export interface IStatsObject {
  beginnerScores: IScore[],
  intermediateScores: IScore[],
  expertScores: IScore[],
  bestBeginnerScore: IScore,
  bestIntermediateScore: IScore,
  bestExpertScore: IScore,
  totalGamesCompleted: number,
  username: string,
}
export interface IStatsDraft {
  bestBeginnerScore: IScore | null,
  bestIntermediateScore: IScore | null,
  bestExpertScore: IScore | null,
  beginnerScores: IScore[] | null,
  intermediateScores: IScore[] | null,
  expertScores: IScore[] | null,
  totalGamesCompleted: number | null,
}