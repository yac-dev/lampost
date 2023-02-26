import React, { useContext } from 'react';
import LoungeContext from '../LoungeContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../../../utils/colorsTable';
import AppButton from '../../../../Utils/AppMenuButton';

const AppButtons = () => {
  const { appMenuBottomSheetRef, sendChatBottomSheetRef, crewBottomSheetRef, textInputRef } = useContext(LoungeContext);
  return (
    <View style={{}}>
      {/* <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='send' size={35} color={iconColorsTable['blue1']} />}
          label='Send a chat'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.close();
            sendChatBottomSheetRef.current.snapToIndex(0);
            textInputRef.current.focus();
          }}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<MaterialIcons name='groups' size={30} color={iconColorsTable['violet1']} />}
          label='Members'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.close();
            crewBottomSheetRef.current.snapToIndex(0);
          }}
        />
      </ScrollView> */}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          sendChatBottomSheetRef.current.snapToIndex(0);
          textInputRef.current.focus();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['blue1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='comment-text' size={20} color={iconColorsTable['blue1']} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Send a chat</Text>
        </View>
        <MaterialCommunityIcons name='chevron-down' color={baseTextColor} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          return null;
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['pink1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Ionicons name='image-sharp' size={20} color={iconColorsTable['pink1']} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Send a image</Text>
        </View>
        <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          sendChatBottomSheetRef.current.snapToIndex(0);
          textInputRef.current.focus();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['yellow1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <AntDesign name='questioncircle' size={20} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Ask a question</Text>
        </View>
        <MaterialCommunityIcons name='chevron-down' color={baseTextColor} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          sendChatBottomSheetRef.current.snapToIndex(0);
          textInputRef.current.focus();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['red1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <AntDesign name='exclamationcircle' size={20} color={iconColorsTable['red1']} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Help!!!</Text>
        </View>
        <MaterialCommunityIcons name='chevron-down' color={baseTextColor} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default AppButtons;
{
  /* <AppButton これ、後でいい。
  backgroundColor={backgroundColorsTable['black1']}
  icon={<Foundation name='skull' size={35} color={iconColorsTable['black1']} />}
  label='Blacklist'
  onAppMenuButtonPress={() => {
    appMenuBottomSheetRef.current.snapToIndex(0);
    crewBottomSheetRef.current.snapToIndex(0);
  }}
/> */
}
