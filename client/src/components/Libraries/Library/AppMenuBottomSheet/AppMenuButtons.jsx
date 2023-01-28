import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import LibraryContext from '../LibraryContext';
import {
  baseBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  sectionBackgroundColor,
} from '../../../../utils/colorsTable';
import AppMenuButton from '../../../Utils/AppMenuButton';
import lampostAPI from '../../../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const AppMenuButtons = () => {
  const { auth } = useContext(GlobalContext);
  const {
    appMenuBottomSheetRef,
    postsBottomSheetRef,
    navigation,
    library,
    setIsLeaveLibraryConfirmationModalOpen,
    setLibraryMembers,
    setLibraryPosts,
    membersBottomSheetRef,
    setIsConfirmPostAssetsModalOpen,
  } = useContext(LibraryContext);

  const getUsersByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/users/${library._id}`);
    const { users } = result.data;
    setLibraryMembers(users);
  };

  const getLibraryPostsByLibraryId = async () => {
    const result = await lampostAPI.get(`/assetposts/${library._id}`);
    const { assetPosts } = result.data;
    setLibraryPosts(assetPosts);
  };

  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppMenuButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='plus' size={35} color={iconColorsTable['red1']} />}
          label='Post my assets'
          onAppMenuButtonPress={() => {
            setIsConfirmPostAssetsModalOpen(true);
            appMenuBottomSheetRef.current.snapToIndex(0);
            // navigation.navigate('Add assets', { libraryId: library._id, fromComponent: 'ADD_ASSETS_FOR_POSTING' });
          }}
        />
        {/* <AppMenuButton
          backgroundColor={backgroundColorsTable['pink1']}
          icon={<Ionicons name='ios-search' size={35} color={iconColorsTable['pink1']} />}
          label='Discover posts'
          onAppMenuButtonPress={() => {
            // getLibraryPostsByLibraryId();
            // postsBottomSheetRef.current.snapToIndex(0);
            // appMenuBottomSheetRef.current.snapToIndex(0);
            navigation.navigate('Posts', { libraryId: library._id });
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        /> */}
        <AppMenuButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='account-group' size={35} color={iconColorsTable['blue1']} />}
          label='Members'
          onAppMenuButtonPress={() => {
            getUsersByLibraryId();
            membersBottomSheetRef.current.snapToIndex(0);
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        />
        {library?.launcher._id === auth.data?._id ? null : (
          <AppMenuButton
            backgroundColor={backgroundColorsTable['green1']}
            icon={<MaterialCommunityIcons name='exit-run' size={35} color={iconColorsTable['green1']} />}
            label='Leave this library'
            onAppMenuButtonPress={() => {
              setIsLeaveLibraryConfirmationModalOpen(true);
              appMenuBottomSheetRef.current.snapToIndex(0);
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppMenuButtons;
