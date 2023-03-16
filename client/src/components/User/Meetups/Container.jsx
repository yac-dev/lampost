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

  // const renderMeetupDateAndTime = (date) => {
  //   const d = new Date(date).toLocaleDateString('en-US', {
  //     weekday: 'short',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });
  //   const dateElements = d.split(',').join('').split(' ');

  //   return (
  //     <View style={{ flexDirection: 'row' }}>
  //       {dateElements.map((element, index) => {
  //         return (
  //           <Text key={index} style={{ color: 'white' }}>
  //             {element}&nbsp;
  //           </Text>
  //         );
  //       })}
  //     </View>
  //   );
  // };

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View style={{ flexDirection: 'row' }}>
        {dateElements.map((element, index) => {
          return (
            <Text key={index} style={{ color: 'white' }}>
              {element}&nbsp;
            </Text>
          );
        })}
      </View>
    );
  };

  const renderBadges = (meetup) => {
    const badgesList = meetup.badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return (
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <ScrollView horizontal={true}>{badgesList}</ScrollView>
      </View>
    );
  };

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
          <View
            style={{
              padding: 10,
              backgroundColor: screenSectionBackgroundColor,
              borderRadius: 5,
            }}
            key={index}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                borderRadius: 5,
                marginBottom: 5,
              }}
            >
              <MaterialCommunityIcons name='history' color='white' size={20} style={{ marginRight: 5 }} />
              {renderDate(meetup.startDateAndTime)}
            </View>
            {renderBadges(meetup)}
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 10 }}>{meetup.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 5,
                  marginRight: 7,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() =>
                  props.navigation.navigate('Attended', { meetupId: meetup._id, launcher: meetup.launcher._id })
                }
              >
                <MaterialCommunityIcons name='account-group' size={20} color={'white'} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Members</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 5,
                  marginRight: 7,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() => props.navigation.navigate('Meetup assets', { meetupId: meetup._id })}
              >
                <Ionicons name='camera' size={20} color={'white'} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Assets</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 5,
                  marginRight: 7,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() =>
                  props.navigation.navigate('Impressions', { meetupId: meetup._id, launcher: meetup.launcher._id })
                }
              >
                <Ionicons name='chatbubbles' size={20} color={'white'} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Impressions</Text>
              </TouchableOpacity>
            </View>
            {/* <ScrollView
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
            </ScrollView> */}
          </View>
        );
      });

      return (
        <ScrollView>
          <View>{list}</View>
        </ScrollView>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      {fetchedUserMeetups ? <ActivityIndicator /> : renderMeetups()}
    </View>
  );
};

export default ActivitiesContainer;
