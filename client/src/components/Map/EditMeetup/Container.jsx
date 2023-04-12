import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EditMeetupContext from './EditMeetupContext';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import Venue from './Venue';
import DateAndTime from './DateAndTime';

const Container = (props) => {
  const [meetup, setMeetup] = useState(null);
  const [accordion, setAccordion] = useState({
    venue: false,
    badges: false,
    dateAndTime: false,
    description: false,
  });
  const [stageCleared, setStageCleared] = useState({
    venue: false,
    dateAndTime: false,
  });
  const [editingData, setEditingData] = useState({
    venue: { isEdited: false, data: null }, // isEditedの時点で、値は違うものになっている。だからいいか。
    startDateAndTime: { isEdited: false, data: '' },
    duration: { isEdited: false, data: '' },
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => console.log('Done')}
          disabled={stageCleared.venue || stageCleared.dateAndTime ? false : true}
        >
          <Text
            style={{
              color: stageCleared.venue || stageCleared.dateAndTime ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [editingData, stageCleared]);

  const getMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/selected`);
    const { meetup } = result.data;
    setMeetup(meetup);
  };
  console.log(meetup);

  useEffect(() => {
    getMeetup();
  }, []);

  return (
    <EditMeetupContext.Provider
      value={{
        stageCleared,
        setStageCleared,
        accordion,
        setAccordion,
        navigation: props.navigation,
        route: props.route,
        meetup,
        setMeetup,
        editingData,
        setEditingData,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <Venue />
        <DateAndTime />
        <Text style={{ color: 'white' }}>The update will be sent directly to the lounge chat📨</Text>
      </View>
    </EditMeetupContext.Provider>
  );
};

export default Container;
