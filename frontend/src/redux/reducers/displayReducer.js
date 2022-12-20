import { SET_DISPLAY } from '../actionTypes/actionTypes';

const initialState = {
  display: 'form',
};

export default function displayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DISPLAY:
      return {
        ...state,
        display: action.payload,
      };
    default:
      return state;
  }
}
