import { IBestProps } from "../interfaces/interfaces";

const BestIndividualScore = ({ type, score }: IBestProps) => {
  return (
    <div className={`individual-${type}`}>
    Personal best {type} score: {score.seconds}
  </div>
    )
};

export default BestIndividualScore;