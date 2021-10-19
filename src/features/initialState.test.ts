import initialStateCreator from './initialState';
const test = true;
const initialTestState = initialStateCreator(10, 10, 10, test);
const initialProductionState = initialStateCreator();

describe('initialStateCreator', () => {
  it('should have a win property', () => {
    expect(initialTestState.click).toHaveProperty('win')
  });
  it('should have a loss property', () => {
    expect(initialTestState.click).toHaveProperty('loss')
  });
  it('should have a board property in the proper shape for a test board', () => {
    expect(initialTestState.click).toHaveProperty('board');
    expect(Array.isArray(initialTestState.click.board)).toBe(true);
    expect(initialTestState.click.board.length).toBe(10);
    initialTestState.click.board.forEach((row: any, rowIndex: number) => {
      expect(Array.isArray(row)).toBe(true);
      expect(row.length).toBe(10);
      row.forEach((piece: any, colIndex: number) => {
        let shouldBeUncovered = false;
        let shouldBeMarkedAsMine = false;
        if (rowIndex === 2) {
          shouldBeUncovered = true;
        }
        if ((rowIndex === 0 && colIndex !== 5) || (rowIndex === 5 && colIndex === 5)) {
          shouldBeMarkedAsMine = true;
        }
        expect(piece).toHaveProperty('val');
        expect(piece.val).toBeNumber();
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
  it('should have a board property in the proper shape for a \'real\' board', () => {

    expect(initialProductionState.click).toHaveProperty('board');
    expect(Array.isArray(initialProductionState.click.board)).toBe(true);
    expect(initialProductionState.click.board.length).toBe(10);
    initialProductionState.click.board.forEach((row: any) => {
      expect(Array.isArray(row)).toBe(true);
      expect(row.length).toBe(10);
      row.forEach((piece: any) => {
        expect(piece).toHaveProperty('val');
        expect(piece.val).toBeNumber();
        expect(piece).toHaveProperty('uncovered');
        expect(piece.uncovered).toBe(false);
        expect(piece).toHaveProperty('markedAsMine');
        expect(piece.markedAsMine).toBe(false);
        expect(piece).toHaveProperty('row');
        expect(piece.row).toBeNumber();
        expect(piece).toHaveProperty('col');
        expect(piece.col).toBeNumber();
      });
    });
  });
});
