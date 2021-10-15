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