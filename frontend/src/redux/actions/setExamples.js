import * as actionTypes from '../actionTypes/actionTypes';

export const setExamples = (examples) => {
  return {
    type: actionTypes.SET_EXAMPLES,
    payload: examples,
  };
};
