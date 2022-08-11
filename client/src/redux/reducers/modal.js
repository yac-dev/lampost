const INITIAL_STATE = {
  selectGenre: {
    isOpen: false,
  },
  selectLimitHour: {
    isOpen: false,
  },
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SELECT_GENRE_MODAL':
      return { ...state, selectGenre: { isOpen: action.payload } };
    case 'SET_SELECT_LIMIT_HOUR_MODAL':
      return { ...state, selectLimitHour: { isOpen: action.payload } };
    default:
      return { ...state };
  }
};

export default modalReducer;
