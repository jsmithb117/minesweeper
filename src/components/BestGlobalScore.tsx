import { IBestGlobalScoreProps } from "../interfaces/interfaces";

const BestGlobalScore = ({ type, score, rank }: IBestGlobalScoreProps) => (
  <div className={`best-global-${type}`}>
    {`#${rank}: ${score.username} scored ${score.seconds}`}
  </div>
);

export default BestGlobalScore;
