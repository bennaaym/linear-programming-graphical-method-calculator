import * as actionTypes from '../actionTypes/actionTypes';

export const setParams = (objective, objectiveFunction, constraints) => {
  return {
    type: actionTypes.SET_PARAMETERES,
    payload: { objective, objectiveFunction, constraints },
  };
};
