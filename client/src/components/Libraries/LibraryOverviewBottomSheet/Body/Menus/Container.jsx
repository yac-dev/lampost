import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../../LibrariesContext';

import { iconColorsTable, backgroundColorsTable } from '../../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Menu from './Menu';

const Container = () => {
  const { selectedLibrary, navigation } = useContext(LibrariesContext);
  const [menus, setMenus] = useState({
    members: { label: 'Members', info: '' },
    rate: { label: 'rate', info: '' },
  });

  return (
    <View style={{ marginBottom: 15 }}>
      <Menu
        label='Launcher'
        // onPress={() => navigation.navigate('User', { userId: selectedLibrary.launcher._id })}
        onPress={() => console.log('heey')}
        iconBackgroundColor={iconColorsTable['red1']}
        iconComponent={<MaterialCommunityIcons name='rocket-launch' size={25} color={'white'} />}
        rightInfoComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'red', width: 35, height: 35, borderRadius: 7, marginRight: 5 }}></View>
            <Text>{`${selectedLibrary.launcher.name} >`}</Text>
          </View>
        }
      />
      <Menu
        label='Members'
        onPress={() => console.log('hello')}
        iconBackgroundColor={iconColorsTable['violet1']}
        iconComponent={<FontAwesome5 name='user-astronaut' size={25} color={'white'} />}
        rightInfoComponent={
          <View>
            <Text>{`${selectedLibrary.members.length} >`}</Text>
          </View>
        }
      />
      <Menu
        label='Rate'
        onPress={() => console.log('hello2')}
        iconBackgroundColor={iconColorsTable['yellow1']}
        iconComponent={<MaterialIcons name='star-rate' size={25} color={'white'} />}
        rightInfoComponent={
          <View>
            <Text>{`${selectedLibrary.rate} >`}</Text>
          </View>
        }
      />
    </View>
  );
};

export default Container;

{
  /* <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
      onPress={() => props.menu.onPress()}
    >
      <View
        style={{
          backgroundColor: props.menu.iconBackgroundColor,
          padding: 5,
          borderRadius: 7,
          width: 35,
          height: 35,
          alignItems: 'center',
        }}
      >
        {props.menu.icon}
      </View>
      <View
        style={{ marginLeft: 15, flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{props.menu.name}</Text>
        {props.menu.info}
      </View>
    </TouchableOpacity> */
}
