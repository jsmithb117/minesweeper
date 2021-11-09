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

  const [mutated, setMutated] = useState(false);

  const dispatch = useAppDispatch();
  const boardColor = win ? 'green'
    : loss ? 'red'
    : paused ? 'blue'
    : 'white';
  const className = 'app minesweeper'.concat(boardColor);
  const date = new Date();

  const mutateOpts = {
    enabled: win,
    onSuccess: () => (queryClient.invalidateQueries())
  };
  const mutation = useMutation(async () => {
    const graphOpts: any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: '\n' +
          '  mutation {\n' +
          `    completed(username: "${username}", seconds: ${seconds}, date: "${date}", difficulty: "${difficulty}") {\n` +
          '      best_beginner_score{\n' +
          '        username\n' +
          '        seconds\n' +
          '        date\n' +
          '      }\n' +
          '      best_intermediate_score{\n' +
          '        username\n' +
          '        seconds\n' +
          '        date\n' +
          '      }\n' +
          '      best_expert_score{\n' +
          '        username\n' +
          '        seconds\n' +
          '        date\n' +
          '      }\n' +
          '      beginner_scores{\n' +
          '        username\n' +
          '        seconds\n' +
          '        date\n' +
          '      }\n' +
          '      intermediate_scores{\n' +
          '        username\n' +
          '        seconds\n' +
          '        date\n' +
          '      }\n' +
          '      expert_scores{\n' +
          '        username\n' +
          '        seconds\n' +
          '        date\n' +
          '      }\n' +
          '      total_games_completed\n' +
          '    }\n' +
          '  }  \n' +
          '\n' +
          '\n' +
          '\n',
        variables: null
      }),
    }

    const response = await fetch(URI.concat('/graphql'), graphOpts);
    const responseJSON = response.json();
    if (!response.ok) {
      throw new Error('Error posting a new score')
    }
    return responseJSON;
  }, mutateOpts);

  useEffect(() => {
    if (win && !mutated) {
      setMutated(false);
      mutation.mutate();
    }
  }, [win, mutated, mutation]);

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
