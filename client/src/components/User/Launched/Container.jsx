import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import ActionButton from '../../Utils/ActionButton';

// ios-remove-outline
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
          width: 80,
          height: 50,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: screenSectionBackgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: screenSectionBackgroundColor,
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderLaunchedMeetups = () => {
    if (launchedMeetups.length) {
      const list = launchedMeetups.map((launchedMeetupObject, index) => {
        return (
          <View key={index} style={{ borderBottomWidth: 0.3, borderBottomColor: screenBorderBottomColor, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              {renderDate(launchedMeetupObject.meetup.startDateAndTime)}
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', flexShrink: 1 }}>
                {launchedMeetupObject.meetup.title}
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 15 }}>
                {launchedMeetupObject.representation}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <Ionicons name='ios-remove-outline' size={25} color={'white'} style={{ marginRight: 5 }} />
                {/* <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'red', marginRight: 10 }}></View> */}
                <Text style={{ color: 'white', fontSize: 15 }}>{launchedMeetupObject.meetup.launcher.name}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
              <ActionButton
                label={`Crew ${launchedMeetupObject.meetup.attendees.length}`}
                backgroundColor={iconColorsTable['blue1']}
                icon={<MaterialIcons name='groups' size={25} color='white' style={{ marginRight: 5 }} />}
                onActionButtonPress={() => null}
              />
              <ActionButton
                label={`Impressions ${launchedMeetupObject.totalImpressions}`}
                backgroundColor={iconColorsTable['blue1']}
                icon={<Ionicons name='ios-chatbubble-sharp' size={25} color='white' style={{ marginRight: 5 }} />}
                onActionButtonPress={() => null}
              />
              {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <MaterialIcons name='groups' size={25} color='white' style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Joined</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='ios-chatbubble-sharp' size={25} color='white' style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Impressions</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        );
      });
      return <View>{list}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>Now loading...</Text>;
    }
  };

  return <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderLaunchedMeetups()}</View>;
};

export default Container;
