import React, { useMemo, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  sectionBackgroundColor,
} from '../../../../utils/colorsTable';
import UserInfo from '../../../Utils/UserInfo';

const CrewBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['45%', '80%'], []);
  const { auth } = useContext(GlobalContext);
  const { meetup, navigation, crewBottomSheetRef } = useContext(LoungeContext);

  const renderCrew = () => {
    if (meetup) {
      const crewList = meetup.attendees.map((user, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              padding: 10,
            }}
            onPress={() => {
              if (auth.data._id !== user._id) {
                navigation.navigate('User', { userId: user._id });
              }
            }}
          >
            <UserInfo user={user} />
          </TouchableOpacity>
        );
      });

      return (
        <View>
          <Text style={{ color: baseTextColor, marginBottom: 10 }}>These people are joining this meetup.</Text>
          <View style={{ backgroundColor: sectionBackgroundColor, borderRadius: 10 }}>{crewList}</View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={crewBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5 }}>Crew</Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderCrew()}</ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CrewBottomSheet;
