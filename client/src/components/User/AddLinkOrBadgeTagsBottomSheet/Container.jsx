import React, { useContext, useMemo } from 'react';
import UserContext from '../UserContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

const Container = (props) => {
  const snapPoints = useMemo(() => ['80%', '100%'], []);
  const {
    pressedBadgeData,
    addLinkOrBadgeTagsBottomSheetRef,
    addLinkOrBadgeTagsBottomSheetType,
    setAddLinkOrBadgeTagsBottomSheetType,
  } = useContext(UserContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={addLinkOrBadgeTagsBottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )} // 後でこれを割り当てるかも。api requestでbadgeのdetailを取ってくるようにする場合は。
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      enablePanDownToClose={true}
      // onClose={() => onBadgeDetailBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={() => addLinkOrBadgeTagsBottomSheetRef.current.close()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <AntDesign name='closecircleo' size={25} color={baseTextColor} style={{ marginRight: 10 }} />
            <Text style={{ color: baseTextColor }}>Close</Text>
          </View>
          <Text style={{ color: 'white' }}>{addLinkOrBadgeTagsBottomSheetType}</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps)(Container);
