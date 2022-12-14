import { combineReducers } from 'redux';
import authReducer from './auth';
import meetupsReducer from './meetups';
import selectedItemReducer from './selectedItem';
import bottomSheetReducer from './bottomSheet';
import modalReducer from './modal';
import hostMeetupReducer from './hostMeetup';
import snackBarReducer from './snackBar';

const rootReducer = combineReducers({
  auth: authReducer,
  bottomSheet: bottomSheetReducer,
  meetups: meetupsReducer,
  selectedItem: selectedItemReducer,
  modal: modalReducer,
  hostMeetup: hostMeetupReducer,
  snackBar: snackBarReducer,
});
export default rootReducer;
