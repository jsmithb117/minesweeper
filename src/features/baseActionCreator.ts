import { IAction } from '../interfaces/interfaces';

const baseActionCreator = (type: string, payloadObject: any | null) => {
  const nullPiece = {
    val: null,
    isMine: null,
    uncovered: null,
    markedAsMine: null,
    loser: null,
    row: null,
    col: null,
  }
  const action: IAction = {
    type,
    payload: {
      val: payloadObject?.val || null,
      isMine: payloadObject?.isMine || null,
      uncovered: payloadObject?.uncovered || null,
      markedAsMine: payloadObject?.markedAsMine || null,
      loser: payloadObject?.loser || null,
      row: payloadObject?.row || null,
      col: payloadObject?.col || null,
      piece: payloadObject?.piece || nullPiece,
      length: payloadObject?.length || null,
      width: payloadObject?.width || null,
      mines: payloadObject?.mines || null,
      minesDisplay: payloadObject?.minesDisplay || null,
      bestBeginnerScore: payloadObject?.bestBeginnerScore || null,
      bestIntermediateScore: payloadObject?.bestIntermediateScore || null,
      bestExpertScore: payloadObject?.bestExpertScore || null,
      beginnerScores: payloadObject?.beginnerScores || null,
      intermediateScores: payloadObject?.intermediateScores || null,
      expertScores: payloadObject?.expertScores || null,
      totalGamesCompleted: payloadObject?.totalGamesCompleted || null,
      username: payloadObject?.username || null,
      difficulty: payloadObject?.difficulty || null,
    },
  };
  return action;
};

export default baseActionCreator;