import React, { useContext } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import AddBadgesContext from '../../AddBadgesContext';
import { baseTextColor, iconColorsTable, sectionBackgroundColor } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';

const BadgeHolders = () => {
  const { tappedBadgeHolders } = useContext(AddBadgesContext);

  const renderBadgeHolders = () => {
    if (tappedBadgeHolders.length) {
      const badgeHolders = tappedBadgeHolders.map((user, index) => {
        return (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            {user.photo ? (
              <Image source={{ uri: user.photo }} style={{ width: 50, height: 50 }} />
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
            <Text style={{ color: baseTextColor }}>{user.name}</Text>
          </View>
        );
      });

      return (
        <View>
          <Text style={{ color: baseTextColor, marginBottom: 15 }}>These people also have this badge...</Text>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            style={{ padding: 10, backgroundColor: sectionBackgroundColor, borderRadius: 10 }}
          >
            {badgeHolders}
          </ScrollView>
        </View>
      );
    } else if (!tappedBadgeHolders.length) {
      return (
        <View>
          <Text style={{ color: baseTextColor }}>No users have this badge now.</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor }}>Now loading...</Text>
        </View>
      );
    }
  };

  return <>{renderBadgeHolders()}</>;
};

export default BadgeHolders;
