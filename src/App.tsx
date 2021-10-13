import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { useEffect } from 'react';
import { incrementTime, newBoardAction, setMinesDisplay, updateOriginalBoard } from './features/actionCreators';
import Form from './components/Form';
import Display from './components/Display';

function App(props: { test: boolean }) {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useAppSelector((state) => state?.click?.win);
  const loss = useAppSelector((state) => state?.click?.loss);
  const length = useAppSelector((state) => state.form?.length);
  const width = useAppSelector((state) => state.form?.width);
  const mines = useAppSelector((state) => state.form?.mines);

  const dispatch = useAppDispatch();

  const boardColor = win ? 'green'
    : loss ? 'red'
    : 'white';

  const className = 'app minesweeper'.concat(boardColor);

  useEffect(() => {
    dispatch(setMinesDisplay(mines));
  }, [dispatch, mines]);

  useEffect(() => {
    if (!loss && !win) {
      const timeInterval = setInterval(() => {
        dispatch(incrementTime());
      }, 1000);
      return () => clearInterval(timeInterval);
    }
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
