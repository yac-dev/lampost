import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor, screenSectionBackgroundColor } from '../../utils/colorsTable';
import BadgeLabel from './BadgeLabel';
import FastImage from 'react-native-fast-image';

const UserInfo = (props) => {
  const { auth } = useContext(GlobalContext);

  // const renderTopBadges = (badges) => {
  //   if (badges.length) {
  //     const list = badges.map((badge, index) => {
  //       return <BadgeLabel key={index} badge={badge} />;
  //     });

  //     return (
  //       <ScrollView
  //         horizontal={true}
  //         // contentContainerStyle={{ paddingRight: 50 }}
  //         showsHorizontalScrollIndicator={false}
  //       >
  //         {list}
  //       </ScrollView>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  const onUserNamePress = () => {};

  const renderTopBadges = (badges) => {
    if (badges.length) {
      return (
        <FlatList
          contentContainerStyle={{ paddingRight: 100 }}
          data={badges}
          renderItem={({ item }) => <BadgeLabel badge={item} />}
          keyExtractor={(item) => item._id}
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
      <View
        style={{ flexDirection: 'row', marginBottom: props.actionButtons ? 10 : null, justifyContent: 'space-between' }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            // if (!auth.data || auth.data._id !== props.user._id) {
            //   navigation.navigate('User', { userId: props.user._id });
            // }
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
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 20, marginBottom: 5 }}>{props.user.name}</Text>
            {renderTopBadges(props.user.topBadges)}
          </View>
        </TouchableOpacity>
        {props.rightInfo}
      </View>
      {props.actionButtons}
    </View>
  );
};

export default UserInfo;
