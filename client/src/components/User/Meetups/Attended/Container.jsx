import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import {
  baseTextColor,
  baseBackgroundColor,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
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
    const { friendObjects } = result.data;
    console.log(friendObjects);
    setMyFriends((previous) => {
      const table = {};
      friendObjects.forEach((friendObject) => {
        table[friendObject.user._id] = friendObject.user;
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
    const result = await lampostAPI.get(
      `/followrelationships/followee/${props.route.params.launcherId}/follower/${auth.data._id}`
    );
    const { isFollowing } = result.data;
    setIsFollowingLauncher(isFollowing);
  };
  useEffect(() => {
    getMyFriends();
    getIsFollowing();
  }, []);

  const addFriend = async (user) => {
    const payload = {
      friendId: user._id,
      launcherId: props.route.params.launcherId,
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
  };

  // const renderActionButtons = (user) => {
  //   // if (auth.data._id !== user._id) {
  //   // can't clap myself
  //   if (user._id === auth.data._id) {
  //     return null;
  //   } else {
  //     if (user._id === props.route.params.launcherId) {
  //       return (
  //         <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
  //           <TouchableOpacity
  //             style={{
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               backgroundColor: 'rgb(84, 84, 84)',
  //               borderRadius: 5,
  //               padding: 5,
  //               marginRight: 10,
  //             }}
  //             disabled={true}
  //           >
  //             <MaterialCommunityIcons name='hand-heart' size={22} color='white' style={{ marginRight: 5 }} />
  //             <Text style={{ color: 'white' }}>Give a tip</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={{
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               backgroundColor: iconColorsTable['blue1'],
  //               borderRadius: 5,
  //               padding: 5,
  //               marginRight: 10,
  //             }}
  //             onPress={() => {
  //               addFriend(user);
  //             }}
  //           >
  //             <MaterialCommunityIcons
  //               name='human-greeting-variant'
  //               size={22}
  //               color='white'
  //               style={{ marginRight: 5 }}
  //             />
  //             <Text style={{ color: 'white' }}>Be my friend</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={{
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               backgroundColor: iconColorsTable['blue1'],
  //               borderRadius: 5,
  //               padding: 5,
  //             }}
  //             onPress={() => {
  //               props.navigation.navigate('Clap friend', { userId: user._id, launcherId: props.route.params.launcherId });
  //             }}
  //           >
  //             <MaterialCommunityIcons name='hand-clap' size={22} color='white' style={{ marginRight: 5 }} />
  //             <Text style={{ color: 'white' }}>Clap</Text>
  //           </TouchableOpacity>
  //         </ScrollView>
  //       );
  //     } else {
  //       if (myFriends[user._id]) {
  //         return (
  //           <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 backgroundColor: iconColorsTable['green1'],
  //                 borderRadius: 5,
  //                 padding: 5,
  //               }}
  //             >
  //               <MaterialCommunityIcons name='check' size={22} color='white' style={{ marginRight: 5 }} />
  //               <Text style={{ color: 'white' }}>Already my friend</Text>
  //             </View>
  //             <TouchableOpacity
  //               style={{
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 backgroundColor: iconColorsTable['blue1'],
  //                 borderRadius: 5,
  //                 padding: 5,
  //               }}
  //               onPress={() => {
  //                 props.navigation.navigate('Clap friend', {
  //                   userId: user._id,
  //                   launcherId: props.route.params.launcherId,
  //                 });
  //               }}
  //             >
  //               <MaterialCommunityIcons
  //                 name='human-greeting-variant'
  //                 size={22}
  //                 color='white'
  //                 style={{ marginRight: 5 }}
  //               />
  //               <Text style={{ color: 'white' }}>Clap</Text>
  //             </TouchableOpacity>
  //           </ScrollView>
  //         );
  //       } else {
  //         return (
  //           <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
  //             <TouchableOpacity
  //               style={{
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 backgroundColor: iconColorsTable['blue1'],
  //                 borderRadius: 5,
  //                 padding: 5,
  //                 marginRight: 10,
  //               }}
  //               onPress={() => {
  //                 addFriend(user);
  //               }}
  //             >
  //               <MaterialCommunityIcons
  //                 name='human-greeting-variant'
  //                 size={22}
  //                 color='white'
  //                 style={{ marginRight: 5 }}
  //               />
  //               <Text style={{ color: 'white' }}>Be my friend</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={{
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 backgroundColor: iconColorsTable['blue1'],
  //                 borderRadius: 5,
  //                 padding: 5,
  //               }}
  //               onPress={() => {
  //                 props.navigation.navigate('Clap friend', {
  //                   userId: user._id,
  //                   launcherId: props.route.params.launcherId,
  //                 });
  //               }}
  //             >
  //               <MaterialCommunityIcons name='hand-clap' size={22} color='white' style={{ marginRight: 5 }} />
  //               <Text style={{ color: 'white' }}>Clap</Text>
  //             </TouchableOpacity>
  //           </ScrollView>
  //         );
  //       }
  //     }
  //   }
  //   // }
  // };

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
              <UserInfo
                user={item.user}
                onUserNamePress={onUserNamePress}
                subInfo={
                  props.route.params.launcherId === item.user._id ? (
                    <Text style={{ color: baseTextColor }}>🚀 Launcher</Text>
                  ) : null
                }
                actionButton={
                  // 自分の場所には、action buttonを表示しない。
                  item.user._id !== auth.data._id ? (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: iconColorsTable['blue1'],
                      }}
                      onPress={() => {
                        actionButtonBottomSheetRef.current.snapToIndex(0);
                        setSelectedUser(item.user);
                      }}
                    >
                      <MaterialCommunityIcons
                        name='chevron-down'
                        color={'white'}
                        size={25}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={{ color: 'white', marginRight: 5 }}>Connect</Text>
                    </TouchableOpacity>
                  ) : null
                }
              />
            )}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        </View>
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
        {isFetchedAttended ? renderAttended() : <ActivityIndicator />}
        <ActionButtonBottomSheet />
      </View>
    </AttendedContext.Provider>
  );
};

export default AttendedContainer;
