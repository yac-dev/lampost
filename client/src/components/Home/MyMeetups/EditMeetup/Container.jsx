import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import EditMeetupContext from './EditMeetupContext';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import Venue from './Venue';
import DateAndTime from './DateAndTime';
import LoadingSpinner from '../../../Utils/LoadingSpinner';
import SnackBar from '../../../Utils/SnackBar';
import HomeNavigatorContext from '../../../Navigator/Home/HomeNavigatorContext';

const Container = (props) => {
  const { auth, setLoading, setMyUpcomingMeetups } = useContext(GlobalContext);
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
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
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

  const onDonePress = async () => {
    //editingdataがtrueのものだけ取ってこようか。まずは。
    const payload = { venue: null, startDateAndTime: null, duration: null };
    for (const key in editingData) {
      if (editingData[key].isEdited) {
        payload[key] = editingData[key].data;
      }
    }
    console.log(payload); // これで、updateされたdataだけを送れる。
    setLoading(true);
    const result = await lampostAPI.patch(`/meetups/${meetup._id}`, payload);
    setLoading(false);
    setMyUpcomingMeetups((previous) => {
      const updating = { ...previous };
      if (payload.startDateAndTime) {
        updating[meetup._id].startDateAndTime = payload.startDateAndTime;
      }
      return updating;
    });
    topLevelHomeNavigation.goBack();
  };

  const getMeetup = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/selected`);
    const { meetup } = result.data;
    setMeetup(meetup);
  };
  // console.log(meetup);

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
        <Text style={{ color: 'white' }}>The update will be sent directly to the lounge chat 📨</Text>
        <LoadingSpinner />
        <SnackBar />
      </View>
    </EditMeetupContext.Provider>
  );
};

export default Container;
