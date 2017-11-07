import { combineReducers } from 'redux';
import authReducer from './authReducer';
import audioReducer from './audioReducer';
import searchReducer from './searchReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authReducer,
  audioFeatures: audioReducer,
  search: searchReducer,
  routing: routerReducer
});

export default rootReducer;
