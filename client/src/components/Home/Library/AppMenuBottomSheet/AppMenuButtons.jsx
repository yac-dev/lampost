import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import LibraryContext from '../LibraryContext';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import { iconsTable } from '../../../../utils/icons';

const AppMenuButtons = () => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, navigation, libraryId, libraryAssetType } = useContext(LibraryContext);

  return (
    <View style={{}}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          navigation.navigate('Post my snap', {
            libraryId,
            fromComponent: 'ADD_ASSET_FOR_POSTING',
            assetType: libraryAssetType,
          });
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: backgroundColorsTable['yellow1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='plus' color={iconColorsTable['yellow1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Post my moments</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          navigation.navigate('LibraryMembers', { libraryId });
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: backgroundColorsTable['lightBlue1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='account-group' color={iconColorsTable['lightBlue1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Members</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default AppMenuButtons;
