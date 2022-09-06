const INITIAL_STATE = {};

const badgeElementsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_BADGE_ELEMENTS':
      const badgeElements = {};
      action.payload.map((badgeElement) => {
        badgeElements[badgeElement._id] = badgeElement;
      });
      return { ...state, ...badgeElements };
    default:
      return { ...state };
  }
};

export default badgeElementsReducer;
