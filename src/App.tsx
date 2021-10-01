import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { IInitialState } from './features/initialState';
import { useEffect } from 'react';
import { setMinesDisplay } from './features/actionCreators';
import Form from './components/Form';

function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useAppSelector((state: IInitialState) => state.click.win);
  const loss = useAppSelector((state: IInitialState) => state.click.loss);
  const mines = useAppSelector((state: IInitialState) => state.form.mines);
  const dispatch = useAppDispatch();

  const boardColor = win ? 'green'
    : loss ? 'red'
    : 'white';

  const className = 'minesweeper'.concat(boardColor);

  useEffect(() => {
    dispatch(setMinesDisplay(mines));
  }, [dispatch, mines])
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