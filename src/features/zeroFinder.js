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
    if (UL && UL.val !== 'X' && !UL.uncovered) {
      board = zeroFinder(row - 1, col - 1, board);
    }
    if (U && U.val !== 'X' && !U.uncovered) {
      board = zeroFinder(row - 1, col, board);
    }
    if (UR && UR.val !== 'X' && !UR.uncovered) {
      board = zeroFinder(row - 1, col + 1, board);
    }
    if (LL && LL.val !== 'X' && !LL.uncovered) {
      board = zeroFinder(row, col - 1, board);
    }
    if (RR && RR.val !== 'X' && !RR.uncovered) {
      board = zeroFinder(row, col + 1, board);
    }
    if (DR && DR.val !== 'X' && !DR.uncovered) {
      board = zeroFinder(row + 1, col + 1, board);
    }
    if (D && D.val !== 'X' && !D.uncovered) {
      board = zeroFinder(row + 1, col, board);
    }
    if (DL && DL.val !== 'X' && !DL.uncovered) {
      board = zeroFinder(row + 1, col - 1, board);
    }
  }
  return board;
};

export default zeroFinder;
