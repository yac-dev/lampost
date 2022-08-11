import { combineReducers } from 'redux';
import authReducer from './auth';
import bottomSheetReducer from './bottomSheet';
import postsReducer from './posts';
import selectedItemReducer from './selectedItem';
// import dummy from './dummy';

const rootReducer = combineReducers({
  auth: authReducer,
  bottomSheet: bottomSheetReducer,
  posts: postsReducer,
  selectedItem: selectedItemReducer,
});
export default rootReducer;
