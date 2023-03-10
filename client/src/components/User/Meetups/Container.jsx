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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                backgroundColor: screenSectionBackgroundColor,
                alignSelf: 'flex-start',
                borderRadius: 5,
                marginBottom: 15,
              }}
            >
              <MaterialCommunityIcons name='history' color='white' size={20} style={{ marginRight: 10 }} />
              {renderDate(meetup.startDateAndTime)}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white' }}>{meetup.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: backgroundColorsTable['grey1'],
                    borderRadius: 5,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    props.navigation.navigate('Attended', { meetupId: meetup._id, launcher: meetup.launcher._id })
                  }
                >
                  <MaterialCommunityIcons name='account-group' size={20} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: backgroundColorsTable['grey1'],
                    borderRadius: 5,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='camera' size={20} color={'white'} />
                </TouchableOpacity>
              </View>
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
