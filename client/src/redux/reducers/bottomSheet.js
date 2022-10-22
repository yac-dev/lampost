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
  textBox: {
    isOpen: false,
  },
  crew: {
    isOpen: false,
  },
  badgeDetail: {
    isOpen: false,
    data: null,
  },
};

const bottomSheetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_POST_BOTTOM_SHEET':
      return { ...state, post: { isOpen: action.payload } };
    case 'SET_SELECTED_ITEM_BOTTOM_SHEET':
      return { ...state, selectedItem: { isOpen: action.payload } };
    case 'SET_TEXT_BOX_BOTTOM_SHEET':
      return { ...state, textBox: { isOpen: action.payload } };
    case 'SET_CREW_BOTTOM_SHEET':
      return { ...state, crew: { isOpen: action.payload } };
    case 'SET_TAPPED_BADGE_BOTTOM_SHEET': // ここ、かっこいい書き方あったよな。。。なんだっけ？
      return { ...state, badgeDetail: { isOpen: action.payload.isOpen, data: action.payload.data } };
    default:
      return { ...state };
  }
};

export default bottomSheetReducer;
