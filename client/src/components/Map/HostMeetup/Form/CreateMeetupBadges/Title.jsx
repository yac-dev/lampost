import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { iconColorsTable } from '../../../../../utils/colorsTable';

const Title = (props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['red1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <AntDesign name='edit' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 5, marginRight: 10 }}>Title</Text>
            <Text style={{ fontSize: 13, color: '#9E9E9E' }}>{props.state.title.length}/40</Text>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>Please write the meetup title.</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <BottomSheetTextInput
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#E9E9E9',
            color: '#424242',
            borderRadius: 5,
          }}
          value={props.state.title}
          onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_TITLE', payload: text })}
          autoCapitalize='none'
        />
        {/* <Text style={{ padding: 10, fontWeight: 'bold' }}>{props.state.title.length}/40</Text> */}
      </View>
    </View>
  );
};

export default Title;
