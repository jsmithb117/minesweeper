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
    const graphOpts: any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
          query: '\n' +
          '{\n' +
          'highscores {\n' +
          '  beginner {\n' +
          '    username\n' +
          '    seconds\n' +
          '    date\n' +
          '  }\n' +
          '  intermediate {\n' +
          '    username\n' +
          '    seconds\n' +
          '    date\n' +
          '  }\n' +
          '  expert {\n' +
          '    username\n' +
          '    seconds\n' +
          '    date\n' +
          '  }\n' +
        '}}\n',

      }),
    }
    const response = await fetch(URI.concat('/graphql'), graphOpts);
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
          '{\n' +
          'users(username: "user1") {\n' +
          'best_beginner_score{\n' +
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
            'total_games_completed\n' +
          '}}\n',
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

  const bestBeginnerScore = userData?.data?.data?.users?.best_beginner_score;
  const bestIntermediateScore = userData?.data?.data?.users?.best_intermediate_score;
  const bestExpertScore = userData?.data?.data?.users?.best_expert_score;
  const beginnerHighScores = highScores?.data?.data?.highscores?.beginner;
  const intermediateHighScores = highScores?.data?.data?.highscores?.intermediate;
  const expertHighScores = highScores?.data?.data?.highscores?.expert;

  return (
    <div className="best-scores">
      High Scores:
      <BestIndividualScore type={beginner} score={bestBeginnerScore || defaultScore} />
      <BestIndividualScore type={intermediate} score={bestIntermediateScore || defaultScore} />
      <BestIndividualScore type={expert} score={bestExpertScore || defaultScore} />
      <BestGlobal type={beginner} scores={beginnerHighScores || []} />
      <BestGlobal type={intermediate} scores={intermediateHighScores || []} />
      <BestGlobal type={expert} scores={expertHighScores || []} />
    </div>
  )
};

export default HighScores;
