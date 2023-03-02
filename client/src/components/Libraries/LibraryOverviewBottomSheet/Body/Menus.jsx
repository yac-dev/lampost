import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import GlobalContext from '../../../../GlobalContext';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
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
import { iconsTable } from '../../../../utils/icons';

const Container = (props) => {
  const { Fontisto, MaterialCommunityIcons, MaterialIcons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const {
    selectedLibrary,
    navigation,
    selectedLibraryDetailComponentBottomSheetRef,
    setSelectedLibraryDetailComponent,
  } = useContext(LibrariesContext);

  const renderAssetType = (assetType) => {
    if (assetType === 'photo') {
      return <Text style={{ color: baseTextColor }}>Photo</Text>;
    } else if (assetType === 'video') {
      return <Text style={{ color: baseTextColor }}>Video</Text>;
    } else {
      return <Text style={{ color: baseTextColor }}>Photo & Video</Text>;
    }
  };

  return (
    <ScrollView style={{ borderRadius: 10, backgroundColor: sectionBackgroundColor }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 80 }}>
              <Text numberOfLines={1} style={{ color: baseTextColor, fontSize: 15 }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 80 }}>
              <Text numberOfLines={1} style={{ color: baseTextColor, alignSelf: 'flex-end', fontSize: 15 }}>
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
        backgroundColor={backgroundColorsTable['blue1']}
        icon={<MaterialIcons name='groups' size={25} color={iconColorsTable['blue1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor, fontSize: 15 }}>{selectedLibrary.totalMembers}</Text>
            <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
          </View>
        }
      />
      <Menu
        label='Assets'
        onPressMenu={() => {
          null;
        }}
        backgroundColor={backgroundColorsTable['orange1']}
        icon={<MaterialIcons name='camera-roll' size={20} color={iconColorsTable['orange1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor }}>{selectedLibrary.totalAssets}</Text>
            <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
          </View>
        }
      />
      <Menu
        label='Asset type'
        onPressMenu={() => {
          null;
        }}
        backgroundColor={backgroundColorsTable['pink1']}
        icon={<Fontisto name='photograph' size={20} color={iconColorsTable['pink1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderAssetType(selectedLibrary.assetType)}
            <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
          </View>
        }
      />
      <Menu
        label='Albums'
        onPressMenu={() => {
          return null;
        }}
        backgroundColor={backgroundColorsTable['yellow1']}
        icon={<MaterialCommunityIcons name='image-album' size={25} color={iconColorsTable['yellow1']} />}
        rightInfo={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor }}>{selectedLibrary.albums.length}</Text>
            <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
          </View>
        }
      />
    </ScrollView>
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
