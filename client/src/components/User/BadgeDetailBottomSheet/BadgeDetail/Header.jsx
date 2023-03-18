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
  const { pressedBadgeData, isMyPage, setConfirmActionButtonModal, badgeDetailBottomSheetRef, navigation } =
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
                // setConfirmActionButtonModal({ isOpen: true, type: 'Add badge tags' });
                navigation.navigate('Add badge tags', {
                  badgeId: pressedBadgeData.badge._id,
                  badgeTags: pressedBadgeData.badgeTags,
                });
                badgeDetailBottomSheetRef.current.close();
              }}
              label='Add badge tag'
            />
            <ActionButton
              icon={<Entypo name='link' size={20} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => {
                navigation.navigate('Add link', {
                  badgeId: pressedBadgeData.badge._id,
                });
                badgeDetailBottomSheetRef.current.close();
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
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingTop: 10, paddingLeft: 10 }}>
        <View
          style={{
            backgroundColor: rnDefaultBackgroundColor,
            width: 75,
            height: 75,
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
              style={{ width: 55, height: 55 }}
              source={{
                uri: pressedBadgeData.badge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[pressedBadgeData.badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='fire' size={35} color={'red'} style={{ marginRight: 10 }} />
            <View>
              <Text style={{ color: baseTextColor, marginBottom: 5 }}>Passion</Text>
              <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>
                {pressedBadgeData.totalExperience}
              </Text>
            </View>
          </View>
        </View>

        {/* {renderActionButtons()} */}
      </View>
      <Text
        style={{
          paddingLeft: 10,
          fontWeight: 'bold',
          fontSize: 20,
          color: 'white',
          marginBottom: 10,
        }}
      >
        {pressedBadgeData.badge.name}
      </Text>
    </View>
  );
};

export default Header;
