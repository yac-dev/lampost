import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
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
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6;
  // const oneGridHeight = Dimensions.get('window').height / 7;
  const avatarWidth = oneGridWidth * 0.6;
  const snapPoints = useMemo(() => ['50%'], []);

  const renderTag = (attendee) => {
    if (taggedPeople[attendee.user._id]) {
      return (
        <View style={{ position: 'absolute', top: -15, right: -10 }}>
          <Ionicons name='pricetag' color={iconColorsTable['lightGreen1']} size={20} />
        </View>
      );
    } else {
      return null;
    }
  };

  const tagPeople = (attendee) => {
    if (!taggedPeople[attendee.user._id]) {
      setTaggedPeople((previous) => {
        return {
          ...previous,
          [attendee.user._id]: attendee,
        };
      });
    } else {
      setTaggedPeople((previous) => {
        const updating = { ...previous };
        delete updating[attendee.user._id];
        return updating;
      });
    }
  };

  const renderMeetupAttendees = () => {
    const meetupAttendeesArr = Object.values(meetupAttendees);
    if (meetupAttendeesArr.length) {
      const list = meetupAttendeesArr.map((attendee, index) => {
        if (attendee) {
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
              onPress={() => tagPeople(attendee)}
            >
              <View
                style={{
                  width: avatarWidth,
                  aspectRatio: 1,
                  borderRadius: 10,
                  marginBottom: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FastImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: iconColorsTable['blue1'],
                  }}
                  source={{
                    uri: attendee.user.photo
                      ? attendee.user.photo
                      : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                  tintColor={attendee.user.photo ? null : 'white'}
                />
                <Text numberOfLines={1} style={{ color: 'white' }}>
                  {attendee.user.name}
                </Text>
                {renderTag(attendee)}
              </View>
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      });

      return (
        <BottomSheetScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* <TouchableOpacity
              style={{
                width: oneGridWidth,
                height: oneGridHeight,
                // backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => console.log('tagging all')}
            >
              <View
                style={{
                  width: avatarWidth,
                  aspectRatio: 1,
                  borderRadius: 10,
                  marginBottom: 5,
                  backgroundColor: backgroundColorsTable['pink1'],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialIcons name='group-add' color={iconColorsTable['pink1']} size={25} />
              </View>
              <Text numberOfLines={1} style={{ color: 'white' }}>
                Add all
              </Text>
            </TouchableOpacity> */}
            {list}
          </View>
        </BottomSheetScrollView>
      );
    } else {
      return null;
    }
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
      <BottomSheetView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Who are you with now?</Text>
        </View>
        {renderMeetupAttendees()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default TagPeopleBottomSheet;
