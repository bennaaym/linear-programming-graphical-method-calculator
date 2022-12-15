import { SET_EXAMPLES } from "../actionTypes/actionTypes";

const initialState = {
  examples: []
};

export default function displayReducer (state = initialState, action) {
  switch (action.type) {
    case SET_EXAMPLES:
      return {
        ...state,
        examples: action.payload
      };
    default:
      return state;
  }
};