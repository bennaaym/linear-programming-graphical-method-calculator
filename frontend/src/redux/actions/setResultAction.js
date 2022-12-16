import * as actionTypes from '../actionTypes/actionTypes';

export const setResult = (result) => {
  return {
    type: actionTypes.SET_RESULT,
    payload: result,
  };
};
