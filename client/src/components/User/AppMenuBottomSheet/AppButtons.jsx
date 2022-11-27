import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AuthContext from '../Context';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';
import AppButton from '../../Map/AppMenuBottomSheet/AppButtons/AppButton';

const AppButtons = () => {
  const { user, navigation } = useContext(AuthContext);
  return (
    <View style={{ paddingTop: 10, marginBottom: 15 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['lightGreen1']}
          icon={<Foundation name='sheriff-badge' size={35} color={iconColorsTable['lightGreen1']} />}
          label='Badges'
          onPress={() => console.log('yes')}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<MaterialCommunityIcons name='history' size={35} color={iconColorsTable['violet1']} />}
          label='Log'
          onPress={() => navigation.navigate('Log', { userId: user._id })}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['pink1']}
          icon={<Entypo name='images' size={35} color={iconColorsTable['pink1']} />}
          label='Assets'
          onPress={() => navigation.navigate('Assets', { userId: user._id })}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<Fontisto name='player-settings' size={35} color={iconColorsTable['grey1']} />}
          label='Setting'
        />
        <AppButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='logout' size={35} color={iconColorsTable['blue1']} />}
          label='Logout'
        />
      </ScrollView>
    </View>
  );
};

export default AppButtons;