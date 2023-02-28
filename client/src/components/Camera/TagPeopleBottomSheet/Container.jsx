import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../utils/colorsTable';
// import AddAssetEffect from './AddAssetEffectMenu/Container';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const TagPeopleBottomSheet = (props) => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { tagPeopleBottomSheetRef, taggedPeople, setTaggedPeople, meetupAttendees, setMeetupAttendees } =
    useContext(CameraContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  // const oneGridHeight = Dimensions.get('window').height / 7;
  const avatarWidth = oneGridWidth * 0.6;
  const snapPoints = useMemo(() => ['50%'], []);

  const renderMeetupAttendees = () => {
    const meetupAttendeesList = meetupAttendees.map((user, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            width: oneGridWidth,
            height: oneGridHeight,
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FastImage
            style={{ width: avatarWidth, aspectRatio: 1, borderRadius: 10, marginBottom: 5 }}
            source={{ uri: user.photo }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <Text numberOfLines={1} style={{ color: 'white' }}>
            {user.name}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ width: oneGridWidth, height: oneGridHeight }}>
          <View style={{ width: avatarWidth, aspectRatio: 1 }}></View>
          <Text style={{ color: 'white' }}>User name</Text>
        </TouchableOpacity>
        {meetupAttendeesList}
      </View>
    );
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={tagPeopleBottomSheetRef}
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
        {meetupAttendees.length ? renderMeetupAttendees() : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default TagPeopleBottomSheet;