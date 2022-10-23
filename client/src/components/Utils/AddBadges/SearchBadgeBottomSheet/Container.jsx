import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// components
import SearchBar from './SearchBar';
import FilterActionButtons from './FilterActionButtons';

const SearchBottomSheet = (props) => {
  const snapPoints = ['10%', '30%', '65%', '80%'];
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
          <AntDesign name='search1' size={20} style={{ padding: 10 }} />
          <BottomSheetTextInput
            placeholder='Search for badges'
            // ref={props.textInputRef}
            // style={{ height: 50, borderRadius: 10, padding: 10, flex: 1 }}
            style={{
              flex: 1,
              paddingTop: 10,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 0,
              backgroundColor: '#fff',
              color: '#424242',
            }}
            value={props.searchQuery}
            onChangeText={props.setSearchQuery}
          />
        </View>
        <FilterActionButtons
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
          queryType={props.queryType}
          setQueryType={props.setQueryType}
        />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SearchBottomSheet;
