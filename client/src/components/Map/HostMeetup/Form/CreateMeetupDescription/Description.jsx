import React from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Description = (props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: 'rgba(174, 101, 9, 0.85)',
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='message-text' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15 }}>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Media permission</Text> */}
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Message</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', flexWrap: 'wrap' }}>
            Please write a message to the attendees or more detailed description if you have.
          </Text>
        </View>
      </View>
      <BottomSheetTextInput
        style={{ height: 150, backgroundColor: '#E9E9E9' }}
        // label='Meetup title'
        multiline
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        // right={<TextInput.Affix text={`${props.state.description.length}/300`} />}
      />
    </View>
  );
};

export default Description;
