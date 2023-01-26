import React from 'react';
import { View, Text, InputAccessoryView, TouchableOpacity, Keyboard } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Menu, Switch, Button } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons';
import { baseTextColor, inputBackgroundColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';

const currencyOptions = ['$USD', '£GBP', '€EUR', '¥JPY', '$CAD'];

const MeetupFee = (props) => {
  const inputAccessoryViewID = 'FEE_INPUT';

  const renderSwitchState = () => {
    if (props.state.isMeetupFeeFree) {
      return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>Yes</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>No</Text>;
    }
  };

  const renderFeeForm = () => {
    if (!props.state.isMeetupFeeFree) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
              backgroundColor: inputBackgroundColor,
              borderRadius: 10,
            }}
          >
            <Fontisto name='dollar' size={15} color={baseTextColor} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <BottomSheetTextInput
              style={{
                flex: 1,
                padding: 10,
                color: baseTextColor,
                borderRadius: 5,
              }}
              keyboardType='numeric'
              placeholder='Please type how much it is'
              placeholderTextColor={baseTextColor}
              inputAccessoryViewID={inputAccessoryViewID}
              value={props.state.meetupFee}
              onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_FEE', payload: text })}
              autoCapitalize='none'
            />
            <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={sectionBackgroundColor}>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                >
                  <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </InputAccessoryView>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
        Is this meetup free to join?
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Switch
          value={props.state.isMeetupFeeFree}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_FEE_FREE', payload: '' })}
          style={{ marginRight: 10 }}
        />
        {renderSwitchState()}
      </View>
      {renderFeeForm()}
    </View>
  );
};

export default MeetupFee;
