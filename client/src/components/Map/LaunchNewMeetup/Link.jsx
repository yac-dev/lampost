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

const Link = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons, Octicons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);
  const inputAccessoryViewID = 'MEETUP_TITLE_INPUT';

  useEffect(() => {
    if (formData.title.length && formData.title.length <= 41) {
      setStageCleared((previous) => {
        return {
          ...previous,
          title: true,
        };
      });
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          title: false,
        };
      });
    }
  }, [formData.title]);

  const renderTitleLength = () => {
    if (formData.title.length <= 40) {
      return <Text style={{ fontSize: 13, color: baseTextColor }}>{formData.title.length}/40</Text>;
    } else {
      return <Text style={{ fontSize: 13, color: 'red' }}>OOPS! {formData.title.length}/40</Text>;
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
                link: !previous.link,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['grey1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='link-variant' size={25} color={iconColorsTable['grey1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Link (optional)</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.link ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          /> */}
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  link: !previous.link,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.link ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.link ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: baseTextColor }}>
            Please paste the external url of this meetup if you have.
          </Text>
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColorNew,
              color: baseTextColor,
              borderRadius: 5,
            }}
            placeholder={'https://abcde.com'}
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            value={formData.link}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  link: text,
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
                }}
              >
                <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </View>
      ) : null}
    </View>
  );
};

export default Link;
