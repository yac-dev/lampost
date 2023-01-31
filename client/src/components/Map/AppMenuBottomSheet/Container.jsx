import React, { useMemo, useContext, useState, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import AppMenuButtons from './AppMenuButtons';
import UpcomingMeetups from './UpcomingMeetups';
import { appBottomSheetBackgroundColor, baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';
import lampostAPI from '../../../apis/lampost';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['8%', '30%', '80%'], []);
  const { auth, myUpcomingMeetupAndChatsTable, totalUnreadChatsCount, navigation } = useContext(GlobalContext);
  const { appMenuBottomSheetRef } = useContext(MapContext);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);

  return (
    <GorhomBottomSheet
      index={0}
      enableOverDrag={true}
      ref={appMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={0} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, flex: 1 }}>
        {/* <ScrollView contentContainerStyle={{ paddingBottom: 100 }}> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginRight: 10, marginBottom: 35 }}>
            Launch your meetup?
          </Text>
          {totalUnreadChatsCount ? (
            <View
              style={{
                backgroundColor: iconColorsTable['blue1'],
                width: 20,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20 / 2,
              }}
            >
              <Text style={{ color: 'white' }}>{totalUnreadChatsCount}</Text>
            </View>
          ) : null}
        </View>
        {auth.data ? (
          <>
            <AppMenuButtons />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
              My upcoming meetups
            </Text>
            <UpcomingMeetups />
          </>
        ) : (
          <View>
            <Text style={{ color: baseTextColor }}>Please login or signup if you want to launch or join a meetup.</Text>
          </View>
        )}
        {/* </ScrollView> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, auth: state.auth };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppMenusBottomSheet);
