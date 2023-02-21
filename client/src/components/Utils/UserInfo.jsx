import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor, screenSectionBackgroundColor } from '../../utils/colorsTable';
import BadgeLabel from './BadgeLabel';

const UserInfo = (props) => {
  const { auth } = useContext(GlobalContext);

  const renderTopBadges = (badges) => {
    if (badges.length) {
      const list = badges.map((badge, index) => {
        return <BadgeLabel key={index} badge={badge} />;
      });

      return (
        <ScrollView
          horizontal={true}
          // contentContainerStyle={{ paddingRight: 50 }}
          showsHorizontalScrollIndicator={false}
        >
          {list}
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: screenSectionBackgroundColor,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
      }}
    >
      <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            // if (!auth.data || auth.data._id !== props.user._id) {
            //   navigation.navigate('User', { userId: props.user._id });
            // }
            props.onUserNamePress(props.user);
          }}
        >
          {props.user.photo ? (
            <Image
              source={{ uri: props.user.photo }}
              style={{ width: 40, height: 40, borderRadius: 10, marginRight: 15 }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                marginRight: 15,
                backgroundColor: iconColorsTable['blue1'],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome5 name='user-astronaut' size={25} color='white' />
            </View>
          )}
          <Text numberOfLines={1} style={{ color: 'white', fontSize: 15, width: 130 }}>
            {props.user.name}
          </Text>
        </TouchableOpacity>
        {props.actionButtons}
      </View>
      {renderTopBadges(props.user.topBadges)}
    </View>
  );
};

export default UserInfo;
