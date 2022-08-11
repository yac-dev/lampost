export const setIsPostBottomSheetOpen = (bool) => {
  return {
    type: 'SET_POST_BOTTOM_SHEET',
    payload: bool,
  };
};

export const setIsSelectedItemBottomSheetOpen = (bool) => {
  return {
    type: 'SET_SELECTED_ITEM_BOTTOM_SHEET',
    payload: bool,
  };
};
