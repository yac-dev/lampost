import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import FormContext from './FormContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  disabledTextColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';

const UploadContent = () => {
  const { MaterialCommunityIcons, Ionicons, Foundation } = iconsTable;
  const { formData, setFormData, accordion, setAccordion, stageCleared, setStageCleared, navigation, route } =
    useContext(FormContext);
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
      setStageCleared((previous) => {
        return {
          ...previous,
          asset: true,
        };
      });
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          asset: false,
        };
      });
    }
  }, [formData.asset]);

  const renderAddedAsset = () => {
    if (formData.asset) {
      if (formData.asset.type === 'photo') {
        return (
          <TouchableOpacity style={{ width: oneAssetWidth, height: oneAssetWidth, alignSelf: 'center' }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 7 }}
              source={{
                uri: formData.asset.data,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
              <Ionicons name='camera' size={25} color={'white'} />
            </View>
          </TouchableOpacity>
        );
      } else if (formData.asset.type === 'video') {
        return (
          <TouchableOpacity style={{ width: oneAssetWidth, height: oneAssetWidth, alignSelf: 'center' }}>
            <Video
              style={{ width: '100%', height: '100%', borderRadius: 7 }}
              source={{
                uri: formData.asset.data,
              }}
              useNativeControls={false}
              resizeMode='stretch'
              isLooping={false}
            />
            {/* <View style={{ position: 'absolute', top: 10, right: 10 }}>
              <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[formData.asset.effect]]} />
            </View> */}
          </TouchableOpacity>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                asset: !previous.asset,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['lightBlue1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons name='cloud-upload' size={25} color={iconColorsTable['lightBlue1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Upload snap</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.asset ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  asset: !previous.asset,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.asset ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.asset ? (
        <View style={{ marginTop: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 13, color: baseTextColor }}>
              {formData.assetType ? 'Please select your snap you want to share.' : '⚠️ Choose the snap type at first.'}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: formData.assetType ? iconColorsTable['blue1'] : iconColorsTable['red1'],
              padding: 5,
              borderRadius: 5,
              width: '100%',
              marginBottom: 10,
            }}
            onPress={() => {
              navigation.navigate('Add assets', {
                fromComponent: 'ADD_ASSETS_FOR_LAUNCHING_LIBRARY',
                addedAsset: formData.asset,
                assetType: formData.assetType,
              });
            }}
            disabled={formData.assetType ? false : true}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', widht: '100%', alignSelf: 'center' }}>
              {formData.assetType ? (
                <Ionicons name='add' size={25} color={'white'} />
              ) : (
                <Foundation name='prohibited' color={'white'} size={25} />
              )}
              <Text style={{ color: 'white', marginLeft: 5 }}>Select</Text>
            </View>
          </TouchableOpacity>
          {renderAddedAsset()}
        </View>
      ) : null}
    </View>
  );
};

export default UploadContent;
