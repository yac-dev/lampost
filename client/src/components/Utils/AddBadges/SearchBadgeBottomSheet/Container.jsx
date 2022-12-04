import React, { useContext } from 'react';
import AddBadgesContext from '../AddBadgesContext';
import { View, Text, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor, sectionBackgroundColor } from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// components
import FilterActionButtons from './FilterActionButtons';

const SearchBottomSheet = (props) => {
  const snapPoints = ['10%', '50%', '80%'];
  const { searchBadgeBottomSheetRef, searchQuery, setSearchQuery } = useContext(AddBadgesContext);

  return (
    <GorhomBottomSheet
      index={0}
      enableOverDrag={true}
      ref={searchBadgeBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      keyboardBehavior={'extend'}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={0} />
      )}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 25, paddingLeft: 20 }}>
          Search for badges?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 25,
            backgroundColor: sectionBackgroundColor,
            borderRadius: 10,
          }}
        >
          <AntDesign name='search1' size={20} color={baseTextColor} style={{ paddingLeft: 10, paddingRight: 10 }} />
          <BottomSheetTextInput
            placeholder='Type'
            placeholderTextColor={baseTextColor}
            style={{
              flex: 1,
              paddingTop: 10,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 0,
              backgroundColor: sectionBackgroundColor,
              color: baseTextColor,
            }}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Filtering</Text>
        {/* <FilterActionButtons
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
          queryType={props.queryType}
          setQueryType={props.setQueryType}
        /> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SearchBottomSheet;
