import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  iconColorsTable,
} from '../../utils/colorsTable';
import lampostAPI from '../../apis/lampost';
import ActionButton from '../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FlagUser = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [reportIssueOptions, setReportIssueOptions] = useState({
    spam: {
      label: 'spam',
      reason: "It's spam",
    },
    nudity: {
      label: 'nudity',
      reason: 'Nudity or sexual activity',
    },
    hateSpeech: {
      label: 'hateSpeech',
      reason: 'Hate speech or symbols',
    },
    falseInformation: {
      label: 'falseInformation',
      reason: 'False information',
    },
    bullying: {
      label: 'bullying',
      reason: 'Bullying or harassment',
    },
    scam: {
      label: 'scam',
      reason: 'Scam or fraud',
    },
    violence: {
      label: 'violence',
      reason: 'Violence or dangerous organizations',
    },
    intellectual: {
      label: 'intellectual',
      reason: 'Intellectual property violation',
    },
    sale: {
      label: 'sale',
      reason: 'Sale of illegal or regurated goods',
    },
    suicide: {
      label: 'suicide',
      reason: 'Suicide or self-injury',
    },
  });

  const [selectedIssue, setSelectedIssue] = useState({});
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  return (
    <ScrollView
      style={{ backgroundColor: baseBackgroundColor, flex: 1, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
        Are there any issues with "{props.route.params.name}"?
      </Text>
      <Text style={{ color: baseTextColor, marginBottom: 20 }}>
        Please select a reason why you are reporting this meetup. Your report is anonymous. Reported meetups are
        reviewed by a developer within 24 hours.
      </Text>
      <View style={{ alignSelf: 'center' }}>
        <ActionButton
          label='Submit'
          icon={<MaterialCommunityIcons name='check' size={25} color={'white'} />}
          backgroundColor={iconColorsTable['blue1']}
          onActionButtonPress={() => {
            console.log(selectedIssue, `user is ${auth.data._id}`, `meetup is ${props.route.params.meetupId}`);
            onSubmitPress();
          }}
          isDisabled={isDisabledSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default FlagUser;
