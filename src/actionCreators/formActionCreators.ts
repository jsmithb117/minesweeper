import { baseActionCreator } from './index';

export const RESETTIME: string = 'RESETTIME';
export const SETLENGTH: string = 'SETLENGTH';
export const SETWIDTH: string = 'SETWIDTH';
export const SETMINES: string = 'SETMINES';
export const INCREMENTTIME: string = 'INCREMENTTIME';
export const INCREMENTMINESDISPLAY: string = 'INCREMENTMINESDISPLAY';
export const DECREMENTMINESDISPLAY: string = 'DECREMENTMINESDISPLAY';
export const SETMINESDISPLAY: string =  'SETMINESDISPLAY';
export const PAUSE = 'PAUSE';
export const DIFFICULTY = 'DIFFICULTY';
export const SETTIME = 'SETTIME';

export const setDifficulty = (difficulty: string) => baseActionCreator(DIFFICULTY, { difficulty });
export const resetTime = () => baseActionCreator(RESETTIME, null);
export const setLength = (length: number) => baseActionCreator(SETLENGTH, { length });
export const setWidth = (width: number) => baseActionCreator(SETWIDTH, { width });
export const setMines = (mines: number) => baseActionCreator(SETMINES, { mines });
export const incrementTime = () => baseActionCreator(INCREMENTTIME, null);
export const incrementMinesDisplay = () => baseActionCreator(INCREMENTMINESDISPLAY, null);
export const decrementMinesDisplay = () => baseActionCreator(DECREMENTMINESDISPLAY, null);
export const setMinesDisplay = (minesDisplay: number = 0) => baseActionCreator(SETMINESDISPLAY, { minesDisplay });
export const pause = () => baseActionCreator(PAUSE, null);
export const setTime = (seconds: number) => baseActionCreator(SETTIME, { seconds });
