import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  InputAccessoryView,
  Keyboard,
} from 'react-native';
import GlobalContext from '../../GlobalContext';
import lampostAPI from '../../apis/lampost';
import {
  baseBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  iconColorsTable,
  inputBackgroundColor,
  sectionBackgroundColor,
} from '../../utils/colorsTable';
import ActionButton from '../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ReportLibrary = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const inputAccessoryViewID = 'REPORT_LIBRARY';
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
  const [description, setDescription] = useState('');
  const [selectedIssue, setSelectedIssue] = useState({});
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

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

  const onSubmitPress = async () => {
    // ここでapiを送ろう。
    const payload = {
      libraryId: props.route.params.libraryId,
      userId: auth.data._id,
      issue: selectedIssue,
      description,
    };
    setLoading(true);
    const result = await lampostAPI.post('/reports/library', payload);
    console.log(payload);
    setLoading(false);
    setSelectedIssue({});
    setDescription('');
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Thanks for your submission.',
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
      <ScrollView>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
          Reporting "{props.route.params.libraryName}"
        </Text>
        <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 17 }}>
          What kind of issue with this library?
        </Text>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>
          Please choose a issue option down below. Your report will be sent only to developer.
        </Text>
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
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
        >
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
              onSubmitPress();
            }}
            isDisabled={isDisabledSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReportLibrary;
