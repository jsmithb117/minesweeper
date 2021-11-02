import { useSelector } from 'react-redux';
import BestIndividualScore from './BestIndividualScore';
import { IScore } from '../interfaces/interfaces';
import BestGlobal from './BestGlobal';

const HighScores = () => {
  const bestBeginnerScore: IScore = useSelector((state: any) => state.stats.bestBeginnerScore);
  const bestIntermediateScore = useSelector((state: any) => state.stats.bestIntermediateScore);
  const bestExpertScore = useSelector((state: any) => state.stats.bestExpertScore);
  const beginnerScores: IScore[] = useSelector((state: any) => state.stats.beginnerScores);
  const intermediateScores = useSelector((state: any) => state.stats.intermediateScores);
  const expertScores = useSelector((state: any) => state.stats.expertScores);
  const beginner = 'beginner';
  const intermediate = 'intermediate';
  const expert = 'expert';

  return(
    <div className="best-scores">
      High Scores:
      <BestIndividualScore type={beginner} score={bestBeginnerScore} />
      <BestIndividualScore type={intermediate} score={bestIntermediateScore} />
      <BestIndividualScore type={expert} score={bestExpertScore} />
      <BestGlobal type={beginner} scores={beginnerScores} />
      <BestGlobal type={intermediate} scores={intermediateScores} />
      <BestGlobal type={expert} scores={expertScores} />
    </div>
  )
};

export default HighScores;
