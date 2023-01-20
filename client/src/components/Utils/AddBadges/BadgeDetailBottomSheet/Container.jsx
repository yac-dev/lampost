import React, { useContext, useMemo } from 'react';
import AddBadgesContext from '../AddBadgesContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';

// components
// import BadgeDetail from '../../BadgeDetail/Container';
import BadgeDetail from './BadgeDetail/Container';

// ac
import { setIsTappedBadgeBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  const snapPoints = useMemo(() => ['50%', '80%', '100%'], []);
  const { badgeDetailBottomSheetRef, searchBadgeBottomSheetRef, tappedBadge } = useContext(AddBadgesContext);

  // const onBadgeDetailBottomSheetClose = () => {
  //   searchBadgeBottomSheetRef.current.snapToIndex(0);
  // };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={badgeDetailBottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      // backdropComponent={(backdropProps) => (
      //   <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={0} />
      // )} 後でこれを割り当てるかも。api requestでbadgeのdetailを取ってくるようにする場合は。
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      enablePanDownToClose={false}
      // onClose={() => onBadgeDetailBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => badgeDetailBottomSheetRef.current.close()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <AntDesign name='closecircleo' size={25} color={baseTextColor} style={{ marginRight: 10 }} />
            <Text style={{ color: baseTextColor }}>Close</Text>
          </View>
        </TouchableOpacity>
        {tappedBadge ? <BadgeDetail /> : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsTappedBadgeBottomSheetOpen })(Container);
