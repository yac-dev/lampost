import React, { useContext } from 'react';
import MapContext from '../../../MeetupContext';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, sectionBackgroundColor, inputBackgroundColor } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';

const Description = (props) => {
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const inputAccessoryViewID = 'DESCRIPTION_INPUT';
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, flexShrink: 1, marginBottom: 10 }}>
          Please write a message to the attendees or more detail info.
        </Text>
        <Text style={{ fontSize: 13, color: baseTextColor }}>{props.state.description.length}/300</Text>
      </View>
      <BottomSheetTextInput
        style={{
          height: 100,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          padding: 10,
          color: baseTextColor,
        }}
        // label='Meetup title'
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
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
              launchMeetupBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
      {/* <Text style={{ padding: 10, fontWeight: 'bold' }}>{props.state.description.length}/300</Text> */}
    </View>
  );
};

export default Description;
