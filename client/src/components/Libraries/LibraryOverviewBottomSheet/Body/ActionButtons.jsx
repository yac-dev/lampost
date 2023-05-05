import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import GlobalContext from '../../../../GlobalContext';
import LibrariesContext from '../../LibrariesContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { backgroundColorsTable, baseTextColor, iconColorsTable } from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';

const ActionButtons = (props) => {
  const { auth, setSnackBar, setLoading, myJoinedLibraries } = useContext(GlobalContext);
  const { selectedLibrary, navigation, libraryOverviewBottomSheetRef } = useContext(LibrariesContext);

  const joinLibrary = async () => {
    const formData = {
      libraryId: selectedLibrary._id,
      userId: auth.data._id,
    };
    setLoading(true);
    const result = await lampostAPI.post('/libraryanduserrelationships', formData);
    const { library } = result.data;
    setMyJoinedLibraries((previous) => [...previous, library]);
    setLoading(false);
    libraryOverviewBottomSheetRef.current.close();
    setSnackBar({
      isVisible: true,
      message: 'Joined successfully.',
      barType: 'success',
      duration: 5000,
    });
    navigation.navigate('Library', { libraryId: library._id });
  };

  if (auth.isAuthenticated) {
    return (
      <View style={{ marginBottom: 15 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            {myJoinedLibraries.some((library) => library._id === selectedLibrary._id) ? (
              <ActionButton
                label='Already joined'
                icon={<MaterialCommunityIcons name='check' size={20} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => {
                  return null;
                }}
              />
            ) : (
              <ActionButton
                label='Join this library'
                icon={<MaterialIcons name='library-add' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={joinLibrary}
              />
            )}

            <ActionButton
              label='Report this library'
              icon={<MaterialIcons name='report-problem' size={25} color='white' />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() =>
                navigation.navigate('Report library', {
                  libraryId: selectedLibrary._id,
                  libraryName: selectedLibrary.name,
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ marginBottom: 25, paddingLeft: 20, paddingRight: 20 }}>
        <ActionButton
          label='Please login or signup to join'
          icon={<Ionicons name='ios-enter' size={25} color={'white'} />}
          backgroundColor={iconColorsTable['blue1']}
          onActionButtonPress={joinLibrary}
        />
      </View>
    );
  }
};

export default ActionButtons;
