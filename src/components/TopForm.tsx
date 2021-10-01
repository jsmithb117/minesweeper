import { useAppSelector } from '../features/hooks';
import { IInitialState } from '../features/initialState';

const TopForm = () => {
  const minesDisplay = useAppSelector((state: IInitialState) => state.form.minesDisplay);

  return (
    <div className="topform">
      <div className="minesremaining">
        {minesDisplay}
      </div>
    </div>
  );
};

export default TopForm;
