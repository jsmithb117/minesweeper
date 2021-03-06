import { useDispatch, useSelector } from 'react-redux';
import { revertBoard, resetWinLoss, testBoard } from '../actionCreators/clickActionCreators';
import { setMinesDisplay, pause } from '../actionCreators/formActionCreators';
import { DisplayState } from '../interfaces/interfaces';

const Display = () => {
  const minesDisplay = useSelector((state: DisplayState) => state.form.minesDisplay);
  const mines = useSelector((state: DisplayState) => state.form.mines);
  const time = useSelector((state: DisplayState) => state.form.time);
  const dispatch = useDispatch();

  const resetButtonHandler = () => {
    dispatch(revertBoard());
    dispatch(resetWinLoss());
    dispatch(setMinesDisplay(mines));
  };

  const testBoardHandler = () => {
    dispatch(testBoard());
  };
  const pauseHandler = () => {
    dispatch(pause());
  };

  return (
    <div className="appchild display">
      <span className="minesremaining">
      <svg className="flag" width="24" height="24" viewBox="0 0 24 24"><path d="M21 8l-16-6v-2h-2v24h2v-10l16-6zm-5.696 0l-10.304 3.864v-7.728l10.304 3.864z"/></svg>
      {minesDisplay}
      </span>
      <div className="center">

      <button id="reset" onClick={resetButtonHandler}>
        Reset Board
      </button>
      </div>
      <span className="time">
      <svg height="24" width="24" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>
        {time}
      </span>
      <button id="testBoard" onClick={testBoardHandler}>
        Test Board
      </button>
      <button id="pause" onClick={pauseHandler}>
        Pause
      </button>
    </div>
  );
};

export default Display;
