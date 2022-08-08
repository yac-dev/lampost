import { combineReducers } from 'redux';
import authReducer from './auth';
import modalReducer from './modal';
// import dummy from './dummy';

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});
export default rootReducer;
