const INITIAL_STATE = {
  formBottomSheet: {
    isOpen: false,
  },
  postBottomSheet: {
    isOpen: false,
  },
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_FORM_BOTTOM_SHEET':
      return { ...state, formBottomSheet: { isOpen: action.payload } };
    case 'SET_POST_BOTTOM_SHEET':
      return { ...state, postBottomSheet: { isOpen: action.payload } };
    default:
      return { ...state };
  }
};

export default modalReducer;
