import React, { useMemo, useContext, useState, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import AppMenuButtons from './AppMenuButtons';
// import UpcomingMeetups from '../MyUpcomingMeetupsBottomSheet/UpcomingMeetups';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../utils/colorsTable';
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';
import lampostAPI from '../../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['30%'], []);
  const { auth, myUpcomingMeetupAndChatsTable, totalUnreadChatsCount, navigation, isIpad } = useContext(GlobalContext);
  const { appMenuBottomSheetRef } = useContext(MapContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={appMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <AppMenuButtons />
        {/* {auth.data ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: backgroundColorsTable['green1'],
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <MaterialCommunityIcons name='run' color={iconColorsTable['green1']} size={20} />
              </View>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>My upcoming meetups</Text>
            </View>
            <UpcomingMeetups />
          </>
        ) : (
          <View>
            <Text style={{ color: baseTextColor }}>Please login or signup if you want to launch or join a meetup.</Text>
          </View>
        )} */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, auth: state.auth };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppMenusBottomSheet);
