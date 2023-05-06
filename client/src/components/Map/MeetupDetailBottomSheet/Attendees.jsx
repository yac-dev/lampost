import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import DiscoverNavigatorContext from '../../Navigator/Discover/DiscoverNavigatorContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import {
  baseBackgroundColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';
import { iconsTable } from '../../../utils/icons';

const AttendeesContainer = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { auth, setSnackBar } = useContext(GlobalContext);
  const [isFetchedAttendees, setIsFetchedAttendees] = useState(false);
  const [fetchedAttendees, setFetchedAttendees] = useState([]);
  const { topLevelNavigation } = useContext(DiscoverNavigatorContext);

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
        props.navigation.navigate('User', { userId: user._id });
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    getMeetupAttendees();
  }, []);

  const renderUser = (userInfo) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        {userInfo ? (
          <TouchableOpacity
            style={{ flex: 0.15 }}
            onPress={() => {
              if (auth.data._id !== userInfo.user._id) {
                topLevelNavigation.navigate('Meetup member', { userId: userInfo.user._id });
              } else {
                return null;
              }
            }}
          >
            <FastImage
              source={{
                uri: userInfo.user.photo
                  ? userInfo.user.photo
                  : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
                // marginRight: 10,
                backgroundColor: iconColorsTable['blue1'],
              }}
              tintColor={userInfo.user.photo ? null : 'white'}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 0.15,
              borderRadius: 5,
              backgroundColor: iconColorsTable['blue1'],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons name='ghost' size={20} color='white' />
          </View>
        )}

        <View
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: baseTextColor,
            flex: 0.85,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
              marginBottom: 10,
              width: '100%',
            }}
          >
            {userInfo ? (
              <View>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17, marginBottom: 10 }}>
                  {userInfo.launcher ? '🚀' : userInfo.rsvped ? '🔥' : null}&nbsp;{userInfo.user.name}
                </Text>
              </View>
            ) : (
              <Text style={{ color: 'white', fontSize: 20 }}>This user doesn't exist</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderMembers = () => {
    if (!fetchedAttendees.length) {
      return <Text style={{ color: baseTextColor }}>You'll see all those who joined this meetup.</Text>;
    } else {
      return (
        <FlatList
          data={fetchedAttendees}
          renderItem={({ item }) => renderUser(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      {!isFetchedAttendees ? <ActivityIndicator /> : renderMembers()}
    </View>
  );
};

export default AttendeesContainer;
