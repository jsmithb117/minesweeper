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
    totalGamesPlayed: number,
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
  type: String | null,
  payload: {
    val: Number | null,
    isMine: Boolean | null,
    uncovered: Boolean | null,
    markedAsMine: Boolean | null,
    loser: Boolean | null,
    row: Number | null,
    col: Number | null,
    piece: {
      val: Number | null,
      isMine: Boolean | null,
      uncovered: Boolean | null,
      markedAsMine: Boolean | null,
      loser: Boolean | null,
      row: Number | null,
      col: Number | null,
    },
    length: Number | null,
    width: Number | null,
    mines: Number | null,
    minesDisplay: Number | null,
    bestBeginnerScore: IScore | null,
    bestIntermediateScore: IScore | null,
    bestExpertScore: IScore | null,
    beginnerScores: IScore[] | null,
    intermediateScores: IScore[] | null,
    expertScores: IScore[] | null,
    totalGamesPlayed: number | null,
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
  totalGamesPlayed: number | null,
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
}
