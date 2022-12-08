import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import LibrariesContext from '../../LibrariesContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { backgroundColorsTable, baseTextColor, iconColorsTable } from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';

const ActionButtons = (props) => {
  const { selectedLibrary, myJoinedLibraries, setMyJoinedLibraries } = useContext(LibrariesContext);

  const joinLibrary = async () => {
    const formData = {
      libraryId: selectedLibrary._id,
      userId: props.auth.data._id,
    };
    const result = await lampostAPI.post('/libraryanduserrelationships', formData);
    const { library } = result.data;
    setMyJoinedLibraries((previous) => [...previous, library]);
  };

  const leaveLibrary = () => {
    console.log('left this library');
  };
  if (props.auth.isAuthenticated) {
    return (
      <ScrollView horizontal={'true'}>
        <View style={{ marginBottom: 25, flexDirection: 'row' }}>
          {myJoinedLibraries.some((library) => library._id === selectedLibrary._id) ? (
            <ActionButton
              label='Leave this library'
              icon={<MaterialCommunityIcons name='exit-run' size={20} color={'white'} />}
              backgroundColor={iconColorsTable['red1']}
              onActionButtonPress={leaveLibrary}
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
      <View style={{ marginBottom: 25 }}>
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
