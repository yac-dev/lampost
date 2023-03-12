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
import { iconsTable } from '../../../utils/icons';

const MyUpcomingMeetupsBottomSheet = (props) => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const snapPoints = useMemo(() => ['30%'], []);
  const { auth, myUpcomingMeetupAndChatsTable, totalUnreadChatsCount, isIpad } = useContext(GlobalContext);
  const { moreMenuBottomSheetRef, setMoreMenuOf, moreMenuOf, navigation } = useContext(MapContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={moreMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => navigation.navigate('Lounge', { meetupId: moreMenuOf })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['lightBlue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Ionicons name='chatbubbles' color={iconColorsTable['lightBlue1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>
              Go to lounge of this meetup
            </Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => navigation.navigate('Attendees', { meetupId: moreMenuOf })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['orange1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='account-group' color={iconColorsTable['orange1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>
              Members of this meetup
            </Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default MyUpcomingMeetupsBottomSheet;
