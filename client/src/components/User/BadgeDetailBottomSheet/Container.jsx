import React, { useContext, useMemo } from 'react';
import UserContext from '../UserContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

import BadgeDetail from './BadgeDetail/Container';

const Container = (props) => {
  const snapPoints = useMemo(() => ['50%', '80%', '100%'], []);
  const { pressedBadgeData, badgeDetailBottomSheetRef } = useContext(UserContext);

  // const onBadgeDetailBottomSheetClose = () => {
  //   badgeDetailBottomSheetRef.current.snapToIndex(0);
  // };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={badgeDetailBottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )} // 後でこれを割り当てるかも。api requestでbadgeのdetailを取ってくるようにする場合は。
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      enablePanDownToClose={true}
      // onClose={() => onBadgeDetailBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        {/* <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => badgeDetailBottomSheetRef.current.close()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <AntDesign name='closecircleo' size={25} color={baseTextColor} style={{ marginRight: 10 }} />
            <Text style={{ color: baseTextColor }}>Close</Text>
          </View>
        </TouchableOpacity> */}
        {pressedBadgeData ? <BadgeDetail /> : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps)(Container);
