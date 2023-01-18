import React, { useContext } from 'react';
import MapContext from '../../../MeetupContext';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {
  iconColorsTable,
  baseTextColor,
  sectionBackgroundColor,
  inputBackgroundColor,
} from '../../../../../utils/colorsTable';

const Title = (props) => {
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const inputAccessoryViewID = 'TITLE_INPUT';
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginRight: 10 }}>
          Please write the meetup title.
        </Text>
        <Text style={{ fontSize: 13, color: baseTextColor }}>{props.state.title.length}/40</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <BottomSheetTextInput
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: inputBackgroundColor,
            color: baseTextColor,
            borderRadius: 5,
          }}
          inputAccessoryViewID={inputAccessoryViewID}
          value={props.state.title}
          onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_TITLE', payload: text })}
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
    </View>
  );
};

export default Title;
