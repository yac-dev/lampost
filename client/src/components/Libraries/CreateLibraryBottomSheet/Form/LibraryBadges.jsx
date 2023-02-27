import React, { useContext, useEffect, useState } from 'react';
import FormContext from '../FormContext';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable, baseTextColor } from '../../../../utils/colorsTable';
import AddedLibraryBadges from './AddedLibraryBadges';
import ActionButton from '../../../Utils/ActionButton';

const LibraryBadges = (props) => {
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const { navigation, route, setIsConfirmCancelCreatingLibraryModalOpen } = useContext(LibrariesContext);
  const { formData, setFormData, setComponent } = useContext(FormContext);

  useEffect(() => {
    if (Object.values(formData.badges).length) {
      setIsDisabledNext(false);
    } else {
      setIsDisabledNext(true);
    }
  }, [formData.badges]);

  useEffect(() => {
    if (route.params?.addedLibraryBadges) {
      console.log('this is the badges...', route.params.addedLibraryBadges);
      // props.dispatch({ type: 'SET_LIBRARY_BADGES', payload: route.params.addedLibraryBadges });
      setFormData((previous) => {
        return {
          ...previous,
          badges: route.params.addedLibraryBadges,
        };
      });
    }
  }, [route.params?.addedLibraryBadges]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_ASSET_TYPE')}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_DESCRIPTION')}
            isDisabled={isDisabledNext}
          />
        </View>
        <View>
          <ActionButton
            label='Cancel'
            backgroundColor={iconColorsTable['red1']}
            icon={<AntDesign name='close' size={20} color={'white'} style={{ marginRight: 5 }} />}
            onActionButtonPress={() => {
              setFormData({ name: '', badges: {}, description: '', asset: null });
              setIsConfirmCancelCreatingLibraryModalOpen(true);
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['lightGreen1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Foundation name='sheriff-badge' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Badges</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor, marginBottom: 10 }}>
        What kind of photos/videos are people going to share in this library?
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          alignSelf: 'flex-end',
        }}
        onPress={() => {
          navigation.navigate('Add badges', {
            fromComponent: 'ADD_LIBRARY_BADGES',
            addedLibraryBadges: formData.badges,
          });
        }}
      >
        <SimpleLineIcons name='magnifier-add' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
        <Text style={{ color: baseTextColor }}>Add</Text>
      </TouchableOpacity>
      <AddedLibraryBadges />
    </View>
  );
};

export default LibraryBadges;
