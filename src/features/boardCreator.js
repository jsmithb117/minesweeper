let boardCreator = (length = 10, width = 10, mines = 10) => {
  let board = [];

  // populates board with pieces
  for (let rows = 0; rows < length; rows++) {
    let row = [];
    for (let cols = 0; cols < width; cols++) {
      let piece = {
        val: 0,
        uncovered: false,
        markedAsMine: false,
        row: rows,
        col: cols,
      };
      row.push(piece);
    }
    board.push(row);
  }

  // creates mines
  let mineCount = 0;
  while (mineCount < mines) {
    let rowIndex = Math.floor(Math.random() * length);
    let colIndex = Math.floor(Math.random() * width);
    if (!board[rowIndex][colIndex].val) {
      board[rowIndex][colIndex].val = 'X';
      mineCount++;
    }
  }

  //traverses board and sets the number of adjacent mines
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      board[row][col].val = board[row][col].val !== 'X' ? countMines(row, col, board) : 'X';
    }
  }

  return board;
};

let countMines = (row, col, board) => {
  let count = 0;
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      count = board[r] && board[r][c]?.val === 'X' ? count + 1 : count;
    }
  }
  return count;
};

export const testBoardCreator = () => {
  let board = [];

  // populates board with pieces
  for (let rows = 0; rows < 10; rows++) {
    let row = [];
    for (let cols = 0; cols < 10; cols++) {
      let piece;
      if (rows === 0) {
        piece = {
          val: 'X',
          uncovered: true,
          markedAsMine: true,
          row: rows,
          col: cols,
        };
      } else if (rows === 1) {
        piece = {
          val: 0,
          uncovered: true,
          markedAsMine: false,
          row: rows,
          col: cols,
        };
      } else {
        piece = {
          val: 0,
          uncovered: false,
          markedAsMine: false,
          row: rows,
          col: cols,
        };
      }

      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          board[row][col].val = board[row][col].val !== 'X' ? countMines(row, col, board) : 'X';
        }
      }

      row.push(piece);
    }
    board.push(row);
  }

  return {
    board,
    win: false,
    loss: false,
  };
};




export default boardCreator;