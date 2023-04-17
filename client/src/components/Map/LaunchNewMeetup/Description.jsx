import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
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

const Description = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion, navigation, route } =
    useContext(FormContext);
  const inputAccessoryViewID = 'MEETUP_DESCRIPTION';

  useEffect(() => {
    if (formData.description.length && formData.description.length <= 300) {
      setStageCleared((previous) => {
        return {
          ...previous,
          description: true,
        };
      });
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          description: false,
        };
      });
    }
  }, [formData.description]);

  useEffect(() => {
    if (route.params?.description) {
      setFormData((previous) => {
        return {
          ...previous,
          description: route.params.description,
        };
      });
    }
  }, [route.params?.description]);

  const renderDescriptionLength = () => {
    return (
      <Text
        style={{ fontSize: 13, color: formData.description.length <= 300 ? baseTextColor : 'red', textAlign: 'right' }}
      >
        {formData.description.length}/300
      </Text>
    );
  };

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                description: !previous.description,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['lightGreen1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialIcons name='description' size={25} color={iconColorsTable['lightGreen1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Description</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.description ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  description: !previous.description,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.description ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.description ? (
        <View style={{ marginTop: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 13, color: baseTextColor }}>
              Please write more deatils about this meetup or message to the attendees.
            </Text>
            {renderDescriptionLength()}
          </View>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 5,
              marginBottom: 10,
            }}
            onPress={() => {
              navigation.navigate('Write meetup description', { description: formData.description });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <AntDesign name='edit' size={20} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Write</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ color: 'white' }}>{formData.description}</Text>
          {/* <TextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColorNew,
              color: baseTextColor,
              borderRadius: 5,
              height: 150,
            }}
            scrollEnabled={false}
            multiline={true}
            inputAccessoryViewID={inputAccessoryViewID}
            value={formData.description}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  description: text,
                };
              })
            }
            autoCapitalize='none'
          />
          <InputAccessoryView
            nativeID={inputAccessoryViewID}
            backgroundColor={sectionBackgroundColor}
            // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
          >
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  // setAccordion((previous) => {
                  //   return {
                  //     ...previous,
                  //     title: !previous.title,
                  //   };
                  // });
                }}
              >
                <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView> */}
        </View>
      ) : null}
    </View>
  );
};

export default Description;
