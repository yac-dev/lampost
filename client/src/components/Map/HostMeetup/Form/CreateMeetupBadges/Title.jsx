import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Title = () => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: 'rgba(255, 51, 51, 0.85)',
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
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Title</Text>
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
          // value={props.searchQuery}
          // onChangeText={props.setSearchQuery}
        />
        <Text style={{ padding: 10, fontWeight: 'bold' }}>35/40</Text>
      </View>
    </View>
  );
};

export default Title;
