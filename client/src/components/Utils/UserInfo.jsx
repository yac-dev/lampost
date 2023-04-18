import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor, screenSectionBackgroundColor } from '../../utils/colorsTable';
import BadgeLabel from './BadgeLabel';
import FastImage from 'react-native-fast-image';

const UserInfo = (props) => {
  const { auth } = useContext(GlobalContext);

  const renderTopBadges = (badges) => {
    if (badges.length) {
      return (
        <FlatList
          contentContainerStyle={{ paddingRight: 100 }}
          data={badges}
          renderItem={({ item }) => <BadgeLabel badge={item} />}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        // flexDirection: 'column',
        backgroundColor: screenSectionBackgroundColor,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
      }}
    >
      <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              props.onUserNamePress(props.user);
            }}
          >
            <FastImage
              style={{
                width: 45,
                height: 45,
                borderRadius: 10,
                marginRight: 15,
                backgroundColor: iconColorsTable['blue1'],
              }}
              source={{
                uri: props.user.photo
                  ? props.user.photo
                  : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                priority: FastImage.priority.normal,
              }}
              tintColor={props.user.photo ? null : 'white'}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>{props.user.name}</Text>
          {props.subInfo}
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', marginRight: 20 }}>
            </View>
          </View> */}
        </View>
        {props.actionButton}
      </View>
      {renderTopBadges(props.user.topBadges)}
    </View>
  );
};

export default UserInfo;
