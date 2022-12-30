import React, { useMemo, useContext } from 'react';
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

const CrewBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['30%', '80%'], []);
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
              if (props.auth.data._id !== user._id) {
                navigation.navigate('User', { userId: user._id });
              }
            }}
          >
            <View
              style={{
                backgroundColor: iconColorsTable['blue1'],
                marginRight: 20,
                borderRadius: 10,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome5 name='user-astronaut' color='white' size={30} />
            </View>
            <View>
              <Text style={{ color: baseTextColor }}>{user.name}</Text>
              <Text style={{ color: baseTextColor }}>Badges in here</Text>
            </View>
          </TouchableOpacity>
        );
      });

      return (
        <View>
          <Text style={{ color: baseTextColor, marginBottom: 10 }}>These people are joining this meetup.</Text>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50, backgroundColor: sectionBackgroundColor, borderRadius: 10 }}
          >
            {crewList}
          </ScrollView>
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

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(CrewBottomSheet);
