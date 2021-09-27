export interface IPiece {
    val: number,
    isMine: boolean,
    uncovered: boolean,
    markedAsMine: boolean,
    row: number,
    col: number,
};

export interface IRow extends Array<IPiece>{};
export interface Board extends Array<IRow>{};

const boardCreator = (length: number = 10, width: number = 10, mines: number = 10, testBoard: boolean = false) => {
  const piece: IPiece = {
    val: 0,
    isMine: false,
    uncovered: false,
    markedAsMine: false,
    row: 0,
    col: 0,
  };
  let board: Board;
  if (testBoard) {
    const blankBoard: Board = new Array(length).fill(new Array(width).fill(piece));
    board = blankBoard.map((rowArray: IPiece[], row: number) => {
      return rowArray.map((newPiece: IPiece, col: number) => {
        if (row === 0) {
          return { ...newPiece, isMine: true, markedAsMine: true, row, col };
        }
        if (row === 2) {
          return { ...newPiece, uncovered: true, row, col };
        }
        return { ...newPiece, row, col };
      });
    });
  } else {

    const blankBoard: Board = new Array(length).fill(new Array(width).fill(piece));
    board = blankBoard.map((rowArray: IPiece[], row: number) => {
      return rowArray.map((piece: IPiece, col: number) => ({ ...piece, row, col }));
    });

    let mineCount = 0;
    while (mineCount < mines) {
      const rowIndex = Math.floor(Math.random() * length);
      const colIndex = Math.floor(Math.random() * width);
      if (!board[rowIndex][colIndex].isMine) {
        board[rowIndex][colIndex].isMine = true;
        mineCount++;
      }
    }
  }

  board.forEach((rowArray, row) => {
    rowArray.forEach((piece, col) => {
      piece.val = countAdjacentMines(row, col, board);
    });
  });
  return board;
};

const countAdjacentMines = (row: number, col: number, board: Board) => {
  let count = 0;
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (board[r] && board[r][c]) {
        const piece = board[r][c];
        if (piece.isMine)
          count += 1;
      };
    }
  };
  return count;
};

export default boardCreator;
