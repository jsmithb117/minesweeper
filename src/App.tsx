import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { IInitialState } from './features/initialState';
import { useEffect } from 'react';
import { incrementTime, newBoardAction, setMinesDisplay, updateOriginalBoard } from './features/actionCreators';
import Form from './components/Form';
import Display from './components/Display';

function App(props: { test: boolean }) {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useAppSelector((state: IInitialState) => state.click.win);
  const loss = useAppSelector((state: IInitialState) => state.click.loss);
  const length = useAppSelector((state: IInitialState) => state.form.length);
  const width = useAppSelector((state: IInitialState) => state.form.width);
  const mines = useAppSelector((state: IInitialState) => state.form.mines);

  const dispatch = useAppDispatch();

  const boardColor = win ? 'green'
    : loss ? 'red'
    : 'white';

  const className = 'app minesweeper'.concat(boardColor);

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
    if (!props.test) {
      dispatch(newBoardAction(length, width, mines));
      dispatch(updateOriginalBoard());
    };
  }, [dispatch, props.test, length, width, mines]);

  return (
    <div className={className}>
      <HelmetProvider>
        <Display />
        <Rows />
        <Form />
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
