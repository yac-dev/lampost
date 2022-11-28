import React from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { iconColorsTable, baseTextColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Reference = (props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, flexShrink: 1, marginBottom: 10 }}>
        Please paste the link of location info or attachment if you have.
      </Text>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['grey1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Entypo name='link' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Link (optional)</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', flexShrink: 1 }}>
            Please paste the link of location info or attachment if you have.
          </Text>
        </View>
      </View> */}
      <BottomSheetTextInput
        style={{ backgroundColor: sectionBackgroundColor, padding: 10, borderRadius: 5 }}
        placeholder='URL'
        placeholderTextColor={baseTextColor}
        value={props.state.link}
        onChangeText={(text) => props.dispatch({ type: 'SET_LINK', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        autoCapitalize='none'
      />
    </View>
  );
};

export default Reference;
