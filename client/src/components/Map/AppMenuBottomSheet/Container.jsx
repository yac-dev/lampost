import React, { useMemo, useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import AppMenuButtons from './AppMenuButtons';
import UpcomingMeetups from './UpcomingMeetups';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['8%', '30%', '80%'], []);
  const { auth } = useContext(GlobalContext);
  const { appMenuBottomSheetRef } = useContext(MapContext);

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
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 15 }}>
            Launch your meetup?
          </Text>
          {auth.data ? (
            // authがある上で、下のcomponentを表示していく。
            <>
              <AppMenuButtons />
              <UpcomingMeetups />
            </>
          ) : (
            <View>
              <Text>Please login or signup to take some actions.</Text>
            </View>
          )}
        </ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, auth: state.auth };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppMenusBottomSheet);
