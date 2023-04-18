import React, { useContext } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import LoungeContext from '../LoungeContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../../../utils/colorsTable';
import AppButton from '../../../../Utils/AppMenuButton';

const AppButtons = () => {
  const {
    appMenuBottomSheetRef,
    sendChatBottomSheetRef,
    crewBottomSheetRef,
    textInputRef,
    setChatType,
    isRSVPed,
    setIsRSVPed,
    setIsConfirmRSVPModalOpen,
  } = useContext(LoungeContext);

  // const sendRSVP = async() => {
  //   const result = await lampostAPI.patch(`/meetupanduserrelationships/`)
  // }

  return (
    <View style={{}}>
      <ScrollView>
        {/* <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setIsConfirmRSVPModalOpen(true);
          }}
          disabled={isRSVPed ? true : false}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['green1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Entypo name='bell' size={20} color={iconColorsTable['green1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>RSVP</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginRight: 10 }}>{isRSVPed ? 'Already done 👍' : 'Not yet'}</Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            setChatType('general');
            sendChatBottomSheetRef.current.snapToIndex(0);
            textInputRef.current.focus();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['blue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='comment-text' size={20} color={iconColorsTable['blue1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Send a chat</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            setChatType('question');
            sendChatBottomSheetRef.current.snapToIndex(0);
            textInputRef.current.focus();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['yellow1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <AntDesign name='questioncircle' size={20} color={iconColorsTable['yellow1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Ask a question</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            setChatType('help');
            sendChatBottomSheetRef.current.snapToIndex(0);
            textInputRef.current.focus();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['red1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <AntDesign name='exclamationcircle' size={20} color={iconColorsTable['red1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Help!!!</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            return null;
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['pink1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Ionicons name='image-sharp' size={20} color={iconColorsTable['pink1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Send an image</Text>
          </View>
          <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default AppButtons;
{
  /* <AppButton これ、後でいい。
  backgroundColor={backgroundColorsTable['black1']}
  icon={<Foundation name='skull' size={40} color={iconColorsTable['black1']} />}
  label='Blacklist'
  onAppMenuButtonPress={() => {
    appMenuBottomSheetRef.current.snapToIndex(0);
    crewBottomSheetRef.current.snapToIndex(0);
  }}
/> */
}
