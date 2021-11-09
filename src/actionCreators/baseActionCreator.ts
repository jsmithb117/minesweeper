import { AnyAction } from 'redux';

const baseActionCreator = (type: string, payloadObject: any | null) => {
  const action: AnyAction = { type };
  if (payloadObject !== null) {
    action.payload = payloadObject;
  }
  return action;
};

export default baseActionCreator;