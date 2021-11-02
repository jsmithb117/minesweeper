import { Board } from "../interfaces/interfaces";

const checkWin = (board: Board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j].uncovered && !board[i][j].isMine) {
        return false;
      }
    }
  }
  return true;
};

export default checkWin;