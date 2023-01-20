import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor } from '../../utils/colorsTable';
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
          contentContainerStyle={{ paddingRight: 100 }}
          style={{ flexDirection: 'row', padding: 5 }}
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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {props.user.photo ? (
        <Image
          source={{ uri: props.user.photo }}
          style={{ width: 45, height: 45, borderRadius: 10, marginRight: 10 }}
        />
      ) : (
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            marginRight: 10,
            backgroundColor: iconColorsTable['blue1'],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesome5 name='user-astronaut' size={25} color='white' />
        </View>
      )}
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ color: 'white', marginBottom: 3, fontSize: 15 }}>{props.user.name}</Text>
        {renderTopBadges(props.user.topBadges)}
      </View>
    </View>
  );
};

export default UserInfo;
