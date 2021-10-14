interface TAction {
  type: string,
  payload?: {
    val?: number,
    isMine?: boolean,
    uncovered?: boolean,
    markedAsMine?: boolean,
    loser?: boolean,
    row?: number,
    col?: number,
    length?: number,
    width?: number,
    mines?: number,
    minesDisplay?: number,
    number?: number,
  },
};

export default TAction;