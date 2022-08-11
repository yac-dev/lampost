const INITIAL_STATE = {
  selectGenre: {
    isOpen: false,
  },
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SELECT_GENRE_MODAL':
      return { ...state, selectGenre: { isOpen: true } };
    default:
      return { ...state };
  }
};

export default modalReducer;
