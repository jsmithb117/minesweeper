export const LEFTCLICK = 'LEFTCLICK';
export const RIGHTCLICK = 'RIGHTCLICK';

export const leftClick = (piece) => {
  const val = piece.hasOwnProperty('val');
  const uncovered = piece.hasOwnProperty('uncovered');
  const markedAsMine = piece.hasOwnProperty('markedAsMine');
  const row = piece.hasOwnProperty('row');
  const col = piece.hasOwnProperty('col');

  if (!val || !uncovered || !markedAsMine || !row || !col) {
    const error = new Error('leftClick action creator called with improper props')
    console.error(error);
    return error;
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
    const error = new Error('rightClick action creator called with improper props')
    console.error(error);
    return error;
  }
  return {
    type: RIGHTCLICK,
    payload: { piece },
  };
};
