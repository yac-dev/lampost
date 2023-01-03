import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseTextColor } from '../../../../utils/colorsTable';
import { Feather } from '@expo/vector-icons';

const Links = () => {
  const { pressedBadgeData, isMyPage } = useContext(UserContext);

  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold', fontSize: 20 }}>Links</Text>
      {pressedBadgeData.link ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor, marginRight: 10 }}>{pressedBadgeData.link}</Text>
          <TouchableOpacity>
            <Feather name='external-link' size={20} color={baseTextColor} />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ color: baseTextColor }}>No links added yet.</Text>
      )}
    </View>
  );
};

export default Links;
