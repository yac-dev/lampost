import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import {
  iconColorsTable,
  baseBackgroundColor,
  baseTextColor,
  backgroundColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import BadgeLabel from '../../Utils/BadgeLabel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ActivitiesContainer = (props) => {
  const [userMeetups, setUserMeetups] = useState([]);
  const [fetchedUserMeetups, setFetchedUserMeetups] = useState(true);

  const getUserMeetups = async () => {
    setFetchedUserMeetups(true);
    const result = await lampostAPI.get(`/meetupanduserrelationships/user/${props.route.params.userId}`);
    const { userMeetups } = result.data;
    setUserMeetups(userMeetups);
    setFetchedUserMeetups(false);
  };

  useEffect(() => {
    getUserMeetups();
  }, []);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          // padding: 10,
          borderRadius: 7,
          marginRight: 15,
          backgroundColor: screenSectionBackgroundColor,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
        <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{dateElements[3]}</Text>
      </View>
    );
  };

  // const renderBadges = (meetup) => {
  //   const badgesList = meetup.badges.map((badge, index) => {
  //     return <BadgeLabel key={index} badge={badge} />;
  //   });

  //   return <View style={{ flexDirection: 'row', marginBottom: 10 }}>{badgesList}</View>;
  // };

  const renderMeetups = () => {
    if (!userMeetups.length) {
      return (
        <Text style={{ color: baseTextColor, textAlign: 'center', paddingTop: 20 }}>
          You'll see all the meetup this user joined.
        </Text>
      );
    } else {
      const list = userMeetups.map((meetup, index) => {
        return (
          <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }} key={index}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              {renderDate(meetup.startDateAndTime)}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white' }}>
                  {meetup.title}
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: 'row', padding: 10 }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
                onPress={() =>
                  props.navigation.navigate('Attended', { meetupId: meetup._id, launcher: meetup.launcher._id })
                }
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['orange1'],
                    borderRadius: 10,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons name='account-group' size={20} color={iconColorsTable['orange1']} />
                </View>
                <View>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Attended</Text>
                  <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                    {meetup.totalAttendees}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['lightGreen1'],
                    borderRadius: 10,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='camera' size={20} color={iconColorsTable['lightGreen1']} />
                </View>
                <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Assets</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: backgroundColorsTable['lightBlue1'],
                    borderRadius: 10,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='chatbubbles' size={20} color={iconColorsTable['lightBlue1']} />
                </View>
                <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Impressions</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
      });

      return <View>{list}</View>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {fetchedUserMeetups ? <ActivityIndicator /> : renderMeetups()}
    </View>
  );
};

export default ActivitiesContainer;
