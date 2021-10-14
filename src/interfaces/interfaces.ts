interface IActionNoPayload {
  type: string,
};

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

// type TAction = IActionPayload | IActionNoPayload | (IActionPayload & IActionNoPayload);

export default TAction;