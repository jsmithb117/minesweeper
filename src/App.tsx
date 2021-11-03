import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { useEffect } from 'react';
import { newBoardAction, updateOriginalBoard } from './actionCreators/clickActionCreators';
import { incrementTime, setMinesDisplay } from './actionCreators/formActionCreators';
import Form from './components/Form';
import Display from './components/Display';
import { QueryClient, QueryClientProvider } from 'react-query';
import HighScores from './components/HighScores';
import { setStats } from './actionCreators/statsActionCreators';
import { IStatsObject } from './interfaces/interfaces';

const queryClient = new QueryClient();
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

  useEffect(() => {
    if (win) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, difficulty, seconds, date: new Date() }),
      };

      /* istanbul ignore next */
      fetch(URI.concat('/completed'), options)
        .then((dbResponse) => dbResponse.json())
        .then((json) => {
          const statsObject: IStatsObject = {
            bestBeginnerScore: json.best_beginner_score,
            bestIntermediateScore: json.best_intermediate_score,
            bestExpertScore: json.best_expert_score,
            beginnerScores: json.beginner_scores,
            intermediateScores: json.intermediate_scores,
            expertScores: json.expert_scores,
            totalGamesCompleted: json.total_games_completed,
            username,
          }
          dispatch(setStats(statsObject));
        })
        .catch((err) => console.error(err));
    }
  }, [dispatch, difficulty, seconds, username, win]);

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
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div>
  );
}

export default App;
