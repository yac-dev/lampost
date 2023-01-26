import React from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import { Menu, Switch, TextInput } from 'react-native-paper';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, inputBackgroundColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';

const AttendeesLimit = (props) => {
  const inputAccessoryViewID = 'ATTENDEES_LIMIT_INPUT';

  const renderSwitchState = () => {
    if (props.state.isMeetupAttendeesLimitFree) {
      return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>It's free.</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>It's not free.</Text>;
    }
  };

  console.log(props.state.meetupAttendeesLimit);

  const renderAttendeesLimitForm = () => {
    if (!props.state.isMeetupAttendeesLimitFree) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          {/* <TextInput
            style={{ width: 200, marginLeft: 10, color: baseTextColor }}
            mode='outlined'
            label='How many people?'
            value={props.state.fee}
            onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_FEE', payload: text })}
          /> */}
          <BottomSheetTextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColor,
              color: baseTextColor,
              borderRadius: 5,
            }}
            keyboardType='numeric'
            // maxLength={999} //setting limit of input
            placeholder='Please type the attendees limit'
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            value={props.state.meetupAttendeesLimit}
            onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_ATTENDEES_LIMIT', payload: text })}
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
                  // launchMeetupBottomSheetRef.current.snapToIndex(0);
                }}
              >
                <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
        How many people can join this meetup?
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Switch
          value={props.state.isMeetupAttendeesLimitFree}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE', payload: '' })}
          style={{ marginRight: 10 }}
        />
        {renderSwitchState()}
      </View>
      {renderAttendeesLimitForm()}
    </View>
  );
};

export default AttendeesLimit;
