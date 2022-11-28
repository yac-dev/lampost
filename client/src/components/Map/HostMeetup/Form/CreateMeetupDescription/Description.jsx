import React from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { iconColorsTable, baseTextColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Description = (props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, flexShrink: 1, marginBottom: 10 }}>
          Please write a message to the attendees or more detailed description.
        </Text>
        <Text style={{ fontSize: 13, color: baseTextColor }}>{props.state.description.length}/300</Text>
      </View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['brown1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='message-text' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5, marginRight: 10 }}>Message</Text>
            <Text style={{ fontSize: 13, color: '#9E9E9E' }}>{props.state.description.length}/300</Text>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', flexShrink: 1 }}>
            Please write a message to the attendees or more detailed description if you have.
          </Text>
        </View>
      </View> */}
      <BottomSheetTextInput
        style={{ height: 100, backgroundColor: sectionBackgroundColor, borderRadius: 5, padding: 10 }}
        // label='Meetup title'
        multiline
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        autoCapitalize='none'
      />
      {/* <Text style={{ padding: 10, fontWeight: 'bold' }}>{props.state.description.length}/300</Text> */}
    </View>
  );
};

export default Description;
