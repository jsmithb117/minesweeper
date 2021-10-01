import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from './features/hooks';
import { useDispatch } from 'react-redux';
import { IInitialState } from './features/initialState';
import { useEffect } from 'react';
import { incrementTime, newBoardAction, setMinesDisplay,  } from './features/actionCreators';
import Form from './components/Form';

function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useAppSelector((state: IInitialState) => state.click.win);
  const loss = useAppSelector((state: IInitialState) => state.click.loss);
  const length = useAppSelector((state: IInitialState) => state.form.length);
  const width = useAppSelector((state: IInitialState) => state.form.width);
  const mines = useAppSelector((state: IInitialState) => state.form.mines);
  const dispatch = useDispatch();

  const boardColor = win ? 'green'
    : loss ? 'red'
    : 'white';

  const className = 'minesweeper'.concat(boardColor);

  useEffect(() => {
    dispatch(setMinesDisplay(mines));
  }, [dispatch, mines]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(incrementTime());
    }, 1000);
    return () => clearInterval(timeInterval);
  });

  useEffect(() => {
    console.log('dispatching a new board, mines: ', mines);
    dispatch(newBoardAction(length, width, mines))
  }, [dispatch, length, width, mines])

  return (
    <div className={className}>
      <HelmetProvider>
        <Form />
        <Rows />
        <Helmet>
          <style type='text/css'>
          {`
            body {
              background-color : ${boardColor}
            }
          `}
          </style>
        </Helmet>
      </HelmetProvider>
    </div>
  );
}

export default App;
