import { combineReducers } from 'redux';
import graphReducer from './graphReducer'
import displayReducer from './displayReducer';

const reducers = combineReducers({
    graphReducer,
    displayReducer
  });
  
export default reducers;