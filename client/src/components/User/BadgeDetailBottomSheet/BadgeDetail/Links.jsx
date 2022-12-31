import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseTextColor } from '../../../../utils/colorsTable';

const Links = () => {
  const { pressedBadgeData, isMyPage } = useContext(UserContext);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold', fontSize: 20 }}>Links</Text>
      {pressedBadgeData.url ? (
        <TouchableOpacity>
          <Text style={{ color: baseTextColor }}>{pressedBadgeData.url}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: baseTextColor }}>No links added yet.</Text>
      )}
    </View>
  );
};

export default Links;
