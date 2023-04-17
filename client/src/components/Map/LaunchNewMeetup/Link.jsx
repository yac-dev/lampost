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
                title: !previous.title,
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
            color={stageCleared.title ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          /> */}
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  title: !previous.title,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.title ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Link;
