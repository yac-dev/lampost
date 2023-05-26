import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import {
  baseBackgroundColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';
import BadgeLabel from '../../Utils/BadgeLabel';
import { iconsTable } from '../../../utils/icons';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import FastImage from 'react-native-fast-image';
import FlagMenuBottomSheet from './FlagMenuBottomSheet';

const AttendeesContainer = (props) => {
  const { MaterialCommunityIcons, Ionicons, Feather } = iconsTable;
  const { auth, setSnackBar } = useContext(GlobalContext);
  const [isFetchedAttendees, setIsFetchedAttendees] = useState(false);
  const [fetchedAttendees, setFetchedAttendees] = useState([]);
  const flagMenuBottomSheetRef = useRef(null);
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  const getMeetupAttendees = async () => {
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}/users`);
    const { meetupAttendees } = result.data;
    setFetchedAttendees(meetupAttendees);
    setIsFetchedAttendees(true);
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
        topLevelHomeNavigation.navigate('Home user', { userId: user._id });
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    getMeetupAttendees();
  }, []);

  const renderTopBadges = (userInfo) => {
    const list = userInfo.user.topBadges.map((userBadge, index) => {
      if (userBadge.badge) {
        return <BadgeLabel key={index} badge={userBadge.badge} />;
      } else {
        return null;
      }
    });

    return (
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  const renderUserState = useCallback((userInfo) => {
    if (userInfo.launcher) {
      return <Text style={{ position: 'absolute', right: 5, bottom: 0 }}>🚀</Text>;
    } else {
      if (userInfo.rsvp) {
        return <Text style={{ position: 'absolute', right: 5, bottom: 0 }}>👍</Text>;
      } else {
        return null;
      }
    }
  }, []);

  const renderUser = (userInfo) => {
    if (userInfo.user) {
      return (
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <TouchableOpacity
            style={{ flex: 0.15 }}
            onPress={() => {
              if (auth.data._id !== userInfo.user._id) {
                topLevelHomeNavigation.navigate('Home user', { userId: userInfo.user._id });
              } else {
                return null;
              }
            }}
          >
            <View>
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
              {renderUserState(userInfo)}
            </View>
          </TouchableOpacity>

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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17 }}>{userInfo.user.name}</Text>
                  <TouchableOpacity onPress={() => flagMenuBottomSheetRef.current.snapToIndex(0)}>
                    <Feather name='more-horizontal' size={20} color={baseTextColor} />
                  </TouchableOpacity>
                </View>
                {renderTopBadges(userInfo)}
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
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
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      {!isFetchedAttendees ? <ActivityIndicator /> : renderMembers()}
      <FlagMenuBottomSheet
        flagMenuBottomSheetRef={flagMenuBottomSheetRef}
        topLevelHomeNavigation={topLevelHomeNavigation}
      />
    </View>
  );
};

export default AttendeesContainer;
