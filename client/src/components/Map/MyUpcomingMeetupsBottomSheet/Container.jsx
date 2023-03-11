import React, { useMemo, useContext, useState, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import UpcomingMeetups from './UpcomingMeetups';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyUpcomingMeetupsBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['70%'], []);
  const { auth, myUpcomingMeetupAndChatsTable, totalUnreadChatsCount, navigation, isIpad } = useContext(GlobalContext);
  const { myUpcomingMeetupsBottomSheetRef } = useContext(MapContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={myUpcomingMeetupsBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: backgroundColorsTable['green1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='run' color={iconColorsTable['green1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>My upcoming meetups</Text>
        </View>
        <UpcomingMeetups />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default MyUpcomingMeetupsBottomSheet;
