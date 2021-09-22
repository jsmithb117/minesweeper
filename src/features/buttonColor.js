const buttonColorFunc = (val) => (
  val === 0 ? null :
  val === 1 ? 'blue' :
  val === 2 ? 'green' :
  val === 3 ? 'red' :
  val === 4 ? 'purple' :
  val === 5 ? 'maroon' :
  val === 6 ? 'turquoise' :
  val === 7 ? 'black' :
  val === 8 ? 'gray' :
  null
);

export default buttonColorFunc;
