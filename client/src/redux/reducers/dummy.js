const INITIAL_STATE = {};
const dummy = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'COUNT_UP':
      return { ...state, count: 1 };
    default:
      return { ...state };
  }
};

export default dummy;
