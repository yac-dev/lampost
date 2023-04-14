import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import LibraryContext from '../LibraryContext';
import {
  baseBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../../utils/colorsTable';
import AppMenuButton from '../../../Utils/AppMenuButton';
import lampostAPI from '../../../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { iconsTable } from '../../../../utils/icons';

const AppMenuButtons = () => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const {
    appMenuBottomSheetRef,
    postsBottomSheetRef,
    navigation,
    libraryId,
    libraryAssetType,
    setIsLeaveLibraryConfirmationModalOpen,
    setLibraryMembers,
    setLibraryPosts,
    membersBottomSheetRef,
    setIsConfirmPostAssetsModalOpen,
  } = useContext(LibraryContext);

  // const getUsersByLibraryId = async () => {
  //   const result = await lampostAPI.get(`/libraryanduserrelationships/users/${library._id}`);
  //   const { users } = result.data;
  //   setLibraryMembers(users);
  // };

  return (
    <View style={{}}>
      {/* <ScrollView style={{ flexDirection: 'row' }} horizontal={true}> */}
      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Menu</Text>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          // setIsConfirmPostAssetsModalOpen(true);
          appMenuBottomSheetRef.current.close();
          navigation.navigate('Add assets', {
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
      {/* <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          null;
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['violet1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <Ionicons name='library-sharp' color={iconColorsTable['violet1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Library detail</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
      </TouchableOpacity> */}
      {/* {library?.launcher._id === auth.data?._id ? null : (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setIsLeaveLibraryConfirmationModalOpen(true);
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['green1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='exit-run' color={iconColorsTable['green1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>
              Leave this library
            </Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
      )} */}
      {/* </ScrollView> */}
    </View>
  );
};

export default AppMenuButtons;

{
  /* <AppMenuButton
backgroundColor={backgroundColorsTable['green1']}
icon={<MaterialCommunityIcons name='exit-run' size={35} color={iconColorsTable['green1']} />}
label='Leave this library'
onAppMenuButtonPress={() => {
  setIsLeaveLibraryConfirmationModalOpen(true);
  appMenuBottomSheetRef.current.snapToIndex(0);
}}
/> */
}
