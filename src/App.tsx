import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { useEffect, useState } from 'react';
import { newBoardAction, updateOriginalBoard } from './actionCreators/clickActionCreators';
import { incrementTime, setMinesDisplay } from './actionCreators/formActionCreators';
import Form from './components/Form';
import Display from './components/Display';
import { useMutation } from 'react-query';
import HighScores from './components/HighScores';
import queryClient from './features/queryClient';
import { setStats } from './actionCreators/statsActionCreators';
import { IScore } from './interfaces/interfaces';

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


console.log('App rendering')

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

      fetch(URI.concat('/completed'), options)
        .then((dbResponse) => dbResponse.json())
        .then((json) => {
          const statsObject = {
            bestBeginnerScore: json.best_beginner_score,
            bestIntermediateScore: json.best_intermediate_score,
            bestExpertScore: json.best_expert_score,
            beginnerScores: json.beginner_scores,
            intermediateScores: json.intermediate_scores,
            expertScores: json.expert_scores,
            totalGamesCompleted: json.total_games_completed,
            username,
          }
          console.log('setting statsObject')
          console.log(statsObject);
          dispatch(setStats(statsObject));
        })
        .catch((err) => console.error(err));
    }
  }, [dispatch, URI, difficulty, seconds, username, win]);

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
    (async function (username = 'user1', password = 'insecurePassword') {
      const highScoreData = await fetch(URI.concat('/highscores'))
        .then((highScoreResponse) => highScoreResponse.json())
        .catch((err) => console.error(err));
      const userOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      };
      let userData = await fetch(URI.concat('/user'), userOpts)
        .then((serverResponse) => serverResponse.json())
        .catch(err => console.error(err));
      const statsUpdate = {
        bestBeginnerScore: userData.bestBeginnerScore,
        bestIntermediateScore: userData.bestIntermediateScore,
        bestExpertScore: userData.bestExpertScore,
        beginnerScores: highScoreData.beginner.sort((a: IScore, b: IScore) => a.seconds - b.seconds),
        intermediateScores: highScoreData.intermediate.sort((a: IScore, b: IScore) => a.seconds - b.seconds),
        expertScores: highScoreData.expert.sort((a: IScore, b: IScore) => a.seconds - b.seconds),
        totalGamesCompleted: userData.totalGamesCompleted,
      }
      dispatch(setStats(statsUpdate))
    })();
    //should be a form to enter username/password with changeHandlers for local state and onSubmit for dispatch(action) FIXME
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
