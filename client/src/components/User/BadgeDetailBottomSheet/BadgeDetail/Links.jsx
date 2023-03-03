import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseTextColor, iconColorsTable, backgroundColorsTable } from '../../../../utils/colorsTable';
import { Feather } from '@expo/vector-icons';
import { iconsTable } from '../../../../utils/icons';

const Links = () => {
  const { MaterialCommunityIcons } = iconsTable;
  const { pressedBadgeData, isMyPage } = useContext(UserContext);

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['grey1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='link-variant' color={iconColorsTable['grey1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Links</Text>
        </View>
      </View>
      {pressedBadgeData.links.length ? (
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
