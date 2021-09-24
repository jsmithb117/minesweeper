import { Piece } from './boardCreator';
export const LEFTCLICK: string = 'LEFTCLICK';
export const RIGHTCLICK: string = 'RIGHTCLICK';

const click = (piece: Piece, isLeftClick: boolean) => {
  const val: boolean = piece.hasOwnProperty('val');
  const uncovered: boolean = piece.hasOwnProperty('uncovered');
  const markedAsMine: boolean = piece.hasOwnProperty('markedAsMine');
  const row: boolean = piece.hasOwnProperty('row');
  const col: boolean = piece.hasOwnProperty('col');

  if (!val || !uncovered || !markedAsMine || !row || !col) {
    return new Error('leftClick action creator called with improper props');
  }
  if (isLeftClick) {
    return {
      type: LEFTCLICK,
      payload: { piece },
    };
  }
  return {
    type: RIGHTCLICK,
    payload: { piece },
  };
}
export const leftClick = (piece: Piece) => click(piece, true);

export const rightClick = (piece: Piece) => click(piece, false);

