import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FormContext from './FormContext';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
  sectionBackgroundColor,
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const Title = () => {
  const { AntDesign, Ionicons, Entypo, FontAwesome5, Foundation, MaterialCommunityIcons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);

  useEffect(() => {
    if (formData.assetType) {
      setStageCleared((previous) => {
        return {
          ...previous,
          assetType: true,
        };
      });
    }
  }, [formData.assetType]);

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                assetType: !previous.assetType,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['violet1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons name='image' size={25} color={iconColorsTable['violet1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Snap type</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.assetType ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  assetType: !previous.assetType,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.assetType ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.assetType ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
            What kind of snap can you and members share in this library?
          </Text>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: '100%', padding: 5 }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  padding: 5,
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 5,
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
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <Ionicons name='image' color='white' size={20} style={{ marginRight: 10 }} />
                  <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Photos</Text>
                </View>
                <Text style={{ color: baseTextColor, textAlign: 'center' }}>
                  You and members can share only photos.
                </Text>
              </TouchableOpacity>
              {formData.assetType === 'photo' ? (
                <View style={{ position: 'absolute', right: -7, top: -7 }}>
                  <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
                </View>
              ) : null}
            </View>
            <View style={{ width: '100%', padding: 5 }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  padding: 5,
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 5,
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
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <Ionicons name='image' color='white' size={20} style={{ marginRight: 10 }} />
                  <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Videos</Text>
                </View>
                <Text style={{ color: baseTextColor, textAlign: 'center' }}>
                  You and members can share only videos.
                </Text>
              </TouchableOpacity>
              {formData.assetType === 'video' ? (
                <View style={{ position: 'absolute', right: -7, top: -7 }}>
                  <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
                </View>
              ) : null}
            </View>
            <View style={{ width: '100%', padding: 5 }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  padding: 5,
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 5,
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
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <Ionicons name='image' color='white' size={20} style={{ marginRight: 5 }} />
                    <Ionicons name='videocam' color='white' size={20} />
                  </View>
                  <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Photos & Videos</Text>
                </View>
                <Text style={{ color: baseTextColor, textAlign: 'center' }}>
                  You and members can share photos and videos.
                </Text>
              </TouchableOpacity>
              {formData.assetType === 'photoAndVideo' ? (
                <View style={{ position: 'absolute', right: -7, top: -7 }}>
                  <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Title;
