import { combineReducers } from 'redux';
import authReducer from './auth';
import modalReducer from './modal';
import postsReducer from './posts';
// import dummy from './dummy';

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  posts: postsReducer,
});
export default rootReducer;
