import initialState from './initialState';
const test = true;
const initialTestState = initialState(test);

describe('initialState', () => {

  it('should have a win property', () => {
    expect(initialTestState).toHaveProperty('win')
  });
  it('should have a loss property', () => {
    expect(initialTestState).toHaveProperty('loss')
  });
  it('should have a board property in the proper shape', () => {
    expect(initialTestState).toHaveProperty('board');
    expect(Array.isArray(initialTestState.board)).toBe(true);
    expect(initialTestState.board.length).toBe(10);
    initialTestState.board.forEach((row, rowIndex) => {
      expect(Array.isArray(row)).toBe(true);
      expect(row.length).toBe(10);
      row.forEach((piece, colIndex) => {
        let shouldBeUncovered = false;
        let shouldBeMarkedAsMine = false;
        if (rowIndex === 2) {
          shouldBeUncovered = true;
        }
        if (rowIndex === 0) {
          shouldBeMarkedAsMine = true;
        }
        const acceptableVals = [ 'X', 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
        expect(piece).toHaveProperty('val');
        expect(piece.val).toBeOneOf(acceptableVals);
        expect(piece).toHaveProperty('uncovered');
        expect(piece.uncovered).toBe(shouldBeUncovered);
        expect(piece).toHaveProperty('markedAsMine');
        expect(piece.markedAsMine).toBe(shouldBeMarkedAsMine);
        expect(piece).toHaveProperty('row');
        expect(piece.row).toBeNumber();
        expect(piece).toHaveProperty('col');
        expect(piece.col).toBeNumber();
      })
    })
  });

  // it('each Piece should have a \'val\' property, set as \'X\' or 0', () => {
  //   initialState.board.
  // });
  // it('each Piece should have an \'uncovered\' property, initially set as false', () => {
  // });
  // it('each Piece should have a \'markedAsMine\' property, initially set as false', () => {
  // });
  // it('each Piece should have an \'row\' property, initially set as false', () => {
  // });
  // it('each Piece should have an \'col\' property, initially set as false', () => {
  // });
});
