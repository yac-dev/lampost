import React, { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
import Title from './Title';
import Venue from './Venue';

import { baseBackgroundColor } from '../../../utils/colorsTable';

const Container = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    title: '',
    place: '',
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
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <Title />
        <Venue />
      </View>
    </FormContext.Provider>
  );
};

export default Container;
