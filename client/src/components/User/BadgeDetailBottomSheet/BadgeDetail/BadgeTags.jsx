import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text } from 'react-native';
import { baseTextColor } from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BadgeTags = () => {
  const { pressedBadgeData, isMyPage } = useContext(UserContext);

  const renderTags = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        <View
          style={{
            backgroundColor: 'red',
            padding: 5,
            marginRight: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Senior</Text>
        </View>
        <View
          style={{
            backgroundColor: 'blue',
            padding: 5,
            marginRight: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Senior</Text>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            padding: 5,
            marginRight: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Senior</Text>
        </View>
        <View
          style={{
            backgroundColor: 'pink',
            padding: 5,
            marginRight: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Senior</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold', fontSize: 20 }}>Tags</Text>
      <Text style={{ color: baseTextColor }}>No tags added yet.</Text>
      {renderTags()}
    </View>
  );
};

export default BadgeTags;
