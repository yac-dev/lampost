import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {
  baseBackgroundColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  inputBackgroundColorNew,
  baseTextColor,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;
import lampostAPI from '../../apis/lampost';

const Report = (props) => {
  const reportIssueOptions = {
    mlm: {
      label: 'mlm',
      reason: 'Multi-level marketing',
    },
    scam: {
      label: 'scam',
      reason: 'Scam or fraud',
    },
    bullying: {
      label: 'bullying',
      reason: 'Bullying or harassment',
    },
    racism: {
      label: 'racism',
      reason: 'Racism',
    },
    spam: {
      label: 'spam',
      reason: 'Spam',
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
  };

  const inputAccessoryViewID = 'REPORT';
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [description, setDescription] = useState('');
  const [selectedIssue, setSelectedIssue] = useState({});

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const onDonePress = () => {
    props.navigation.goBack();
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your report has been sent to developer.',
      duration: 5000,
    });
  };

  const renderReportIssueOptions = () => {
    const list = Object.values(reportIssueOptions).map((reportIssue, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
          onPress={() => setSelectedIssue(reportIssue)}
        >
          <Text style={{ color: baseTextColor, marginRight: 15 }}>{reportIssue.reason}</Text>
          {reportIssue.label === selectedIssue.label ? (
            <MaterialCommunityIcons name='check-circle' color={iconColorsTable['green1']} size={15} />
          ) : null}
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView
        style={{ marginBottom: 30, backgroundColor: screenSectionBackgroundColor, borderRadius: 10, height: 200 }}
      >
        {list}
      </ScrollView>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={70}
      style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}
      // contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        What's wrong with {props.route.params.report}?
      </Text>
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>Please choose a issue option down below.</Text>
      {renderReportIssueOptions()}
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>Please write about the problem specifically.</Text>
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        placeholderTextColor={baseTextColor}
        style={{
          backgroundColor: inputBackgroundColorNew,
          borderRadius: 7,
          padding: 10,
          marginBottom: 10,
          height: 100,
          color: baseTextColor,
        }}
        multiline={true}
        value={description}
        onChangeText={setDescription}
        autoCapitalize='none'
      />
    </KeyboardAvoidingView>
  );
};

export default Report;
