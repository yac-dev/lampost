import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import { baseTextColor, baseBackgroundColor, iconColorsTable } from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import AttendedContext from './AttendedContext';
import UserInfo from '../../../Utils/UserInfo';
import ClapPeopleBottomSheet from './ClapPeopleBottomSheet';

const AttendedContainer = (props) => {
  const { auth } = useContext(GlobalContext);
  const [isFetchedAttended, setIsFetchedAttended] = useState(false);
  const [fetchedAttended, setFetchedAttended] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const clapPeopleBottomSheetRef = useRef(null);

  const getMeetupAttended = async () => {
    setIsFetchedAttended(false);
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}/users`);
    const { meetupAttendees } = result.data;
    setFetchedAttended(meetupAttendees);
    setIsFetchedAttended(true);
  };

  useEffect(() => {
    getMeetupAttended();
  }, []);

  const renderActionButtons = (user) => {
    // if (auth.data._id !== user._id) {
    // can't clap myself
    if (user._id === props.route.params.launcher) {
      return (
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 7,
              padding: 7,
              marginRight: 10,
            }}
            onPress={() => {
              setSelectedUser(user);
              clapPeopleBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <MaterialCommunityIcons name='fire' size={22} color={'white'} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white' }}>Clap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 7,
              padding: 10,
            }}
            onPress={() => {
              console.log('oops...');
            }}
          >
            <MaterialCommunityIcons name='hand-heart' size={22} color='white' style={{ marginRight: 5 }} />
            <Text style={{ color: 'white' }}>Give a tip</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 7,
              padding: 10,
              marginRight: 10,
            }}
            onPress={() => {
              setSelectedUser(user);
              clapPeopleBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <MaterialCommunityIcons name='hand-clap' size={22} color='white' style={{ marginRight: 5 }} />
            <Text style={{ color: 'white' }}>Clap</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    // }
  };

  const onUserNamePress = (user) => {
    if (!auth.data) {
      setSnackBar({
        isVisible: true,
        barType: 'error',
        message: 'You are required to login or signup',
        duration: 2000,
      });
    } else {
      if (auth.data._id !== user._id) {
        console.log('page opening');
      } else {
        console.log('Not gonna navigate to my page');
      }
    }
  };

  const renderAttended = () => {
    if (!fetchedAttended.length) {
      return <Text style={{ color: baseTextColor }}>You'll see all those who joined this meetup.</Text>;
    } else {
      return (
        <View>
          <FlatList
            data={fetchedAttended}
            renderItem={({ item }) => (
              <UserInfo user={item} onUserNamePress={onUserNamePress} actionButtons={renderActionButtons(item)} />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      );
    }
  };

  return (
    <AttendedContext.Provider
      value={{ clapPeopleBottomSheetRef, launcher: props.route.params.launcher, selectedUser, setSelectedUser }}
    >
      <View
        style={{ backgroundColor: baseBackgroundColor, flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}
      >
        {isFetchedAttended ? renderAttended() : <ActivityIndicator />}
      </View>
      <ClapPeopleBottomSheet />
    </AttendedContext.Provider>
  );
};

export default AttendedContainer;
