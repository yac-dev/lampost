import { combineReducers } from 'redux';
import authReducer from './auth';
import modalReducer from './modal';
import postsReducer from './posts';
import selectedItemReducer from './selectedItem';
// import dummy from './dummy';

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  posts: postsReducer,
  selectedItem: selectedItemReducer,
});
export default rootReducer;
