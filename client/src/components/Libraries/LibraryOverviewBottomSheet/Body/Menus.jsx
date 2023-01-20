import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import GlobalContext from '../../../../GlobalContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
// import Menu from './Menu';
import Menu from '../../../Map/SelectedMeetup/Menu';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const {
    selectedLibrary,
    navigation,
    selectedLibraryDetailComponentBottomSheetRef,
    setSelectedLibraryDetailComponent,
  } = useContext(LibrariesContext);

  return (
    <View style={{ marginBottom: 25, paddingLeft: 20, paddingRight: 20 }}>
      <View style={{ backgroundColor: sectionBackgroundColor, borderRadius: 10 }}>
        <Menu
          label='Launcher'
          onPressMenu={() => {
            if (!auth.data || auth.data._id !== selectedLibrary.launcher._id) {
              navigation.navigate('User', { userId: selectedLibrary.launcher._id });
            }
          }}
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='rocket-launch' size={25} color={iconColorsTable['red1']} />}
          rightInfo={
            // <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //     {selectedLibrary.launcher.photo ? (
            //       <Image
            //         source={{ uri: selectedLibrary.launcher.photo }}
            //         style={{ width: 35, height: 35, borderRadius: 7, marginRight: 10 }}
            //       />
            //     ) : (
            //       <View
            //         style={{ backgroundColor: 'red', width: 35, height: 35, borderRadius: 7, marginRight: 10 }}
            //       ></View>
            //     )}
            //     <Text style={{ color: baseTextColor }}>{selectedLibrary.launcher.name}</Text>
            //   </View>
            //   <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
            // </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 80 }}>
                <Text numberOfLines={1} style={{ color: baseTextColor }}>
                  {selectedLibrary.launcher.name}
                </Text>
              </View>
              <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
            </View>
          }
        />
        <Menu
          label='Description'
          onPressMenu={() => {
            setSelectedLibraryDetailComponent('Description');
            selectedLibraryDetailComponentBottomSheetRef.current.snapToIndex(0);
          }}
          backgroundColor={backgroundColorsTable['green1']}
          icon={<MaterialCommunityIcons name='card-text-outline' size={25} color={iconColorsTable['green1']} />}
          rightInfo={
            // <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //   <Text numberOfLines={1} style={{ color: baseTextColor, width: 150, marginRight: 5 }}>
            //     {selectedLibrary.description}
            //   </Text>
            //   <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
            // </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 80 }}>
                <Text numberOfLines={1} style={{ color: baseTextColor, alignSelf: 'flex-end' }}>
                  {selectedLibrary.description}
                </Text>
              </View>
              <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
            </View>
          }
        />
        <Menu
          label='Members'
          onPressMenu={() => {
            setSelectedLibraryDetailComponent('Members');
            selectedLibraryDetailComponentBottomSheetRef.current.snapToIndex(0);
          }}
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<MaterialIcons name='groups' size={25} color={iconColorsTable['violet1']} />}
          rightInfo={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: baseTextColor, marginRight: 5 }}>{selectedLibrary.totalMembers}</Text>
              <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
            </View>
          }
        />
        {/* <Menu
          label='Reactions'
          onPressMenu={() => {
            setSelectedLibraryDetailComponent('Reactions');
            selectedLibraryDetailComponentBottomSheetRef.current.snapToIndex(0);
          }}
          backgroundColor={backgroundColorsTable['yellow1']}
          icon={<MaterialIcons name='star-rate' size={25} color={iconColorsTable['yellow1']} />}
          rightInfo={<Text style={{ color: baseTextColor }}>{`${selectedLibrary.rate} >`}</Text>}
        /> */}
      </View>
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
