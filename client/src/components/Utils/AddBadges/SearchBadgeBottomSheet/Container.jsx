import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
import SearchBar from './SearchBar';

const SearchBottomSheet = (props) => {
  const snapPoints = ['15%', '65%', '80%'];
  return (
    <GorhomBottomSheet
      index={0}
      enableOverDrag={true}
      ref={props.searchBadgeBottomSheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose={true}
      keyboardBehavior={'extend'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        {/* <BottomSheetTextInput /> */}
        <View>
          <BottomSheetTextInput
            placeholder='Search for badges' // ここを、bottom sheetのmax分に広げる。
            // ref={props.textInputRef}
            style={{ height: 50, borderRadius: 10, padding: 10 }}
          />
          <ScrollView></ScrollView>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SearchBottomSheet;
