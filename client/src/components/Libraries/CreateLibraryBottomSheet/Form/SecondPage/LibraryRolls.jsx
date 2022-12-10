import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../../LibrariesContext';
import FormContext from '../../FormContext';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  sectionBackgroundColor,
} from '../../../../../utils/colorsTable';
import { useContext } from 'react';
import ActionButton from '../../../../Utils/ActionButton';
import RollInput from './RollInput';

const LibraryRolls = (props) => {
  const { createLibraryBottomSheetRef } = useContext(LibrariesContext);
  const { setPage, formData, setFormData } = useContext(FormContext);

  const renderRollInputs = () => {
    const inputsList = formData.rolls.map((roll, index) => {
      return <RollInput key={index} index={index} />;
    });

    return <View>{inputsList}</View>;
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['red1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Ionicons name='ios-albums' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Rolls</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor, marginBottom: 10 }}>
        Please create at least two rolls.
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          alignSelf: 'flex-end',
        }}
        onPress={() => {
          setFormData((previous) => {
            const updating = { ...previous };
            updating.rolls.push('');
            return updating;
          });
        }}
      >
        <AntDesign name='plus' size={20} style={{ marginRight: 5 }} color={baseTextColor} />
        <Text style={{ color: baseTextColor }}>Add more roll</Text>
      </TouchableOpacity>
      {renderRollInputs()}
      <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <ActionButton
          label='Back'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
          onActionButtonPress={() => setPage('FIRST_PAGE')}
        />
        <ActionButton
          label='Launch'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='rocket-launch' color={'white'} size={25} />}
          onActionButtonPress={() => console.log(formData)}
        />
      </View>
    </View>
  );
};

export default LibraryRolls;
