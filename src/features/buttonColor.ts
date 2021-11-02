import { IPiece } from "../interfaces/interfaces";

const buttonColorFunc = (piece: IPiece) => (
  piece.val === 0 ? 'lightgray' :
  piece.val === 1 ? 'blue' :
  piece.val === 2 ? 'green' :
  piece.val === 3 ? 'red' :
  piece.val === 4 ? 'purple' :
  piece.val === 5 ? 'maroon' :
  piece.val === 6 ? 'turquoise' :
  piece.val === 7 ? 'black' :
  piece.val === 8 ? 'gray' :
  null
);

export default buttonColorFunc;
