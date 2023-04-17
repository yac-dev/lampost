import React, { useEffect, useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import Title from './Title';
import Venue from './Venue';
import Badges from './Badges';
import DateAndTime from './DateAndTime';
import Member from './Member';
import Fee from './Fee';
import Description from './Description';
import Link from './Link';

import { baseBackgroundColor } from '../../../utils/colorsTable';

const Container = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    title: '',
    place: null,
    meetupPoint: '',
    badges: {},
    startDateAndTime: '',
    duration: '',
    agenda: [],
    isAttendeesLimitFree: true,
    attendeesLimit: '',
    description: '',
    isFeeFree: true,
    fee: '',
    feeDetail: '',
    description: '',
    // link: '',
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
    title: false,
    venue: false,
    badges: false,
    dateAndTime: false,
    member: false,
    fee: false,
    description: false,
    link: false,
  });

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
