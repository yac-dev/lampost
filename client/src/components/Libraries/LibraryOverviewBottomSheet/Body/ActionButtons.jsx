import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import LibrariesContext from '../../LibrariesContext';
import { MaterialIcons } from '@expo/vector-icons';
import { backgroundColorsTable, iconColorsTable } from '../../../../utils/colorsTable';
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

  return (
    <ScrollView horizontal={'true'}>
      <View style={{ marginBottom: 25, flexDirection: 'row' }}>
        <ActionButton
          label='Join this library'
          icon={<MaterialIcons name='library-add' size={25} color={iconColorsTable['blue1']} />}
          backgroundColor={backgroundColorsTable['blue1']}
          onActionButtonPress={joinLibrary}
        />
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
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(ActionButtons);
