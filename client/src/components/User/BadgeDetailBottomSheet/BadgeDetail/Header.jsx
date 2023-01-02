import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = () => {
  const { pressedBadgeData, isMyPage, setConfirmActionButtonModal, badgeDetailBottomSheetRef } =
    useContext(UserContext);

  const renderActionButtons = () => {
    if (isMyPage) {
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontWeight: 'bold',
              // alignSelf: 'center',
              fontSize: 20,
              // textAlign: 'center',
              color: 'white',
              marginBottom: 5,
            }}
          >
            {pressedBadgeData.badge.name}
          </Text>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
            <ActionButton
              icon={<MaterialCommunityIcons name='tag-multiple' size={20} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => {
                setConfirmActionButtonModal({ isOpen: true, type: 'Add badge tags' });
              }}
              label='Add badge tag'
            />
            <ActionButton
              icon={<Entypo name='link' size={20} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => {
                setConfirmActionButtonModal({ isOpen: true, type: 'Add my link' });
              }}
              label='Add my link'
            />
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <View
        style={{
          backgroundColor: rnDefaultBackgroundColor,
          width: 85,
          height: 85,
          borderRadius: 15,
          // marginBottom: 5,
          marginRight: 15,
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
            borderRadius: 10,
            backgroundColor: backgroundColorsTable[pressedBadgeData.badge.color],
            borderColor: backgroundColorsTable[pressedBadgeData.badge.color],
            borderWidth: 0.3,
          }}
        >
          <FastImage
            style={{ width: 65, height: 65 }}
            source={{
              uri: pressedBadgeData.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[pressedBadgeData.badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
      {renderActionButtons()}
    </View>
  );
};

export default Header;
