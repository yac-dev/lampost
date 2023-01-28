import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../../GlobalContext';
import LibrariesContext from '../../LibrariesContext';
import FormContext from '../FormContext';
import lampostAPI from '../../../../apis/lampost';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import ActionButton from '../../../Utils/ActionButton';

const Assets = () => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const {
    navigation,
    route,
    createLibraryBottomSheetRef,
    setIsConfirmCancelCreatingLibraryModalOpen,
    setMyJoinedLibraries,
    setLibraries,
  } = useContext(LibrariesContext);
  const { formData, setFormData, setComponent } = useContext(FormContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const oneAssetWidth = Dimensions.get('window').width / 3;

  useEffect(() => {
    if (route.params?.addedAsset) {
      console.log('These are assets for launching', route.params.addedAsset);
      setFormData((previous) => {
        return {
          ...previous,
          asset: route.params.addedAsset,
        };
      });
    }
  }, [route.params?.addedAsset]);

  useEffect(() => {
    if (formData.asset) {
      setIsDisabledNext(false);
    } else {
      setIsDisabledNext(true);
    }
  }, [formData.asset]);

  const onCreatePress = async () => {
    const launcher = {
      _id: auth.data._id,
      name: auth.data.name,
      photo: auth.data.photo,
    };

    const payload = {
      name: formData.name,
      badges: Object.values(formData.badges),
      description: formData.description,
      asset: {
        _id: formData.asset._id,
        badges: formData.asset.badges,
        data: formData.asset.data,
      },
      launcher,
    };

    const result = await lampostAPI.post(`/libraries`, payload);
    const { library } = result.data;
    setMyJoinedLibraries((previous) => [...previous, library]);
    setLibraries((previous) => [...previous, library]);
    createLibraryBottomSheetRef.current.close();
    setSnackBar({
      isVisible: true,
      message: 'Launched your library.',
      barType: 'success',
      duration: 5000,
    });
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_DESCRIPTION')}
          />
          <ActionButton
            label='Finish'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='check' color={'white'} size={25} />}
            onActionButtonPress={() => onCreatePress()}
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
            backgroundColor: iconColorsTable['grey1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='film' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Asset</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor, marginBottom: 10 }}>
        Please select your photo or video to upload.
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          alignSelf: 'flex-end',
        }}
        onPress={() => {
          navigation.navigate('Add assets', {
            fromComponent: 'ADD_ASSETS_FOR_LAUNCHING_LIBRARY',
            addedAsset: formData.asset,
          });
          console.log('open my assets page!');
        }}
      >
        <SimpleLineIcons name='magnifier-add' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
        <Text style={{ color: baseTextColor }}>Add</Text>
      </TouchableOpacity>
      {formData.asset ? (
        <View style={{ width: oneAssetWidth, height: oneAssetWidth, marginRight: 10 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: formData.asset.data,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
      ) : null}
      {/* {renderAddedAssets()} */}
    </View>
  );
};

export default Assets;
