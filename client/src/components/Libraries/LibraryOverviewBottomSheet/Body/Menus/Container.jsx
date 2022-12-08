import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../../LibrariesContext';

import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import Menu from './Menu';
import Menu from '../../../../Map/SelectedMeetup/Menu';

const Container = (props) => {
  const { selectedLibrary, navigation } = useContext(LibrariesContext);
  const [menus, setMenus] = useState({
    members: { label: 'Members', info: '' },
    rate: { label: 'rate', info: '' },
  });

  return (
    <View style={{ marginBottom: 25, backgroundColor: sectionBackgroundColor, borderRadius: 10 }}>
      <Menu
        label='Launcher'
        // onPress={() => navigation.navigate('User', { userId: selectedLibrary.launcher._id })}
        onPressMenu={() => {
          if (!props.auth.isAuthenticated || props.auth.data._id === selectedLibrary.launcher._id) {
            navigation.navigate('User', { userId: selectedLibrary.launcher._id });
          }
        }}
        backgroundColor={backgroundColorsTable['red1']}
        icon={<MaterialCommunityIcons name='rocket-launch' size={25} color={iconColorsTable['red1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'red', width: 35, height: 35, borderRadius: 7, marginRight: 5 }}></View>
            <Text style={{ color: baseTextColor }}>{`${selectedLibrary.launcher.name} >`}</Text>
          </View>
        }
      />
      <Menu
        label='Members'
        onPress={() => console.log('hello')}
        backgroundColor={backgroundColorsTable['violet1']}
        icon={<FontAwesome5 name='user-astronaut' size={25} color={iconColorsTable['violet1']} />}
        rightInfo={
          <View>
            <Text style={{ color: baseTextColor }}>{`${selectedLibrary.members.length} >`}</Text>
          </View>
        }
      />
      <Menu
        label='Rate'
        onPress={() => console.log('hello2')}
        backgroundColor={backgroundColorsTable['yellow1']}
        icon={<MaterialIcons name='star-rate' size={25} color={iconColorsTable['yellow1']} />}
        rightInfo={
          <View>
            <Text style={{ color: baseTextColor }}>{`${selectedLibrary.rate} >`}</Text>
          </View>
        }
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);

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
