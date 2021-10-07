import { useDispatch } from 'react-redux';
import { useAppSelector } from '../features/hooks';
import { IInitialState } from '../features/initialState';
import { revertBoard, resetWinLoss } from '../features/actionCreators';

const Display = () => {
  const minesDisplay = useAppSelector((state: IInitialState) => state.form.minesDisplay);
  const time = useAppSelector((state: IInitialState) => state.form.time);
  const dispatch = useDispatch();

  const resetButtonHandler = () => {
    dispatch(revertBoard());
    dispatch(resetWinLoss());
  };

  return (
    <div className="appchild display">
      <span className="minesremaining">
        {minesDisplay}
      </span>
      <button className="reset" onClick={resetButtonHandler}>
        Reset Board
      </button>
      <div className="time">
        {time}
      </div>
    </div>
  );
};

export default Display;
