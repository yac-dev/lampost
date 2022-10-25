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

export const setIsConfirmHostMeetupModalOpen = (bool) => {
  return {
    type: 'SET_IS_HOST_MEETUP_CONFIRM_MODAL_OPEN',
    payload: bool,
  };
};

export const setIsCancelLaunchMeetupModalOpen = (bool) => {
  return {
    type: 'SET_IS_CANCEL_LAUNCH_MEETUP_MODAL_OPEN',
    payload: bool,
  };
};

export const setIsSelectMeetupBadgesModalOpen = (bool) => {
  return {
    type: 'SET_IS_SELECT_MEETUP_BADGES_MODAL',
    payload: bool,
  };
};
