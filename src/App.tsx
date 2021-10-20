import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { useEffect } from 'react';
import { newBoardAction, updateOriginalBoard } from './features/clickActionCreators';
import { incrementTime, setMinesDisplay } from './features/formActionCreators';
import Form from './components/Form';
import Display from './components/Display';

import HighScores from './components/HighScores';
import { setStats } from './features/statsActionCreators';

function App(props: { test: boolean }) {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useAppSelector((state) => state?.click?.win);
  const loss = useAppSelector((state) => state?.click?.loss);
  const length = useAppSelector((state: { form: { length: number } }) => state.form.length);
  const width = useAppSelector((state: { form: { width: number } }) => state.form.width);
  const mines = useAppSelector((state: { form: { mines: number } }) => state.form.mines);
  const paused = useAppSelector((state: { form: { paused: boolean } }) => state.form.paused);

  const PORT = 3001;
  const URI = `http://localhost:${PORT}`;
  const dispatch = useAppDispatch();

  const boardColor = win ? 'green'
    : loss ? 'red'
      : paused ? 'blue'
        : 'white';

  const className = 'app minesweeper'.concat(boardColor);

  useEffect(() => {
    dispatch(setMinesDisplay(mines));
  }, [dispatch, mines]);

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

  useEffect(() => {
    async function fetchInitialData(username: string, password: string) {
      const highScoreData = await fetch(URI.concat('/highscores'))
        .then((highScoreResponse) => highScoreResponse.json());
      const userOpts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      };
      let userData = await fetch(URI.concat('/user'), userOpts)
        .then((serverResponse) => {
          return serverResponse.json();
        })
        .catch(err => console.error(err));
      const statsUpdate = {
        bestBeginnerScore: userData.bestBeginnerScore,
        bestIntermediateScore: userData.bestIntermediateScore,
        bestExpertScore: userData.bestExpertScore,
        beginnerScores: highScoreData.beginner,
        intermediateScores: highScoreData.intermediate,
        expertScores: highScoreData.expert,
      }
      dispatch(setStats(statsUpdate))
    };
    fetchInitialData('user1', 'insecurePassword'); //should be a form to enter username/password with changeHandlers for local state and onSubmit for dispatch(action) FIXME
  }, [URI, dispatch]);

  return (
    <div className={className}>
      <HelmetProvider>
        <Display />
        <Rows />
        <HighScores />
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
