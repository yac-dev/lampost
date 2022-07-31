import { combineReducers } from 'redux';
import authReducer from './auth';
import dummy from './dummy';

const rootReducer = combineReducers({
  auth: authReducer,
  dummy,
});

export default rootReducer;
