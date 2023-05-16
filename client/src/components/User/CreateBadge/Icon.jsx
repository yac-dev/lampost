import React, { useContext, useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
import * as ImagePicker from 'expo-image-picker';
import SVG from 'react-native-svg';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  rnDefaultBackgroundColor,
  inputBackgroundColorNew,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../apis/lampost';
const { MaterialCommunityIcons, FontAwesome5, Ionicons } = iconsTable;

const Icon = () => {
  const { auth, setLoading } = useContext(GlobalContext);
  const {
    accordion,
    setAccordion,
    navigation,
    badgeIcon,
    setBadgeIcon,
    chooseIconOrCreateIcon,
    setChooseIconOrCreateIcon,
    folderName,
    setFolderName,
  } = useContext(FormContext);

  const pickAndSendImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!pickedImage.cancelled && pickedImage.uri) {
      setLoading(true);
      const formData = new FormData();
      // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
      let creatingfolderName = `${auth.data._id}-${Date.now()}`;
      formData.append('userId', auth.data._id);
      if (folderName) {
        formData.append('exFolderName', folderName);
      }
      formData.append('folderName', creatingfolderName);
      formData.append('badgeIconImage', {
        name: `${auth.data._id}-${new Date()}`,
        uri: pickedImage.uri,
        type: 'image/jpeg',
      });
      const result = await lampostAPI.post('/badges/iconpreview', formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setFolderName(creatingfolderName);
      setLoading(false);
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
                icon: !previous.icon,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['red1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <FontAwesome5 name='icons' size={25} color={iconColorsTable['red1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Badge icon</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>{chooseIconOrCreateIcon}</Text>
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  icon: !previous.icon,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.icon ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.icon ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignSelf: 'center' }}
          >
            <TouchableOpacity
              style={{ flex: 0.5, paddingRight: 3 }}
              onPress={() => setChooseIconOrCreateIcon('choose')}
            >
              <View style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Choose</Text>
                {chooseIconOrCreateIcon === 'choose' ? (
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={iconColorsTable['green1']}
                    style={{ position: 'absolute', right: 0, top: -10 }}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
            <Text style={{ color: 'white' }}>Or</Text>
            <TouchableOpacity style={{ flex: 0.5, paddingLeft: 3 }} onPress={() => setChooseIconOrCreateIcon('create')}>
              <View style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Create(Easy😏)</Text>
                {chooseIconOrCreateIcon === 'create' ? (
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={iconColorsTable['green1']}
                    style={{ position: 'absolute', right: 0, top: -10 }}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
          {chooseIconOrCreateIcon === 'choose' ? (
            <View style={{}}>
              <Text style={{ color: baseTextColor, marginBottom: 10 }}>Please choose an icon for your badge.</Text>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  backgroundColor: badgeIcon ? rnDefaultBackgroundColor : inputBackgroundColorNew,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  alignSelf: 'center',
                }}
                onPress={() => navigation.navigate('Icon picker')}
              >
                {badgeIcon ? (
                  <FastImage source={{ uri: badgeIcon.url }} style={{ width: 60, height: 60 }} tintColor={'black'} />
                ) : (
                  <View style={{}}>
                    <MaterialCommunityIcons name='plus' size={30} color={'white'} style={{ alignSelf: 'center' }} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={{ color: baseTextColor, marginBottom: 10, fontSize: 13 }}>
                You can create an icon from your own image. Please select the original image from your phone and crop
                it. This function will remove all background objects of your photo and then genrate a simple looking and
                cutomizable icon image.
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <FastImage
                  source={require('../../../../assets/app/ex-original-naruto.png')}
                  style={{ width: 60, height: 60, borderRadius: 10, marginRight: 20 }}
                />
                <Ionicons name='arrow-forward-circle' size={40} color={'white'} style={{ marginRight: 20 }} />
                <View style={{ width: 60, height: 60, borderRadius: 10, backgroundColor: rnDefaultBackgroundColor }}>
                  <View
                    style={{
                      width: '100%',
                      aspectRatio: 1,
                      backgroundColor: backgroundColorsTable['red1'],
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                  >
                    <FastImage
                      source={require('../../../../assets/app/ex-icon-naruto.png')}
                      style={{ width: 45, height: 45, borderRadius: 10 }}
                      tintColor={iconColorsTable['red1']}
                    />
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 5, marginBottom: 10 }}
                  onPress={() => pickAndSendImage()}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Select</Text>
                </TouchableOpacity>
              </View>
              {folderName ? (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    backgroundColor: rnDefaultBackgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                >
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                    }}
                    source={{
                      uri: `http://192.168.11.30:3500/badgeImages/${folderName}/transparented.png`,
                      // priority: FastImage.priority.normal,
                    }}
                    tintColor={'black'}
                  />
                </View>
              ) : null}
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default Icon;
