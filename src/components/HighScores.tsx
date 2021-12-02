import { useSelector } from 'react-redux';
import { BestIndividualScore } from './index';
import { IScore } from '../interfaces/interfaces';
import { BestGlobal } from './index';

const HighScores = () => {
  const bestBeginnerScore: IScore = useSelector((state: any) => state.stats.bestBeginnerScore[0]);
  const bestIntermediateScore = useSelector((state: any) => state.stats.bestIntermediateScore[0]);
  const bestExpertScore = useSelector((state: any) => state.stats.bestExpertScore[0]);
  const beginnerScores: IScore[] = useSelector((state: any) => state.stats.beginnerScores);
  const intermediateScores = useSelector((state: any) => state.stats.intermediateScores);
  const expertScores = useSelector((state: any) => state.stats.expertScores);
  const beginner = 'beginner';
  const intermediate = 'intermediate';
  const expert = 'expert';
  const placeholder = (type: string) => ({type, seconds: 100000});

  return(
    <div className="best-scores">
      High Scores:
      <BestIndividualScore type={beginner} score={bestBeginnerScore || placeholder('beginner')} />
      <BestIndividualScore type={intermediate} score={bestIntermediateScore || placeholder('intermediate')} />
      <BestIndividualScore type={expert} score={bestExpertScore || placeholder('expert')} />
      <BestGlobal type={beginner} scores={beginnerScores} />
      <BestGlobal type={intermediate} scores={intermediateScores} />
      <BestGlobal type={expert} scores={expertScores} />
    </div>
  )
};

export default HighScores;