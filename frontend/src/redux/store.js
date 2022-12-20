import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

export const configureStore = () => {
  return createStore(reducers, {}, applyMiddleware(thunk));
};
