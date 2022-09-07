export const setIsSelectGenreModalOpen = (bool) => {
  return {
    type: 'SET_SELECT_GENRE_MODAL',
    payload: bool,
  };
};

export const setIsSelectLimitHourModalOpen = (bool) => {
  return {
    type: 'SET_SELECT_LIMIT_HOUR_MODAL',
    payload: bool,
  };
};

export const setIsSelectMeetupBadgeElementsModalOpen = (bool) => {
  return {
    type: 'SET_SELECT_MEETUP_BADGE_ELEMENTS_MODAL',
    payload: bool,
  };
};

export const setIsSelectMeetupBadgesModalOpen = (bool) => {
  return {
    type: 'SET_IS_SELECT_MEETUP_BADGES_MODAL',
    payload: bool,
  };
};
