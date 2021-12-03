import { useEffect, useState } from "react";
import { setTime } from "../actionCreators";
import { useAppDispatch, useAppSelector } from "../features";
import { URI } from "../App";
import { setStats } from '../actionCreators';

const Time = () => {
  const [secondsState, setSeconds] = useState(0);
  const win = useAppSelector((state) => state?.click?.win);
  const loss = useAppSelector((state) => state?.click?.loss);
  const paused = useAppSelector((state: { form: { paused: boolean } }) => state.form.paused);
  const difficulty = useAppSelector((state: any) => state.form.difficulty);
  const username = useAppSelector((state: any) => state.stats.username);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loss && !win && !paused) {
      const timeInterval = setInterval(() => {
        setSeconds(secondsState + 1);
      }, 1000);
      return () => clearInterval(timeInterval);
    }
  });

  useEffect(() => {
    dispatch(setTime(secondsState));
    if(win) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, difficulty, seconds: secondsState, date: new Date() }),
      };

      fetch(URI.concat('/completed'), options)
        .then((dbResponse) => dbResponse.json())
        .then((json) => {
          const statsObject = {
            bestBeginnerScore: json.bestBeginnerScore,
            bestIntermediateScore: json.bestIntermediateScore,
            bestExpertScore: json.bestExpertScore,
            beginnerScores: json.beginnerScores,
            intermediateScores: json.intermediateScores,
            expertScores: json.expertScores,
            totalGamesCompleted: json.totalGamesCompleted,
            username,
          }
          dispatch(setStats(statsObject));
        })
        .catch((err) => console.error(err));
    }
  }, [win, loss, paused, difficulty, dispatch, secondsState, username]);

  return (
    <>
      {secondsState}
    </>
    );
};

export default Time;