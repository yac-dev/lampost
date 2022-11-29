import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const Badges = (props) => {
  const { selectedMeetup } = useContext(MapContext);

  const renderBadges = () => {
    const badgesList = selectedMeetup.badges.map((badge, index) => {
      return (
        <View key={index} style={{ backgroundColor: rnDefaultBackgroundColor, marginRight: 10, borderRadius: 10 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 2,
              paddingBottom: 2,
              paddingRight: 10,
              paddingLeft: 10,
              backgroundColor: backgroundColorsTable[badge.color],
            }}
          >
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                alignItems: 'center', // これと
                justifyContent: 'center', // これで中のimageを上下左右真ん中にする
              }}
            >
              <FastImage
                style={{ width: 20, height: 20 }}
                source={{
                  uri: badge.icon,
                  priority: FastImage.priority.normal,
                }}
                tintColor={iconColorsTable[badge.color]}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <Text style={{ color: iconColorsTable[badge.color] }}>{badge.name}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return <View style={{ flexDirection: 'row' }}>{badgesList}</View>;
  };

  return <ScrollView horizontal={true}>{renderBadges()}</ScrollView>;
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps)(Badges);
