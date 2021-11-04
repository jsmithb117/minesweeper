import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { useEffect } from 'react';
import { newBoardAction, updateOriginalBoard } from './actionCreators/clickActionCreators';
import { incrementTime, setMinesDisplay } from './actionCreators/formActionCreators';
import Form from './components/Form';
import Display from './components/Display';
import { useMutation } from 'react-query';
import HighScores from './components/HighScores';
import queryClient from './features/queryClient';

const PORT = 3001;
export const URI = `http://localhost:${PORT}`;

function App(props: { test: boolean }) {
  /* istanbul ignore next */
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useAppSelector((state) => state?.click?.win);
  const loss = useAppSelector((state) => state?.click?.loss);
  const length = useAppSelector((state: { form: { length: number } }) => state.form.length);
  const width = useAppSelector((state: { form: { width: number } }) => state.form.width);
  const mines = useAppSelector((state: { form: { mines: number } }) => state.form.mines);
  const paused = useAppSelector((state: { form: { paused: boolean } }) => state.form.paused);
  const username = useAppSelector((state: any) => state.stats.username);
  const difficulty = useAppSelector((state: any) => state.form.difficulty);
  const seconds = useAppSelector((state: any) => state.form.time)

  const dispatch = useAppDispatch();

  const boardColor = win ? 'green'
    : loss ? 'red'
    : paused ? 'blue'
    : 'white';
  const className = 'app minesweeper'.concat(boardColor);
  const date = new Date();
  const fetchOpts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, difficulty, seconds, date }),
  };
  const mutateOpts = {
    enabled: win,
    onSuccess: () => (queryClient.invalidateQueries())
  };
  const fetcher = () => (fetch(URI.concat('/completed'), fetchOpts));
  const mutation = useMutation(fetcher, mutateOpts)

  useEffect(() => {
    mutation.mutate();
  }, [win]);

  useEffect(() => {
    dispatch(setMinesDisplay(mines));
  }, [dispatch, mines]);

  /* istanbul ignore next */
  useEffect(() => {
    if (!loss && !win && !paused) {
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
        <HighScores />
        <Form />
        <div className="mutation">
          {'mutation: '.concat(JSON.stringify(mutation))}
        </div>
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
