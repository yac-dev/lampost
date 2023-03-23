import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import AppMenuButton from '../../Utils/AppMenuButton';

const AppMenuButtons = (props) => {
  const { auth, setSnackBar, setLoading } = useContext(GlobalContext);
  const {
    appMenuBottomSheetRef,
    tagPeopleBottomSheetRef,
    setCameraMode,
    cameraMode,
    cameraType,
    videoEffect,
    cameraModeBottomSheetRef,
    timeMachineBottomSheetRef,
    videoEffectBottomSheetRef,
    flipBottomSheetRef,
    meetupAttendees,
    setMeetupAttendees,
    currentMeetup,
  } = useContext(CameraContext);

  const renderCameraMode = () => {
    if (cameraMode === 'photo') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>Photo</Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </View>
      );
    } else if (cameraMode === 'video') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>Video</Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </View>
      );
    }
  };

  console.log(meetupAttendees);

  const getAttendees = async () => {
    if (currentMeetup) {
      if (!Object.values(meetupAttendees).length) {
        setLoading(true);
        const result = await lampostAPI.get(`meetupanduserrelationships/meetup/${currentMeetup}/users`);
        const { meetupAttendees } = result.data;

        console.log(meetupAttendees);
        setMeetupAttendees(() => {
          const attendeesTable = {};
          meetupAttendees.forEach((attendee, index) => {
            attendeesTable[attendee.user._id] = attendee;
          });
          return attendeesTable;
        });
        tagPeopleBottomSheetRef.current.snapToIndex(0);
        appMenuBottomSheetRef.current.close();
        setLoading(false);
      } else {
        tagPeopleBottomSheetRef.current.snapToIndex(0);
        appMenuBottomSheetRef.current.close();
      }
    } else {
      setSnackBar({
        isVisible: true,
        barType: 'error',
        message: 'This is only available when you are having a meetup.',
        duration: 5000,
      });
    }
  };

  if (auth.data) {
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            cameraModeBottomSheetRef.current.snapToIndex(0);
            appMenuBottomSheetRef.current.close();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['yellow1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Ionicons name='camera' size={20} color={iconColorsTable['yellow1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Camera mode</Text>
          </View>
          {renderCameraMode()}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            flipBottomSheetRef.current.snapToIndex(0);
            appMenuBottomSheetRef.current.close();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['grey1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='camera-flip' size={20} color={iconColorsTable['grey1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Flip</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' size={25} color={iconColorsTable['grey1']} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            getAttendees();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              <Ionicons name='ios-pricetags' size={20} color={iconColorsTable['green1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Tag people</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            // timeMachineBottomSheetRef.current.snapToIndex(0);
            // appMenuBottomSheetRef.current.close();
            if (cameraMode === 'photo') {
              null;
            } else if (cameraMode === 'video') {
              appMenuBottomSheetRef.current.close();
              videoEffectBottomSheetRef.current.snapToIndex(0);
            }
          }}
          // disabled={true}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['blue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='history' size={20} color={iconColorsTable['blue1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Time machine</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor }}>{videoEffect}</Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <Text style={{ color: baseTextColor, fontWeight: 'bold', fontSize: 17 }}>
        Please login or signup to take some actions
      </Text>
    );
  }
};

export default AppMenuButtons;
