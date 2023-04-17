import React, { useEffect, useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
import lampostAPI from '../../../apis/lampost';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import Title from './Title';
import Venue from './Venue';
import Badges from './Badges';
import DateAndTime from './DateAndTime';
import Member from './Member';
import Fee from './Fee';
import Description from './Description';
import Link from './Link';

import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';

const Container = (props) => {
  const { auth, setAuth, setLoading, setMyUpcomingMeetups } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    title: '',
    place: null,
    meetupPoint: '',
    badges: {},
    startDateAndTime: '',
    duration: '',
    agenda: [],
    isAttendeesLimitFree: '', // should be boolean
    attendeesLimit: '', // should be number
    isFeeFree: '', // shoukd be boolean
    fee: '', // should be number
    feeDatail: '',
    description: '',
    link: '',
  });
  const [stageCleared, setStageCleared] = useState({
    title: false,
    venue: false,
    badges: false,
    dateAndTime: false,
    member: false,
    fee: false,
    description: false,
    link: false,
  });
  const [accordion, setAccordion] = useState({
    title: true,
    venue: false,
    badges: false,
    dateAndTime: false,
    member: false,
    fee: false,
    description: false,
    link: false,
  });

  // const onDonePress = async () => {
  //   const payload = {
  //     title: formData.title,
  //     badgeIds: Object.keys(formData.badges),
  //     assetType: formData.assetType,
  //     isReactionAvailable: formData.isReactionAvailable,
  //     reactions: formData.reactions,
  //     isCommentAvailable: formData.isCommentAvailable,
  //     asset: {
  //       _id: formData.asset._id,
  //       data: formData.asset.data,
  //       type: formData.asset.type,
  //     },
  //     launcher: {
  //       _id: auth.data._id,
  //       name: auth.data.name,
  //       photo: auth.data.photo,
  //     },
  //     description: formData.description,
  //   };
  //   setLoading(true);
  //   const result = await lampostAPI.post(`/libraries`, payload);
  //   setLoading(false);
  //   // これをもって、navigation でlibrariesに行く。
  //   const { library } = result.data;
  //   props.navigation.navigate('Libraries', { fromComponent: 'Create new library', library });
  // };

  // setSnackBar({
  //   isVisible: true,
  //   message: 'Launched a meetup.',
  //   barType: 'success',
  //   duration: 5000,
  // });

  const onDonePress = async () => {
    setLoading(true);
    const payload = {
      launcher: auth.data._id,
      title: formData.title,
      place: formData.place,
      badges: Object.values(formData.badges),
      startDateAndTime: formData.startDateAndTime,
      // agenda: formData.agenda,
      duration: formData.duration,
      isAttendeesLimitFree: formData.isAttendeesLimitFree,
      attendeesLimit: formData.attendeesLimit,
      // meetupPointDetail: formData.meetupPointDetail,
      isFeeFree: formData.isFeeFree,
      fee: formData.fee,
      // feeDatail: formData.feeDatail,
      description: formData.description,
      link: formData.link,
    };
    console.log(payload);
    const result = await lampostAPI.post('/meetups', payload);
    const { meetup, viewedChatsLastTime, launcher } = result.data;
    setAuth((previous) => {
      return {
        ...previous,
        data: {
          ...previous.data,
          upcomingMeetups: [meetup._id],
        },
      };
    });
    setMyUpcomingMeetups((previous) => {
      return {
        ...previous,
        [meetup._id]: {
          _id: meetup._id,
          title: meetup.title,
          startDateAndTime: meetup.startDateAndTime,
          launcher: launcher,
          state: meetup.state,
          unreadChatsTable: {
            general: 0,
            reply: 0,
            question: 0,
            help: 0,
            edited: 0,
          },
        },
      };
    });
    const reault2 = await lampostAPI.post('/launcherandpatronrelationships/patronnotification', {
      launcher: {
        _id: auth.data._id,
        name: auth.data.name,
      },
      description: formData.description,
    });
    setLoading(false);
    props.navigation.navigate('Map', { launchedMeetup: true });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={
            stageCleared.title &&
            stageCleared.venue &&
            stageCleared.badges &&
            // stageCleared.trust &&
            stageCleared.dateAndTime &&
            stageCleared.member &&
            stageCleared.fee &&
            stageCleared.description
              ? false
              : true
          }
        >
          <Text
            style={{
              color:
                stageCleared.title &&
                stageCleared.venue &&
                stageCleared.badges &&
                // stageCleared.trust &&
                stageCleared.dateAndTime &&
                stageCleared.member &&
                stageCleared.fee &&
                stageCleared.description
                  ? 'white'
                  : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [stageCleared]);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        accordion,
        setAccordion,
        stageCleared,
        setStageCleared,
        navigation: props.navigation,
        route: props.route,
      }}
    >
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <ScrollView>
          <Title />
          <Venue />
          <Badges />
          <DateAndTime />
          <Member />
          <Fee />
          <Description />
          <Link />
          <LoadingSpinner />
        </ScrollView>
      </KeyboardAvoidingView>
    </FormContext.Provider>
  );
};

export default Container;
