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
  // こういうstateマジで注意ね。
  selectedItem: {
    isOpen: false,
    infoDetail: {
      isOpen: false,
    },
  },
  // この下2つは、loungeで使うbottomsheetね
  textBox: {
    isOpen: false,
  },
  crew: {
    isOpen: false,
  },
  // badge addの時に出すbottom sheetね。meetup作る時。
  badgeDetail: {
    isOpen: false,
    data: null,
  },
  //
};

const bottomSheetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_POST_BOTTOM_SHEET':
      return { ...state, post: { isOpen: action.payload } };
    case 'SET_SELECTED_ITEM_BOTTOM_SHEET':
      return { ...state, selectedItem: { ...state.selectedItem, isOpen: action.payload } };
    case 'SET_SELECTED_MEETUP_INFO_DETAIL_BOTTOM_SHEET_OPEN':
      return {
        ...state,
        selectedItem: {
          ...state.selectedItem,
          infoDetail: { isOpen: action.payload.isOpen, component: action.payload.component },
        },
      };
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
