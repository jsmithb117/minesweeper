// uncovers elements as required
const zeroFinder = (row, col, board) => {
  if (board[row][col].val !== 'X') {
    board[row][col].uncovered = true;
  }
  // if element is zero, uncovers adjacent elements recursively
  if (board[row][col].val === 0) {
    // creates references to nearby elements
    // UL|U|UR
    // LL| |RR
    // DL|D|DR
    const UL = board[row - 1] && board[row - 1][col - 1] ? board[row - 1][col - 1] : undefined;
    const U = board[row - 1] && board[row - 1][col] ? board[row - 1][col] : undefined;
    const UR = board[row - 1] && board[row - 1][col + 1] ? board[row - 1][col + 1] : undefined;

    const LL = board[row][col - 1] ? board[row][col - 1] : undefined;
    const RR = board[row][col + 1] ? board[row][col + 1] : undefined;

    const DL = board[row + 1] && board[row + 1][col - 1] ? board[row + 1][col - 1] : undefined;
    const D = board[row + 1] && board[row + 1][col] ? board[row + 1][col] : undefined;
    const DR = board[row + 1] && board[row + 1][col + 1] ? board[row + 1][col + 1] : undefined;

    // recurses as required
    if (UL && !UL.isMine && !UL.uncovered) {
      board = zeroFinder(row - 1, col - 1, board);
    }
    if (U && !U.isMine && !U.uncovered) {
      board = zeroFinder(row - 1, col, board);
    }
    if (UR && !UR.isMine && !UR.uncovered) {
      board = zeroFinder(row - 1, col + 1, board);
    }
    if (LL && !LL.isMine && !LL.uncovered) {
      board = zeroFinder(row, col - 1, board);
    }
    if (RR && !RR.isMine && !RR.uncovered) {
      board = zeroFinder(row, col + 1, board);
    }
    if (DR && !DR.isMine && !DR.uncovered) {
      board = zeroFinder(row + 1, col + 1, board);
    }
    if (D && !D.isMine && !D.uncovered) {
      board = zeroFinder(row + 1, col, board);
    }
    if (DL && !DL.isMine && !DL.uncovered) {
      board = zeroFinder(row + 1, col - 1, board);
    }
  }
  return board;
};

export default zeroFinder;
