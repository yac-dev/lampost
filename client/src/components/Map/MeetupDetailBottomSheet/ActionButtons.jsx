import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Share, Alert } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import MeetupContext from '../MeetupContext';
import DiscoverNavigatorContext from '../../Navigator/Discover/DiscoverNavigatorContext';
import lampostAPI from '../../../apis/lampost';
import { iconColorsTable, baseTextColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, MaterialIcons } = iconsTable;

const ActionButtons = () => {
  const { auth, setLoading, myUpcomingMeetups, setMyUpcomingMeetups, setSnackBar } = useContext(GlobalContext);
  const { selectedMeetup, meetupDetailBottomSheetRef, mapRef } = useContext(MeetupContext);
  const { topLevelNavigation } = useContext(DiscoverNavigatorContext);

  const validateJoinMeetup = (meetup) => {
    const myDates = Object.values(myUpcomingMeetups).map((meetup) => {
      const startDateAndTime = new Date(meetup.startDateAndTime);
      let endDateAndTime = new Date(startDateAndTime);
      endDateAndTime.setMinutes(startDateAndTime.getMinutes() + meetup.duration);
      return {
        _id: meetup._id,
        startDateAndTime,
        endDateAndTime,
      };
    });

    let isJoinable = true;

    if (myDates.length) {
      const joiningStartDateAndTimeString = new Date(meetup.startDateAndTime);
      let joiningEndDateAndTimeString = new Date(meetup.startDateAndTime);
      joiningEndDateAndTimeString = joiningEndDateAndTimeString.setMinutes(
        joiningStartDateAndTimeString.getMinutes() + meetup.duration
      );
      const joiningMeetupStartTime = joiningStartDateAndTimeString.getTime();
      const joiningMeetupEndTime = new Date(joiningEndDateAndTimeString).getTime();
      myDates.forEach((dateObject) => {
        const startDateAndTimeString = new Date(dateObject.startDateAndTime);
        const endDateAndTimeString = new Date(dateObject.endDateAndTime);
        const startDateAndTime = startDateAndTimeString.getTime();
        const endDateAndTime = endDateAndTimeString.getTime();
        if (
          (startDateAndTime < joiningMeetupStartTime && joiningMeetupStartTime < endDateAndTime) ||
          (startDateAndTime < joiningMeetupEndTime && joiningMeetupEndTime < endDateAndTime)
        ) {
          setSnackBar({
            isVisible: true,
            barType: 'error',
            message: 'OOPS. Not available this time. You have upcoming meetups on this time range.',
            duration: 3000,
          });
          isJoinable = false;
        } else if (
          joiningMeetupStartTime < startDateAndTime &&
          endDateAndTime - startDateAndTime < joiningMeetupEndTime - joiningMeetupStartTime
        ) {
          setSnackBar({
            isVisible: true,
            barType: 'error',
            message: 'OOPS. Not available this time. You have upcoming meetups on this time range.',
            duration: 3000,
          });
          isJoinable = false;
        } else {
          console.log("It's ok👍");
          isJoinable = true;
        }
      });
    }
    return isJoinable;
  };

  const joinMeetup = async () => {
    const isJoinable = validateJoinMeetup(selectedMeetup);
    if (isJoinable) {
      setLoading(true);
      const result = await lampostAPI.post('/meetupanduserrelationships/join', {
        meetupId: selectedMeetup._id,
        userId: auth.data._id,
      });
      const { meetup } = result.data;
      setMyUpcomingMeetups((previous) => {
        return {
          ...previous,
          [selectedMeetup._id]: {
            _id: selectedMeetup._id,
            startDateAndTime: selectedMeetup.startDateAndTime,
            title: selectedMeetup.title,
            launcher: meetup.launcher,
            state: meetup.state,
            unreadChatsTable: {
              general: 0,
              reply: 0,
              question: 0,
              help: 0,
            },
          },
        };
      });
      setLoading(false);
      meetupDetailBottomSheetRef.current.close();
      setSnackBar({
        isVisible: true,
        message: `Joined ${selectedMeetup.title} successfully. \n Please don't forget to send RSVP to launcher when you are ready.`,
        barType: 'success',
        duration: 5000,
      });
    } else {
      return null;
    }
  };

  const leaveMeetup = async () => {
    setLoading(true);
    const result = await lampostAPI.post('/meetupanduserrelationships/leave', {
      meetupId: selectedMeetup._id,
      userId: auth.data._id,
    });
    const { meetupId } = result.data; // filteringするだけよ。
    setMyUpcomingMeetups((previous) => {
      const updating = { ...previous };
      delete updating[selectedMeetup._id];
      return updating;
    });
    setLoading(false);
    meetupDetailBottomSheetRef.current.close();
    setSnackBar({ isVisible: true, message: `Left ${selectedMeetup.title}.`, barType: 'success', duration: 5000 });
  };

  const handleShare = async () => {
    const snapshot = await mapRef.current.takeSnapshot({
      format: 'png',
      quality: 0.8,
      result: 'file',
    });

    Share.share({
      title: 'Share Map View',
      message: 'https://apps.apple.com/us/app/lampost/id1668526833',
      url: `file://${snapshot}`,
      type: 'image/png',
    });
  };

  if (auth.data) {
    if (myUpcomingMeetups[selectedMeetup._id]?.launcher === auth.data._id) {
      // launcherが自分なら、何も表示しない。
      return (
        <View style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>🚀You've launched</Text>
        </View>
      );
    } else {
      if (myUpcomingMeetups[selectedMeetup._id]) {
        return (
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 0.5, paddingRight: 5 }}>
              <TouchableOpacity
                style={{ width: '100%', backgroundColor: iconColorsTable['red1'], padding: 7, borderRadius: 5 }}
                onPress={() => leaveMeetup()}
              >
                <View style={{ alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name='human-greeting-variant'
                      size={20}
                      color={'white'}
                      style={{ marginRight: 10 }}
                    />
                    <Text style={{ color: 'white' }}>Leave this library</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5, paddingLeft: 5 }}>
              <TouchableOpacity
                style={{ width: '100%', backgroundColor: iconColorsTable['red1'], padding: 7, borderRadius: 5 }}
                onPress={() => topLevelNavigation.navigate('Discover report', { report: selectedMeetup.title })}
              >
                <View style={{ alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name='report-problem' size={20} color={'white'} style={{ marginRight: 10 }} />
                    <Text style={{ color: 'white' }}>Report</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 0.5, paddingRight: 5 }}>
              <TouchableOpacity
                style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], padding: 7, borderRadius: 5 }}
                onPress={() => joinMeetup()}
              >
                <View style={{ alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name='human-greeting-variant'
                      size={20}
                      color={'white'}
                      style={{ marginRight: 10 }}
                    />
                    <Text style={{ color: 'white' }}>Join this meetup</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5, paddingLeft: 5 }}>
              <TouchableOpacity
                style={{ width: '100%', backgroundColor: iconColorsTable['red1'], padding: 7, borderRadius: 5 }}
                onPress={() => topLevelNavigation.navigate('Discover report', { report: selectedMeetup.title })}
              >
                <View style={{ alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name='report-problem' size={20} color={'white'} style={{ marginRight: 10 }} />
                    <Text style={{ color: 'white' }}>Report</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  } else {
    return (
      <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>
        Please login or signup to join this meetup.
      </Text>
    );
  }
};

export default ActionButtons;
