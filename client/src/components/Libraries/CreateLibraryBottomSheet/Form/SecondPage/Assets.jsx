import React, { useContext, useEffect } from 'react';
import LibrariesContext from '../../../LibrariesContext';
import FormContext from '../../FormContext';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor } from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const Assets = () => {
  const { navigation, route } = useContext(LibrariesContext);
  const { formData, setFormData } = useContext(FormContext);
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

  // const renderAddedAssets = () => {
  //   const assetsList = Object.values(formData.assets).map((asset, index) => {
  //     return (
  //       <View
  //         key={index}
  //         style={{ width: oneAssetWidth, height: oneAssetWidth, marginRight: 10 }}
  //         onPress={() => onAssetPress(asset)}
  //       >
  //         <FastImage
  //           style={{ width: '100%', height: '100%' }}
  //           source={{
  //             uri: asset.data,
  //             priority: FastImage.priority.normal,
  //           }}
  //           resizeMode={FastImage.resizeMode.stretch}
  //         />
  //         {/* <View
  //           style={{
  //             top: -10,
  //             right: 0,
  //             position: 'absolute',
  //             color: '#989898',
  //           }}
  //         >
  //           <AntDesign name='close' size={25} color='red' />
  //         </View> */}
  //       </View>
  //     );
  //   });
  //   return <ScrollView horizontal={true}>{assetsList}</ScrollView>;
  // };

  console.log(formData);

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
          <Ionicons name='ios-images' size={25} color='white' />
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
