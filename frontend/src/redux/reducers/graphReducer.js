import { SET_PARAMETERES, SET_RESULT } from "../actionTypes/actionTypes";

const initialState = {
  objective: 'Maximize',
  objectiveFunction: {
    a: 0,
    b: 0,
  },
  constraints: [
    {a: 0, b:0, y: 0, sign: '≤'},
    {a: 0, b:0, y: 0, sign: '≤'},
  ],
  result: {
      status: "optimal",
      solution: {
        x1: 0,
        x2: 6,
        objective: 240
      }   
  }
};

export default function graphReducer (state = initialState, action) {
  switch (action.type) {
    case SET_PARAMETERES:
      return {
        ...state,
        objective: action.payload.objective,
        objectiveFunction: action.payload.objectiveFunction,
        constraints: action.payload.constraints
      };
    case SET_RESULT: 
      return {
        ...state,
        result: {
          ...state.solution,
          status: action.payload.status,
          solution: action.payload.solution
        }
      }
    default:
      return state;
  }
};
