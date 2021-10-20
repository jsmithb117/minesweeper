import { IBestGlobalProps, IScore } from "../interfaces/interfaces";
import BestGlobalScore from "./BestGlobalScore";

const BestGlobal = ({ type, scores }: IBestGlobalProps) => {
  const displayType = type.charAt(0).toUpperCase().concat(type.slice(1));
  const scoresMap = scores.map((elem: IScore, index: number) => (
    <BestGlobalScore type={type} score={elem} rank={index + 1} key={type.concat(index.toString())} />
  ));
  return (
    <div className="best-global">
      Best Global {displayType} scores:
      {scoresMap}
    </div>
  )
};

export default BestGlobal;
