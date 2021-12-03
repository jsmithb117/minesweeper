import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from './features/hooks';
import { useEffect, useState } from 'react';
import { newBoardAction,
  updateOriginalBoard,
  setMinesDisplay,
  setStats } from './actionCreators';
import { Form, Display, HighScores } from './components';
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
  const difficulty = useAppSelector((state: any) => state.form.difficulty);
  const seconds = useAppSelector((state: any) => state.form.time)
  const [cheat, setCheat] = useState(false);

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
    if (!props.test) {
      dispatch(newBoardAction(length, width, mines));
      dispatch(updateOriginalBoard());
    };
  }, [dispatch, props.test, length, width, mines]);

  useEffect(() => {
    (async function (username = 'user1') {
      const highScoreData = await fetch(URI.concat('/highscores'))
        .then((highScoreResponse) => highScoreResponse.json())
        .catch((err) => console.error(err));
      const userOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, difficulty, seconds, date: new Date() }),
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
  }, [difficulty, dispatch, seconds]);

  const cheater = () => {
    setCheat(!cheat)
  }
  return (
    <div className={className}>
      <HelmetProvider>
        <button className="cheatbutton" onClick={cheater}>
          Cheat Button
        </button>
        <Display />
        <Rows cheat={cheat} />
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
