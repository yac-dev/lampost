import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { iconColorsTable, baseBackgroundColor, baseTextColor, backgroundColorsTable } from '../../utils/colorsTable';
import BadgeLabel from '../Utils/BadgeLabel';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Activities = (props) => {
  const [userMeetups, setUserMeetups] = useState([]);
  const [fetchedUserMeetups, setFetchedUserMeetups] = useState(true);

  const getUserMeetups = async () => {
    setFetchedUserMeetups(true);
    const result = await lampostAPI.get(`/meetupanduserrelationships/user/${props.route.params.userId}`);
    const { userMeetups } = result.data;
    setUserMeetups(userMeetups);
    setFetchedUserMeetups(false);
  };
  console.log(userMeetups);

  useEffect(() => {
    getUserMeetups();
  }, []);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: baseTextColor,
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderBadges = (meetup) => {
    const badgesList = meetup.badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return <View style={{ flexDirection: 'row', marginBottom: 10 }}>{badgesList}</View>;
  };

  const renderMeetups = () => {
    if (!userMeetups.length) {
      return <Text>There are no meetup logs yet.</Text>;
    } else {
      const list = userMeetups.map((meetup, index) => {
        return (
          <TouchableOpacity
            style={{ padding: 20 }}
            key={index}
            onPress={() => props.navigation.navigate('Activity', { meetupId: meetup._id })}
          >
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
            {renderBadges(meetup)}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name='account-group'
                color={baseTextColor}
                size={25}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: baseTextColor }}>{meetup.totalAttendees}</Text>
            </View>
          </TouchableOpacity>
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

export default Activities;
