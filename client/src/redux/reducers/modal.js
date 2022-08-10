const INITIAL_STATE = {
  postBottomSheet: {
    isOpen: false,
  },
  meetUpBottomSheet: {
    isOpen: false,
  },
  liveBottomSheet: {
    isOpen: false,
  },
  selectedItemBottomSheet: {
    isOpen: false,
  },
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_POST_BOTTOM_SHEET':
      return { ...state, postBottomSheet: { isOpen: action.payload } };
    case 'SET_SELECTED_ITEM_BOTTOM_SHEET':
      return { ...state, selectedItemBottomSheet: { isOpen: action.payload } };
    default:
      return { ...state };
  }
};

export default modalReducer;
