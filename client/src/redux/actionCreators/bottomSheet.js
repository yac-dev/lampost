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

export const setIsTextBoxBottomSheetOpen = (bool) => {
  return {
    type: 'SET_TEXT_BOX_BOTTOM_SHEET',
    payload: bool,
  };
};

export const setIsCrewBottomSheetOpen = (bool) => {
  return {
    type: 'SET_CREW_BOTTOM_SHEET',
    payload: bool,
  };
};
