import { combineReducers } from 'redux';
import authReducer from './auth';
import postsReducer from './posts';
import selectedItemReducer from './selectedItem';
import bottomSheetReducer from './bottomSheet';
import modalReducer from './modal';
import dialogReducer from './dialog';
import hostMeetupReducer from './hostMeetup';
// import dummy from './dummy';

const rootReducer = combineReducers({
  auth: authReducer,
  bottomSheet: bottomSheetReducer,
  posts: postsReducer,
  selectedItem: selectedItemReducer,
  modal: modalReducer,
  dialog: dialogReducer,
  hostMeetup: hostMeetupReducer,
});
export default rootReducer;
