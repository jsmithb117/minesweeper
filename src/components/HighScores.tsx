import { useSelector } from 'react-redux';
import BestIndividualScore from './BestIndividualScore';
import BestGlobal from './BestGlobal';
import { useQuery } from 'react-query';
import { URI } from '../App';
import { IInitialState } from '../interfaces/interfaces';

const HighScores = () => {
  const beginner = 'beginner';
  const intermediate = 'intermediate';
  const expert = 'expert';
  const username = useSelector((state: IInitialState) => state.stats.username);
  const password = 'insecurePassword';
  const defaultScore = { seconds: Number.NEGATIVE_INFINITY };

  const highScores = useQuery(['highscores', { username, password }], async () => {
    const response = await fetch(URI.concat('/highscores'));
    /* istanbul ignore next */
    if (!response.ok) {
      throw new Error('Error fetching high scores');
    }
    return response.json();
  });

  const userData = useQuery(['user', { username }], async () => {
    const userOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(URI.concat('/user'), userOpts);
    /* istanbul ignore next */
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    return response.json();
  });


  return (
    <div className="best-scores">
      High Scores:
      <BestIndividualScore type={beginner} score={userData?.data?.bestBeginnerScore || defaultScore} />
      <BestIndividualScore type={intermediate} score={userData?.data?.bestIntermediateScore || defaultScore} />
      <BestIndividualScore type={expert} score={userData?.data?.bestExpertScore || defaultScore} />
      <BestGlobal type={beginner} scores={highScores?.data?.beginner || []} />
      <BestGlobal type={intermediate} scores={highScores?.data?.intermediate || []} />
      <BestGlobal type={expert} scores={highScores?.data?.expert || []} />
    </div>
  )
};

export default HighScores;
