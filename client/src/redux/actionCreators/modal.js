export const setIsFormBottomSheetOpen = (bool) => {
  return {
    type: 'SET_FORM_BOTTOM_SHEET',
    payload: bool,
  };
};

export const setIsPostBottomSheetOpen = (bool) => {
  return {
    type: 'SET_POST_BOTTOM_SHEET',
    payload: bool,
  };
};
