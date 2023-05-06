import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import lampostAPI from '../../../apis/lampost';
import { iconColorsTable } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, MaterialIcons } = iconsTable;
import DiscoverNavigatorContext from '../../Navigator/Discover/DiscoverNavigatorContext';

const ActionButtons = () => {
  const { auth, setLoading, myJoinedLibraries, setMyJoinedLibraries, setSnackBar } = useContext(GlobalContext);
  const { navigation, selectedLibrary, libraryDetailBottomSheetRef } = useContext(LibrariesContext);
  const { topLevelNavigation } = useContext(DiscoverNavigatorContext);

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
    libraryDetailBottomSheetRef.current.close();
    setSnackBar({
      isVisible: true,
      message: "You've joined a library successfully. Please go to 'My Libraries' from Home tab and check it out.",
      barType: 'success',
      duration: 5000,
    });
  };

  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      {myJoinedLibraries.some((library) => library._id === selectedLibrary._id) ? (
        <View style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>You've already joined</Text>
        </View>
      ) : (
        <>
          <View style={{ flex: 0.5, paddingRight: 5 }}>
            <TouchableOpacity
              style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], padding: 7, borderRadius: 5 }}
              onPress={() => joinLibrary()}
            >
              <View style={{ alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons
                    name='human-greeting-variant'
                    size={20}
                    color={'white'}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ color: 'white' }}>Join this library</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.5, paddingLeft: 5 }}>
            <TouchableOpacity
              style={{ width: '100%', backgroundColor: iconColorsTable['red1'], padding: 7, borderRadius: 5 }}
              onPress={() => topLevelNavigation.navigate('Discover report', { report: selectedLibrary.title })}
            >
              <View style={{ alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name='report-problem' size={20} color={'white'} style={{ marginRight: 10 }} />
                  <Text style={{ color: 'white' }}>Report</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ActionButtons;
