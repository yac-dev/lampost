import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
import { SimpleLineIcons } from '@expo/vector-icons';

const AppMenuButtons = () => {
  const {
    appMenuBottomSheetRef,
    navigation,
    library,
    setIsLeaveLibraryConfirmationModalOpen,
    setLibraryMembers,
    membersBottomSheetRef,
  } = useContext(LibraryContext);

  const getUsersByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/users/${library._id}`);
    const { users } = result.data;
    setLibraryMembers(users);
  };

  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppMenuButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='image-plus' size={35} color={iconColorsTable['red1']} />}
          label='Post my assets'
          onAppMenuButtonPress={() => {
            navigation.navigate('Add assets', { libraryId: library._id });
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['yellow1']}
          icon={<SimpleLineIcons name='emotsmile' size={35} color={iconColorsTable['yellow1']} />}
          label='Reactions'
          onAppMenuButtonPress={() => {
            navigation.navigate('Add assets', { libraryId: library._id });
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        />
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
        <AppMenuButton
          backgroundColor={backgroundColorsTable['green1']}
          icon={<MaterialCommunityIcons name='exit-run' size={35} color={iconColorsTable['green1']} />}
          label='Leave this library'
          onAppMenuButtonPress={() => {
            setIsLeaveLibraryConfirmationModalOpen(true);
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AppMenuButtons;
