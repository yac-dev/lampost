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

const Title = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons } = iconsTable;
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
            <AntDesign name='edit' size={25} color={iconColorsTable['red1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Title</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.title ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
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
      {accordion.title ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>
              Please write the meetup title in simple and catchy.
            </Text>
            {renderTitleLength()}
          </View>
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColorNew,
              color: baseTextColor,
              borderRadius: 5,
            }}
            inputAccessoryViewID={inputAccessoryViewID}
            value={formData.title}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  title: text,
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
                  setAccordion((previous) => {
                    return {
                      ...previous,
                      title: !previous.title,
                    };
                  });
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

export default Title;
