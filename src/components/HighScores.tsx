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
    const graphOpts: any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: '\n' +
          '  mutation {\n' +
          '    completed(username:"user1", seconds: 14, date: "1636142219373", difficulty: "Expert") {\n' +
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
    /* istanbul ignore next */
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    return response.json();
  });

  const bestBeginnerScore = userData?.data?.data?.completed?.best_beginner_score;
  const bestIntermediateScore = userData?.data?.data?.completed?.best_intermediate_score;
  const bestExpertScore = userData?.data?.data?.completed?.best_expert_score;

  return (
    <div className="best-scores">
      High Scores:
      <BestIndividualScore type={beginner} score={bestBeginnerScore || defaultScore} />
      <BestIndividualScore type={intermediate} score={bestIntermediateScore || defaultScore} />
      <BestIndividualScore type={expert} score={bestExpertScore || defaultScore} />
      <BestGlobal type={beginner} scores={highScores?.data?.beginner || []} />
      <BestGlobal type={intermediate} scores={highScores?.data?.intermediate || []} />
      <BestGlobal type={expert} scores={highScores?.data?.expert || []} />
    </div>
  )
};

export default HighScores;
