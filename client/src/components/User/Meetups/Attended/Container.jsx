import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import {
  baseTextColor,
  baseBackgroundColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import AttendedContext from './AttendedContext';
import UserInfo from '../../../Utils/UserInfo';
import ActionButtonBottomSheet from './ActionButtonBottomSheet';

const AttendedContainer = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const [isFetchedAttended, setIsFetchedAttended] = useState(false);
  const [fetchedAttended, setFetchedAttended] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const clapPeopleBottomSheetRef = useRef(null);
  const [myFriends, setMyFriends] = useState({});
  const [myLaunchers, setMyLaunchers] = useState({});
  const [isSupportingLauncher, setIsSupportingLauncher] = useState(false);
  const [isFollowingLauncher, setIsFollowingLauncher] = useState(false);
  const actionButtonBottomSheetRef = useRef(null);

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

  const getMyFriends = async () => {
    const result = await lampostAPI.get(`/friendrelationships/${auth.data._id}`);
    const { myFriends } = result.data;
    console.log(myFriends);
    setMyFriends(() => {
      const table = {};
      myFriends.forEach((friendRelationship) => {
        table[friendRelationship.friend._id] = friendRelationship.friend;
      });
      return table;
    });
  };

  // const getIsSupportingLauncher = async () => {
  //   const result = await lampostAPI.get(
  //     `/launcherandpatronrelationships/launcher/${props.route.params.launcherId}/patron/${auth.data._id}`
  //   );
  //   const { isSupporting } = result.data;
  //   setIsSupportingLauncher(isSupporting);
  // };
  const getIsFollowing = async () => {
    if (props.route.params.launcherId) {
      // launcherが蒸発している場合は、api送らない。
      const result = await lampostAPI.get(
        `/followrelationships/followee/${props.route.params.launcherId}/follower/${auth.data._id}`
      );
      const { isFollowing } = result.data;
      setIsFollowingLauncher(isFollowing);
    } else {
      return null;
    }
  };
  useEffect(() => {
    getMyFriends();
    getIsFollowing();
  }, []);

  const addFriend = async (user) => {
    const payload = {
      friendId: user._id,
      launcherId,
    };
    setLoading(true);
    const result = await lampostAPI.post(`/friendrelationships/${auth.data._id}`, payload);
    const { friendId } = result.data;
    console.log(payload);
    setMyFriends((previous) => {
      return {
        ...previous,
        [friendId]: friendId,
      };
    });
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: `Became friend with ${user.name}`,
      duration: 5000,
    });
  };

  const followLauncher = async () => {
    const payload = {
      followeeId: launcherId,
      user: {
        _id: auth.data._id,
        name: auth.data.name,
      },
    };
    setLoading(true);
    const result = await lampostAPI.post('/followrelationships', payload);
    // const { launcher } = result.data;
    setIsFollowingLauncher(true);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: `Started supporting this launcher.`,
      duration: 5000,
    });
  };

  const renderActionButtons = (userInfo) => {
    if (userInfo.user._id === auth.data._id) {
      return null;
    } else {
      if (userInfo.launcher) {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <TouchableOpacity style={{ flex: 0.5, borderRadius: 5, paddingRight: 2 }} onPress={() => followLauncher()}>
              <View
                style={{
                  backgroundColor: isFollowingLauncher ? iconColorsTable['green1'] : iconColorsTable['blue1'],
                  width: '100%',
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <MaterialCommunityIcons name='account-multiple' size={20} color={'white'} />
                  <Text style={{ color: 'white' }}>{isFollowingLauncher ? 'Following' : 'Follow'}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0.5, borderRadius: 5, paddingLeft: 2 }}
              disabled={myFriends[userInfo.user._id] ? true : false}
              onPress={() => addFriend(userInfo.user)}
            >
              <View
                style={{
                  backgroundColor: myFriends[userInfo.user._id] ? iconColorsTable['green1'] : iconColorsTable['blue1'],
                  width: '100%',
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <MaterialCommunityIcons name='human-greeting-variant' size={20} color={'white'} />
                  <Text style={{ color: 'white' }}>
                    {myFriends[userInfo.user._id] ? 'Already friended' : 'Be friends'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <TouchableOpacity
              style={{ flex: 1, borderRadius: 5, paddingLeft: 2 }}
              disabled={myFriends[userInfo.user._id] ? true : false}
              onPress={() => addFriend(userInfo.user)}
            >
              <View
                style={{
                  backgroundColor: myFriends[userInfo.user._id] ? iconColorsTable['green1'] : iconColorsTable['blue1'],
                  width: '100%',
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <MaterialCommunityIcons name='human-greeting-variant' size={20} color={'white'} />
                  <Text style={{ color: 'white' }}>
                    {myFriends[userInfo.user._id] ? 'Already friended' : 'Be friends'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
  };

  const renderUser = (userInfo) => {
    if (userInfo.user) {
      return (
        <TouchableOpacity
          style={{ flexDirection: 'row', marginBottom: 15 }}
          onPress={() => {
            if (auth.data._id !== userInfo.user._id) {
              props.navigation.navigate('User', { userId: userInfo.user._id });
            } else {
              return null;
            }
          }}
        >
          <View style={{ flex: 0.15 }}>
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
          </View>
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
              <View>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17, marginBottom: 10 }}>
                  {userInfo.launcher ? '🚀' : ''}&nbsp;{userInfo.user.name}
                </Text>
                {renderActionButtons(userInfo)}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      // nullのuserは表示しない。
      return null;
    }
  };

  const renderMembers = () => {
    if (!fetchedAttended.length) {
      return <Text style={{ color: baseTextColor }}>You'll see all those who joined this meetup.</Text>;
    } else {
      return (
        <FlatList
          data={fetchedAttended}
          renderItem={({ item }) => renderUser(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    }
  };

  return (
    <AttendedContext.Provider
      value={{
        launcherId: props.route.params.launcherId,
        navigation: props.navigation,
        selectedUser,
        setSelectedUser,
        actionButtonBottomSheetRef,
        myFriends,
        setMyFriends,
        isSupportingLauncher,
        setIsSupportingLauncher,
        isFollowingLauncher,
        setIsFollowingLauncher,
      }}
    >
      <View
        style={{ backgroundColor: baseBackgroundColor, flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}
      >
        {isFetchedAttended ? renderMembers() : <ActivityIndicator />}
        <ActionButtonBottomSheet />
      </View>
    </AttendedContext.Provider>
  );
};

export default AttendedContainer;
