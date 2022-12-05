import React, { useContext } from 'react';
import AddBadgesContext from '../../AddBadgesContext';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../ActionButton';

const Header = () => {
  const {
    fromComponent,
    tappedBadge,
    selectedUserBadges,
    setSelectedUserBadges,
    addedMeetupBadges,
    setAddedMeetupBadges,
  } = useContext(AddBadgesContext);

  // こういうの、if state mentよりもhashtableで使った方がいいだろな。いちいち分岐って読みづらいしね。
  const renderActionButton = () => {
    if (fromComponent === 'ADD_USER_BADGES') {
      if (selectedUserBadges[tappedBadge._id]) {
        return (
          <ActionButton
            icon={<MaterialCommunityIcons name='minus' size={20} color={'white'} />}
            backgroundColor={iconColorsTable['red1']}
            onActionButtonPress={() =>
              setSelectedUserBadges((previous) => {
                const copiedSelectedUserBadges = { ...previous };
                delete copiedSelectedUserBadges[tappedBadge._id];
                return copiedSelectedUserBadges;
              })
            }
            label='Remove this badge'
          />
        );
      } else {
        return (
          <ActionButton
            icon={<MaterialCommunityIcons name='plus' size={20} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() =>
              setSelectedUserBadges((previous) => {
                return {
                  ...previous,
                  [tappedBadge._id]: tappedBadge,
                };
              })
            }
            label='Add this badge'
          />
        );
      }
    } else if (fromComponent === 'ADD_MEETUP_BADGES') {
      if (addedMeetupBadges[tappedBadge._id]) {
        return (
          <ActionButton
            icon={<MaterialCommunityIcons name='minus' size={20} color={'white'} />}
            backgroundColor={iconColorsTable['red1']}
            onActionButtonPress={() =>
              setAddedMeetupBadges((previous) => {
                const copiedAddedMeetupBadges = { ...previous };
                delete copiedAddedMeetupBadges[tappedBadge._id];
                return copiedAddedMeetupBadges;
              })
            }
            label='Remove this badge'
          />
        );
      } else {
        return (
          <ActionButton
            icon={<MaterialCommunityIcons name='plus' size={20} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() =>
              setAddedMeetupBadges((previous) => {
                return {
                  ...previous,
                  [tappedBadge._id]: tappedBadge,
                };
              })
            }
            label='Add this badge'
          />
        );
      }
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          width: 120, // さらにbadgeを覆う必要がある。textも含めた守備範囲が必要だ。
          height: 120,
          // backgroundColor: 'red',
          alignItems: 'center',
          // justifyContent: 'center', // これで、verticallyにもcenterにする。
        }}
      >
        <View
          style={{
            backgroundColor: rnDefaultBackgroundColor,
            width: 85,
            height: 85,
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center', // これと
              justifyContent: 'center', // これで中のimageを上下左右真ん中にする
              borderRadius: 10,
              backgroundColor: backgroundColorsTable[tappedBadge.color],
              borderColor: backgroundColorsTable[tappedBadge.color],
              borderWidth: 0.3,
            }}
          >
            <FastImage
              style={{ width: 65, height: 65 }}
              source={{
                uri: tappedBadge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[tappedBadge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            // alignSelf: 'center',
            fontSize: 12,
            textAlign: 'center',
            color: baseTextColor,
          }}
        >
          {tappedBadge.name}
        </Text>
      </View>
      <View style={{ justifyContent: 'flex-start' }}>
        {/* <ActionButton
          icon={<MaterialCommunityIcons name='plus' size={20} color={'white'} />}
          backgroundColor={iconColorsTable['blue1']}
          onActionButtonPress={() => console.log('selectiong')}
          label='Add this badge'
        /> */}
        {renderActionButton()}
      </View>
    </View>
  );
};

export default Header;
