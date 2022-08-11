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
