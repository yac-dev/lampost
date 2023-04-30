import React, { useMemo, useContext, useState, useEffect } from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import { emojis } from '../../../../utils/emojisList';

const MemberBottomSheet = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { memberBottomSheetRef, isMemberBottomSheetOpen, setIsMemberBottomSheetOpen } = useContext(LoungeContext);
  // const [text, setText] = useState('');

  if (isMemberBottomSheetOpen) {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={memberBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        keyboardBehavior={'extend'}
        onClose={() => setIsMemberBottomSheetOpen(false)}
      >
        <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}></BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default MemberBottomSheet;
