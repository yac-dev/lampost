import React, { useContext } from 'react';
import MapContext from '../../../MeetupContext';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, sectionBackgroundColor, inputBackgroundColor } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';

const Description = (props) => {
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const inputAccessoryViewID = 'DESCRIPTION_INPUT';

  const renderDescriptionLength = () => {
    if (props.state.description.length >= 501) {
      return <Text style={{ fontSize: 13, color: 'red' }}>OOPS! {props.state.description.length}/500</Text>;
    } else {
      return <Text style={{ fontSize: 13, color: baseTextColor }}>{props.state.description.length}/500</Text>;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, flexShrink: 1, marginBottom: 10 }}>
          Please write a message to the attendees or more detail info.
        </Text>
        {renderDescriptionLength()}
      </View>
      {/* <BottomSheetTextInput
        style={{
          // height: 100,
          flex: 1,
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
              // launchMeetupBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView> */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <BottomSheetTextInput
          style={{
            // height: 100,
            flex: 1,
            backgroundColor: inputBackgroundColor,
            borderRadius: 5,
            padding: 10,
            color: baseTextColor,
          }}
          multiline={true}
          scrollEnabled={false}
          inputAccessoryViewID={inputAccessoryViewID}
          value={props.state.description}
          onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
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

export default Description;
