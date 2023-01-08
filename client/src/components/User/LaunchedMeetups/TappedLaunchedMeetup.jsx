import React, { useContext, useMemo } from 'react';
import LaunchedContext from './LaunchedContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor, inputBackgroundColor } from '../../../utils/colorsTable';
import DateAndYear from '../../Utils/DateAndYear';

const TappedLaunchedMeetupBottomSheet = () => {
  const snapPoints = useMemo(() => ['60%', '80%'], []);
  const { tappedLaunchedMeetupBottomSheetRef, tappedLaunchedMeetupObject, fetchedCrew, fetchedImpressions } =
    useContext(LaunchedContext);

  const renderCrew = () => {
    const list = fetchedCrew.map((user, index) => {
      return (
        <View key={index}>
          <Text>{user.name}</Text>
        </View>
      );
    });

    return <ScrollView horizontal={true}>{list}</ScrollView>;
  };

  const renderImpressions = () => {
    const list = fetchedImpressions.map((impression, index) => {
      return (
        <View key={index}>
          <Text>{impression.text}</Text>
        </View>
      );
    });

    return <View>{list}</View>;
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={tappedLaunchedMeetupBottomSheetRef}
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
      <BottomSheetView style={{ padding: 10, flex: 1 }}>
        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 15 }}>Tapped</Text> */}
        {tappedLaunchedMeetupObject ? (
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <DateAndYear date={tappedLaunchedMeetupObject.meetup.startDateAndTime} />
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', flexShrink: 1 }}>
                {tappedLaunchedMeetupObject.meetup.title}
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              {tappedLaunchedMeetupObject.representation ? (
                <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', marginBottom: 15 }}>
                  {tappedLaunchedMeetupObject.representation}
                </Text>
              ) : (
                <Text style={{ color: baseTextColor }}>You'll see the launcher's comment here.</Text>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <Ionicons name='ios-remove-outline' size={25} color={'white'} style={{ marginRight: 5 }} />
                {/* <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'red', marginRight: 10 }}></View> */}
                <Text style={{ color: 'white', fontSize: 15 }}>{tappedLaunchedMeetupObject.meetup.launcher.name}</Text>
              </View>
              {/* {renderAddRepresentationButton(launchedMeetupObject.representation)} */}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ color: baseTextColor }}>These people attended this meetup</Text>
            </View>
            <View>
              <Text style={{ color: baseTextColor, marginBottom: 10 }}>Impressions</Text>
              <BottomSheetTextInput
                placeholder='Add an impression'
                placeholderTextColor={baseTextColor}
                style={{ padding: 10, borderRadius: 10, backgroundColor: inputBackgroundColor }}
              />
            </View>
          </View>
        ) : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default TappedLaunchedMeetupBottomSheet;
