import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import audioReducer from './audioReducer';
import searchReducer from './searchReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  audioReducer,
  searchReducer,
  routing: routerReducer
});

export default rootReducer;
