import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  InputAccessoryView,
} from 'react-native';
import {
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  inputBackgroundColor,
  sectionBackgroundColor,
} from '../../utils/colorsTable';
import lampostAPI from '../../apis/lampost';
import ActionButton from './ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Report = (props) => {
  const inputAccessoryViewID = 'REPORT';
  const [reportIssueOptions, setReportIssueOptions] = useState({
    mlm: {
      label: 'mlm',
      reason: "It's multi-level marketing",
    },
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
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (Object.keys(selectedIssue).length !== 0) {
      if (!description.length) {
        setIsDisabledSubmit(true);
      } else {
        setIsDisabledSubmit(false);
      }
    } else {
      setIsDisabledSubmit(true);
    }
  }, [selectedIssue, description]);

  // const onSubmitPress = async () => {
  //   // ここでapiを送ろう。
  //   const payload = {
  //     meetupId: props.route.params.meetupId,
  //     userId: auth.data._id,
  //     reportedUserId: props.route.params.userId,
  //     issue: selectedIssue,
  //     description,
  //   };
  //   setLoading(true);
  //   const result = await lampostAPI.post('/reports/meetupmember', payload);
  //   console.log(payload);
  //   setLoading(false);
  //   setSelectedIssue({});
  //   setDescription('');
  //   setSnackBar({
  //     isVisible: true,
  //     barType: 'success',
  //     message: 'Thanks for your submission.',
  //     duration: 5000,
  //   });
  // };

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
    >
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <MaterialIcons name='report-problem' color='white' size={25} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
            Reporting "{props.route.params.title}"
          </Text>
        </View>
        <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 17 }}>{props.issueHeader}</Text>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>{props.issueDescription}</Text>
        {renderReportIssueOptions()}
        <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Description</Text>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>
          Please write about the problem more specifically.
        </Text>
        <TextInput
          inputAccessoryViewID={inputAccessoryViewID}
          placeholderTextColor={baseTextColor}
          style={{
            backgroundColor: inputBackgroundColor,
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
        <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={sectionBackgroundColor}>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: iconColorsTable['blue1'], padding: 10, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
        <View style={{ alignSelf: 'center' }}>
          <ActionButton
            label='Submit'
            icon={<MaterialCommunityIcons name='check' size={25} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => {
              props.onSubmitPress();
            }}
            isDisabled={isDisabledSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Report;
