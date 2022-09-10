const INITIAL_STATE = {
  isOpen: false,
  message: '',
  barType: '',
};

const snackBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SNACK_BAR':
      return { ...state, isOpen: true, message: action.payload.message, barType: action.payload.barType };
    case 'REMOVE_SNACK_BAR':
      return { ...state, isOpen: false, message: '', barType: '' };
    default:
      return { ...state };
  }
};

export default snackBarReducer;
