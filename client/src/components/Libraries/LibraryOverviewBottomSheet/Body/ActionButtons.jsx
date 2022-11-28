import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { MaterialIcons } from '@expo/vector-icons';
import { backgroundColorsTable, iconColorsTable } from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';

const ActionButtons = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  return (
    <ScrollView horizontal={'true'}>
      <View style={{ marginBottom: 25, flexDirection: 'row' }}>
        <ActionButton
          label='Join this library'
          icon={<MaterialIcons name='library-add' size={25} color={iconColorsTable['blue1']} />}
          backgroundColor={backgroundColorsTable['blue1']}
          onActionButtonPress={() => console.log('press action button')}
        />
        <ActionButton
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
        />
      </View>
    </ScrollView>
  );
};

export default ActionButtons;
