export const LEFTCLICK = 'LEFTCLICK';
export const RIGHTCLICK = 'RIGHTCLICK';

export const leftClick = (piece) => {
  const val = piece.hasOwnProperty('val');
  const uncovered = piece.hasOwnProperty('uncovered');
  const markedAsMine = piece.hasOwnProperty('markedAsMine');
  const row = piece.hasOwnProperty('row');
  const col = piece.hasOwnProperty('col');

  if (!val || !uncovered || !markedAsMine || !row || !col) {
    return new Error('leftClick action creator called with improper props')
  }
  return {
    type: LEFTCLICK,
    payload: { piece },
  };
};

export const rightClick = (piece) => {
  const val = piece.hasOwnProperty('val');
  const uncovered = piece.hasOwnProperty('uncovered');
  const markedAsMine = piece.hasOwnProperty('markedAsMine');
  const row = piece.hasOwnProperty('row');
  const col = piece.hasOwnProperty('col');

  if (!val || !uncovered || !markedAsMine || !row || !col) {
    return new Error('rightClick action creator called with improper props');
  }
  return {
    type: RIGHTCLICK,
    payload: { piece },
  };
};
