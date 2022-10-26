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

export const setIsSelectedMeetupInfoDetailBottomSheetOpen = (bool, component) => {
  return {
    type: 'SET_SELECTED_MEETUP_INFO_DETAIL_BOTTOM_SHEET_OPEN',
    payload: { isOpen: bool, component },
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

export const setIsTappedBadgeBottomSheetOpen = (bool, data) => {
  return {
    type: 'SET_TAPPED_BADGE_BOTTOM_SHEET',
    payload: { isOpen: bool, data },
  };
};
