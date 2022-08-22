import { combineReducers } from 'redux';
import authReducer from './auth';
import meetupsReducer from './meetups';
import selectedItemReducer from './selectedItem';
import bottomSheetReducer from './bottomSheet';
import modalReducer from './modal';
import dialogReducer from './dialog';
import hostMeetupReducer from './hostMeetup';
// import dummy from './dummy';

const rootReducer = combineReducers({
  auth: authReducer,
  bottomSheet: bottomSheetReducer,
  meetups: meetupsReducer,
  selectedItem: selectedItemReducer,
  modal: modalReducer,
  dialog: dialogReducer,
  hostMeetup: hostMeetupReducer,
});
export default rootReducer;
