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
  const { auth, setSnackBar, setLoading } = useContext(GlobalContext);
  const { selectedLibrary, myJoinedLibraries, setMyJoinedLibraries, navigation, libraryOverviewBottomSheetRef } =
    useContext(LibrariesContext);

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

  if (props.auth.isAuthenticated) {
    return (
      <ScrollView horizontal={'true'} style={{ paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ marginBottom: 25, flexDirection: 'row' }}>
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

          {/* <ActionButton
            label='Report this library'
            icon={
              <MaterialIcons
                name='report-problem'
                size={25}
                color={iconColorsTable['red1']}
                style={{ marginRight: 10 }}
              />
            }
            backgroundColor={backgroundColorsTable['red1']}
            onActionButtonPress={() => console.log('press action button report')}
          /> */}
        </View>
      </ScrollView>
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

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(ActionButtons);
