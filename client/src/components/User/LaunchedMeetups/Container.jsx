import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LaunchedContext from './LaunchedContext';
import {
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  screenBorderBottomColor,
} from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../Utils/ActionButton';
import MeetupBlogPostBody from '../../Utils/MeetupBlogPostBody';
import DateAndYear from '../../Utils/DateAndYear';
import BadgeLabel from '../../Utils/BadgeLabel';
import TappedLaunchedMeetupBottomSheet from './TappedLaunchedMeetup';

const Container = (props) => {
  const [user, setUser] = useState(props.route.params.user);
  const [isMyPage, setIsMyPage] = useState(false);
  const [isLaunchedMeetupsDataFetched, setIsLaunchedMeetupsDataFetched] = useState(false);
  const [launchedMeetups, setLaunchedMeetups] = useState([]);

  const getLaunchedMeetupsByLauncherId = async () => {
    const result = await lampostAPI.get(
      `/pastmeetupanduserrelationships/launchedmeetups/${props.route.params.user._id}`
    );
    const { launchedMeetups } = result.data;
    setLaunchedMeetups(launchedMeetups);
    setIsLaunchedMeetupsDataFetched(true);
  };
  useEffect(() => {
    getLaunchedMeetupsByLauncherId();
  }, []);

  const renderAddRepresentationButton = (representation) => {
    if (isMyPage && representation) {
      return (
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <ActionButton
            label={'Add representation'}
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='rocket-launch' size={25} color='white' style={{ marginRight: 5 }} />}
            onActionButtonPress={() => {}}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  // const renderDate = (date) => {
  //   const d = new Date(date).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   });
  //   const dateElements = d.split(',').join('').split(' ');
  //   return (
  //     <View
  //       style={{
  //         width: 80,
  //         height: 50,
  //         borderRadius: 10,
  //         borderWidth: 0.3,
  //         marginRight: 15,
  //         borderColor: screenSectionBackgroundColor,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         backgroundColor: screenSectionBackgroundColor,
  //       }}
  //     >
  //       <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[2]}</Text>
  //       <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
  //         {dateElements[0]}&nbsp;{dateElements[1]}
  //       </Text>
  //     </View>
  //   );
  // };

  const renderBadgeLabels = (badges) => {
    const list = badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return <ScrollView horizontal={true}>{list}</ScrollView>;
  };

  const renderLaunchedMeetups = () => {
    if (launchedMeetups.length) {
      const list = launchedMeetups.map((launchedMeetup, index) => {
        return (
          <TouchableOpacity
            style={{ borderBottomWidth: 0.3, borderBottomColor: screenBorderBottomColor, padding: 20 }}
            onPress={() => props.navigation.navigate('Launched meetup', { launchedMeetup })}
          >
            <MeetupBlogPostBody meetup={launchedMeetup} />
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <MaterialIcons name='groups' size={25} color='white' style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Crew&nbsp;{launchedMeetup.totalAttendees}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='ios-chatbubble-sharp' size={25} color='white' style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Impressions&nbsp;{launchedMeetup.totalImpressions}</Text>
              </View>
            </View>
          </TouchableOpacity>
          // <TouchableOpacity
          //   key={index}
          //   style={{ borderBottomWidth: 0.3, borderBottomColor: screenBorderBottomColor, padding: 20 }}
          //   onPress={() => {
          //     props.navigation.navigate('Launched meetup', { launchedMeetup });
          //   }}
          // >
          //   <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          //     {/* {renderDate(launchedMeetupObject.meetup.startDateAndTime)} */}
          //     <DateAndYear date={launchedMeetup.startDateAndTime} />
          //     <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', flexShrink: 1 }}>
          //       {launchedMeetup.title}
          //     </Text>
          //   </View>
          //   <View style={{ marginBottom: 15 }}>{renderBadgeLabels(launchedMeetup.badges)}</View>
          //   <View style={{ marginBottom: 10 }}>
          //     {launchedMeetup.representation ? (
          //       <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', marginBottom: 15 }}>
          //         {launchedMeetup.representation}
          //       </Text>
          //     ) : (
          //       <Text style={{ color: baseTextColor }}>You'll see the launcher's comment here.</Text>
          //     )}
          //     <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          //       <Ionicons name='ios-remove-outline' size={25} color={'white'} style={{ marginRight: 5 }} />
          //       {/* <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'red', marginRight: 10 }}></View> */}
          //       <Text style={{ color: 'white', fontSize: 15 }}>{launchedMeetup.launcher.name}</Text>
          //     </View>
          //     {renderAddRepresentationButton(launchedMeetup.representation)}
          //   </View>
          //   <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
          //     <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          //       <MaterialIcons name='groups' size={25} color='white' style={{ marginRight: 5 }} />
          //       <Text style={{ color: 'white' }}>Crew&nbsp;{launchedMeetup.totalAttendees}</Text>
          //     </View>
          //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          //       <Ionicons name='ios-chatbubble-sharp' size={25} color='white' style={{ marginRight: 5 }} />
          //       <Text style={{ color: 'white' }}>Impressions&nbsp;{launchedMeetup.totalImpressions}</Text>
          //     </View>
          //   </View>
          // </TouchableOpacity>
        );
      });
      return <View>{list}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>Now loading...</Text>;
    }
  };

  return (
    <LaunchedContext.Provider value={{ navigation: props.navigation }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderLaunchedMeetups()}</View>
    </LaunchedContext.Provider>
  );
};

export default Container;
