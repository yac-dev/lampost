import React from 'react';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable } from '../../../../utils/colorsTable';

const RollDescription = (props) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['orange1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <AntDesign name='edit' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15 }}>Description</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black', marginBottom: 10 }}>
        Please write the description in brief. 0/300
      </Text>
      <BottomSheetTextInput
        style={{ borderWidth: 0.3, height: 100, backgroundColor: '#E9E9E9', borderRadius: 5, padding: 10 }}
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_LIBRARY_DESCRIPTION', payload: text })}
        mode='outlined'
        autoCapitalize='none'
        multiline={true}
      />
      {/* <BottomSheetTextInput
        style={{ height: 100, backgroundColor: '#E9E9E9', borderRadius: 5, padding: 10 }}
        // label='Meetup title'
        multiline
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        autoCapitalize='none'
      /> */}
    </View>
  );
};

export default RollDescription;
