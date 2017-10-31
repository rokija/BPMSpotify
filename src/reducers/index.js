import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  routing: routerReducer
});

export default rootReducer;
