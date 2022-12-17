import React, { useContext } from 'react';
import MapContext from '../../../MeetupContext';
import { View, Text, InputAccessoryView, TouchableOpacity, Keyboard } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, sectionBackgroundColor, inputBackgroundColor } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';

const Reference = (props) => {
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const inputAccessoryViewID = 'LINK_INPUT';
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, flexShrink: 1, marginBottom: 10 }}>
        Please paste the link of location info or attachment if you have.
      </Text>
      <BottomSheetTextInput
        style={{ backgroundColor: inputBackgroundColor, padding: 10, borderRadius: 5, color: baseTextColor }}
        placeholder='URL'
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={inputAccessoryViewID}
        value={props.state.link}
        onChangeText={(text) => props.dispatch({ type: 'SET_LINK', payload: text })}
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
    </View>
  );
};

export default Reference;
