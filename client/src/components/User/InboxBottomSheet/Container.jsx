import React, { useContext, useMemo } from 'react';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import { connect } from 'react-redux';
// import UserContext from './Context';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

const InboxBottomSheet = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const { inboxBottomSheetRef } = useContext(UserContext);
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={inboxBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: backgroundColorsTable['pink1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='mailbox' color={iconColorsTable['pink1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Inbox</Text>
        </View>
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>
          You'll see all your unread messages from your friends.
        </Text>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default InboxBottomSheet;
