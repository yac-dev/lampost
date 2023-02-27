import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import FormContext from '../FormContext';
import ActionButton from '../../../Utils/ActionButton';
import { iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const LibraryAssetType = () => {
  const { setComponent, setFormData, formData } = useContext(FormContext);
  const { setIsConfirmCancelCreatingLibraryModalOpen } = useContext(LibrariesContext);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_NAME')}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_BADGES')}
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
            backgroundColor: iconColorsTable['violet1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Fontisto name='photograph' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Asset type</Text>
      </View>
      <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', color: baseTextColor, marginRight: 10, marginBottom: 10 }}>
          What kind of asset do people post on this library?
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: iconColorsTable['blue1'],
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                assetType: 'photo',
              };
            })
          }
        >
          <Foundation name='photo' color='white' size={20} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Only photo</Text>
          {formData.assetType === 'photo' ? (
            <View style={{ position: 'absolute', right: -7, top: -7 }}>
              <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
            </View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: iconColorsTable['blue1'],
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                assetType: 'video',
              };
            })
          }
        >
          <Entypo name='video' color='white' size={20} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Only video</Text>
          {formData.assetType === 'video' ? (
            <View style={{ position: 'absolute', right: -7, top: -7 }}>
              <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: iconColorsTable['blue1'],
          borderRadius: 5,
          marginRight: 10,
          alignSelf: 'flex-start',
        }}
        onPress={() =>
          setFormData((previous) => {
            return {
              ...previous,
              assetType: 'photoAndVideo',
            };
          })
        }
      >
        <FontAwesome5 name='photo-video' color='white' size={20} style={{ marginRight: 10 }} />
        <Text style={{ color: 'white' }}>photo & video</Text>
        {formData.assetType === 'photoAndVideo' ? (
          <View style={{ position: 'absolute', right: -7, top: -7 }}>
            <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default LibraryAssetType;
