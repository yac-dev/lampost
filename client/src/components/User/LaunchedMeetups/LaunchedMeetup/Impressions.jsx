import React, { useContext, useState, useRef } from 'react';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity, Image, ScrollView } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import LaunchedMeetupContext from './LaunchedMeetup';
import {
  baseTextColor,
  inputBackgroundColor,
  screenSectionBackgroundColor,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import { FontAwesome5 } from '@expo/vector-icons';
// import Date from '../../../Utils/Date';

const Impressions = () => {
  const { auth } = useContext(GlobalContext);
  const [impressionText, setImpressionText] = useState('');
  const { impressions, setImpressions, launchedMeetup } = useContext(LaunchedMeetupContext);
  const scrollViewRef = useRef();
  const inputAccessoryViewID = 'CREATE_IMPRESSION';

  const renderDate = (date) => {
    const dateString = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(94, 97, 103)' }}>{dateString}</Text>;
  };

  const renderImpressions = () => {
    if (impressions.length) {
      const list = impressions.map((impression, index) => {
        return (
          // <View key={index}>
          //   <Text>{impression.text}</Text>
          // </View>
          <View key={index} style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              {impression.user.photo ? (
                <Image source={{ uri: impression.user.photo }} style={{ width: 40, height: 40, borderRadius: 10 }} />
              ) : (
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    marginRight: 20,
                    backgroundColor: iconColorsTable['blue1'],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesome5 name='user-astronaut' size={20} color='white' />
                </TouchableOpacity>
              )}
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ color: baseTextColor, marginRight: 10, fontSize: 15 }}>{impression.user.name}</Text>
                  {renderDate(impression.createdAt)}
                </View>
                <Text style={{ fontSize: 15, marginBottom: 10, color: baseTextColor }}>{impression.text}</Text>
              </View>
            </View>
          </View>
        );
      });

      return <View>{list}</View>;
    } else {
      return <Text style={{ color: baseTextColor, textAlign: 'center' }}>You'll see all the attendees comments.</Text>;
    }
  };

  const onSendPress = async () => {
    const result = await lampostAPI.post(`/pastmeetupanduserrelationships/${launchedMeetup.relationship}`, {
      text: impressionText,
      user: { _id: auth.data._id, name: auth.data.name, photo: auth.data.photo },
    });
    const { impression } = result.data;
    // const impression = {
    //   text: impressionText,
    //   user: { name: auth.data.name, photo: auth.data.photo },
    //   createdAt: new Date(),
    // };
    setImpressions((previous) => [...previous, impression]);
    Keyboard.dismiss();
  };

  return (
    <View>
      <TextInput
        placeholder='Add an impressions'
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={inputAccessoryViewID}
        autoCapitalize='none'
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: inputBackgroundColor,
          marginBottom: 15,
          color: baseTextColor,
        }}
        value={impressionText}
        onChangeText={(text) => setImpressionText(text)}
      />
      <InputAccessoryView
        nativeID={inputAccessoryViewID}
        backgroundColor={screenSectionBackgroundColor}
        // style={{ paddingTop: 10, paddingBottom: 10 }}
      >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View></View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => onSendPress()}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </InputAccessoryView>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        contentContainerStyle={{ paddingBottom: 300 }}
      >
        {renderImpressions()}
      </ScrollView>
    </View>
  );
};

export default Impressions;
