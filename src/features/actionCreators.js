export const LEFTCLICK = 'LEFTCLICK';
export const RIGHTCLICK = 'RIGHTCLICK';

export const leftClick = (piece) => {
  return {
    type: LEFTCLICK,
    payload: { piece },
  };
};

export const rightClick = (piece) => {
  return {
    type: RIGHTCLICK,
    payload: { piece },
  };
};
