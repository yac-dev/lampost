import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import LaunchedMeetupContext from './LaunchedMeetup';
import { baseBackgroundColor, baseTextColor, inputBackgroundColor } from '../../../../utils/colorsTable';
import MeetupBlogPostBody from '../../../Utils/MeetupBlogPostBody';
import Impressions from './Impressions';
import Crew from './Crew';
import lampostAPI from '../../../../apis/lampost';

const Container = (props) => {
  console.log(props.route.params.launchedMeetup);
  const [component, setComponent] = useState('Impressions');
  const [attendees, setAttendees] = useState([]);
  const [impressions, setImpressions] = useState([]);

  const getLaunchedMeetupDetailByMeetupIdId = async () => {
    const result = await lampostAPI.get(
      `/pastmeetupanduserrelationships/${props.route.params.launchedMeetup.relationship}`
    );
    const { attendees, impressions } = result.data;
    setAttendees(attendees);
    setImpressions(impressions);
  };

  useEffect(() => {
    getLaunchedMeetupDetailByMeetupIdId();
  }, []);

  const switchList = () => {
    switch (component) {
      case 'Impressions':
        return <Impressions />;
      case 'Crew':
        return <Crew />;
      default:
        return null;
    }
  };

  return (
    <LaunchedMeetupContext.Provider value={{ impressions, setImpressions, attendees }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
        <MeetupBlogPostBody meetup={props.route.params.launchedMeetup} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: component === 'Impressions' ? 1 : null,
              borderBottomColor: 'white',
            }}
            onPress={() => setComponent('Impressions')}
          >
            <Text style={{ color: baseTextColor }}>Impressions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: component === 'Crew' ? 1 : null, borderBottomColor: 'white' }}
            onPress={() => setComponent('Crew')}
          >
            <Text style={{ color: baseTextColor }}>Crew</Text>
          </TouchableOpacity>
        </View>
        {switchList()}
      </View>
    </LaunchedMeetupContext.Provider>
  );
};

export default Container;
