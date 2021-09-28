import { IPiece } from './boardCreator';
export const LEFTCLICK: string = 'LEFTCLICK';
export const RIGHTCLICK: string = 'RIGHTCLICK';

export interface Payload {
  piece: IPiece
};

export interface IAction {
  type: string,
  payload: Payload;
};

const click = (piece: IPiece, isLeftClick: boolean) => {
  const val: boolean = piece.hasOwnProperty('val');
  const uncovered: boolean = piece.hasOwnProperty('uncovered');
  const markedAsMine: boolean = piece.hasOwnProperty('markedAsMine');
  const row: boolean = piece.hasOwnProperty('row');
  const col: boolean = piece.hasOwnProperty('col');
  const requisites = val && uncovered && markedAsMine && row && col;
  let action: IAction = {
    type: '',
    payload: { piece },
  };
  if (requisites && isLeftClick) {
    action.type = LEFTCLICK;
    return action;
  };
  action.type = RIGHTCLICK;
  return action;
}
export const leftClick = (piece: IPiece) => click(piece, true);

export const rightClick = (piece: IPiece) => click(piece, false);

