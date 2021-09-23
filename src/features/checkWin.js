const checkWin = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      //if piece is not uncovered AND piece is not a mine
      if (!board[i][j].uncovered && !board[i][j].isMine) {
        return false;
      }
    }
  }
  return true;
};

export default checkWin;