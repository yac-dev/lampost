const INITIAL_STATE = {
  post: {
    isOpen: false,
  },
  meetUp: {
    isOpen: false,
  },
  live: {
    isOpen: false,
  },
  selectedItem: {
    isOpen: false,
  },
};

const bottomSheetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_POST_BOTTOM_SHEET':
      return { ...state, post: { isOpen: action.payload } };
    case 'SET_SELECTED_ITEM_BOTTOM_SHEET':
      return { ...state, selectedItem: { isOpen: action.payload } };
    default:
      return { ...state };
  }
};

export default bottomSheetReducer;
