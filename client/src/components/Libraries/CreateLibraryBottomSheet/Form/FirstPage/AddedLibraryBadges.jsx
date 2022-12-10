// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const AddedLibraryBadges = (props) => {
  const renderBadges = () => {
    const addedBadgesList = props.badges.map((badge, index) => {
      return (
        <View
          style={{
            width: 90, // さらにbadgeを覆う必要がある。textも含めた守備範囲が必要だ。
            height: 110,
            // backgroundColor: 'red',
            alignItems: 'center',
            // justifyContent: 'center', // これで、verticallyにもcenterにする。
          }}
        >
          <View
            style={{
              backgroundColor: rnDefaultBackgroundColor,
              width: 65,
              height: 65,
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
                backgroundColor: backgroundColorsTable[badge.color],
                borderColor: backgroundColorsTable[badge.color],
                borderWidth: 0.3,
              }}
            >
              <FastImage
                style={{ width: 45, height: 45 }}
                source={{
                  uri: badge.icon,
                  priority: FastImage.priority.normal,
                }}
                tintColor={iconColorsTable[badge.color]}
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
            {badge.name}
          </Text>
        </View>
      );
    });

    return (
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row' }}>{addedBadgesList}</View>
      </ScrollView>
    );
  };

  if (!props.badges.length) {
    return <Text style={{ fontWeight: 'bold', color: baseTextColor }}>No badges added yet...</Text>;
  } else {
    return <>{renderBadges()}</>;
  }
};

export default AddedLibraryBadges;
