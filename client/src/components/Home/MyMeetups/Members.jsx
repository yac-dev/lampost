import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, iconColorsTable, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';
import { iconsTable } from '../../../utils/icons';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import FastImage from 'react-native-fast-image';

const AttendeesContainer = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { auth, setSnackBar } = useContext(GlobalContext);
  const [isFetchedAttendees, setIsFetchedAttendees] = useState(false);
  const [fetchedAttendees, setFetchedAttendees] = useState([]);
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  console.log(props.route.params);

  const getMeetupAttendees = async () => {
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}/users`);
    const { meetupAttendees } = result.data;
    setFetchedAttendees(meetupAttendees);
    setIsFetchedAttendees(true);
  };

  console.log(fetchedAttendees);

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
        topLevelHomeNavigation.navigate('Home user', { userId: user._id });
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    getMeetupAttendees();
  }, []);

  const renderSubInfo = (userObject) => {
    if (userObject.launcher) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            name='rocket-launch'
            size={20}
            color={iconColorsTable['red1']}
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: 'white' }}>Launcher</Text>
        </View>
      );
    } else {
      if (userObject.rsvp) {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={20} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white' }}>RSVPed</Text>
          </View>
        );
      } else {
        return null;
      }
    }
  };

  const renderUser = useCallback((user) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FastImage
          source={{
            uri: user.photo ? user.photo : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
          }}
          style={{ width: 35, height: 35, borderRadius: 5, marginRight: 10, backgroundColor: iconColorsTable['blue1'] }}
          tintColor={user.photo ? null : 'white'}
        />
        <View style={{ borderWidth: 0.3, borderBottomColor: 'red' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 7 }}>{user.name}</Text>
              <Text style={{ color: 'white', marginBottom: 7 }}>status</Text>
            </View>
            <TouchableOpacity>
              <Text>Button</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>badges</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  // renderUser(item)
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      {!isFetchedAttendees ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            data={fetchedAttendees}
            renderItem={({ item }) => (
              <UserInfo
                user={item.user}
                onUserNamePress={() => onUserNamePress(item.user)}
                subInfo={renderSubInfo(item)}
              />
            )}
            keyExtractor={(item, index) => `${item.user._id}-${index}`}
          />
        </View>
      )}
    </View>
  );
};

export default AttendeesContainer;
