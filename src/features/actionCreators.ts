import { PieceType } from './boardCreator';
export const LEFTCLICK: string = 'LEFTCLICK';
export const RIGHTCLICK: string = 'RIGHTCLICK';

export interface Payload {
  piece: PieceType
};

export interface Action {
  type: string,
  payload: Payload;
};

const click = (piece: PieceType, isLeftClick: boolean) => {
  const val: boolean = piece.hasOwnProperty('val');
  const uncovered: boolean = piece.hasOwnProperty('uncovered');
  const markedAsMine: boolean = piece.hasOwnProperty('markedAsMine');
  const row: boolean = piece.hasOwnProperty('row');
  const col: boolean = piece.hasOwnProperty('col');

  if (!val || !uncovered || !markedAsMine || !row || !col) {
    return new Error('leftClick action creator called with improper props');
  }
  if (isLeftClick) {
    const action: Action = {
      type: LEFTCLICK,
      payload: { piece },
    };
    return action;
  }
  const action: Action = {
    type: RIGHTCLICK,
    payload: { piece },
  };
  return action;
}
export const leftClick = (piece: PieceType) => click(piece, true);

export const rightClick = (piece: PieceType) => click(piece, false);

