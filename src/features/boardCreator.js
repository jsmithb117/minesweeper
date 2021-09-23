const boardCreator = (length = 10, width = 10, mines = 10, testBoard = false) => {
  const piece = {
    val: 0,
    uncovered: false,
    markedAsMine: false,
    row: 0,
    col: 0,
  };
  let board;
  if (testBoard) {
    const blankBoard = new Array(length).fill(new Array(width).fill(piece));
    board = blankBoard.map((rowArray, row) => {
      return rowArray.map((newPiece, col) => {
        if (row === 0) {
          return { ...newPiece, val: 'X', markedAsMine: true, row, col };
        }
        if (row === 2) {
          return { ...newPiece, uncovered: true, row, col };
        }
        return { ...newPiece, row, col };
      });
    });
  } else {

    const blankBoard = new Array(length).fill(new Array(width).fill(piece));
    board = blankBoard.map((rowArray, row) => {
      return rowArray.map((piece, col) => ({ ...piece, row, col }));
    });

    let mineCount = 0;
    while (mineCount < mines) {
      const rowIndex = Math.floor(Math.random() * length);
      const colIndex = Math.floor(Math.random() * width);
      if (board[rowIndex][colIndex].val === 0) {
        board[rowIndex][colIndex].val = 'X';
        mineCount++;
      }
    }
  }

  board.forEach((rowArray, row) => {
    rowArray.forEach((piece, col) => {
      if (piece.val !== 'X') {
        piece.val = countAdjacentMines(row, col, board);
      }
    });
  });
  return board;
};

const countAdjacentMines = (row, col, board) => {
  let count = 0;
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      count = board[r] && board[r][c]?.val === 'X' ? count + 1 : count;
    };
  };
  return count;
};

export default boardCreator;
