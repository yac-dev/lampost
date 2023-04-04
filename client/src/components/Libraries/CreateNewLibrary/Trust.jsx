import React, { useContext, useEffect } from 'react';
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
  const inputAccessoryViewID = 'TITLE_INPUT';

  useEffect(() => {
    // if (formData.title.length && formData.title.length <= 41) {
    //   setStageCleared((previous) => {
    //     return {
    //       ...previous,
    //       title: true,
    //     };
    //   });
    // } else {
    //   setStageCleared((previous) => {
    //     return {
    //       ...previous,
    //       title: false,
    //     };
    //   });
    // }
  }, [formData.title]);

  useEffect(() => {
    if (formData.isRequiredTrust === false) {
      setStageCleared(true);
    } else if (formData.isRequiredTrust && formData.requiredTrust) {
      setStageCleared(true);
    } else {
      setStageCleared(false);
    }
  }, [formData.isRequiredTrust, formData.requiredTrust]);

  // <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  //           <Text style={{ fontSize: 13, color: baseTextColor, marginRight: 20 }}>
  //             Required to have certain trust for people to join this library?
  //           </Text>
  //         </View>

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => {
            setAccordion((previous) => {
              return {
                ...previous,
                trust: !previous.trust,
              };
            });
          }}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['pink1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons name='ios-heart' size={25} color={iconColorsTable['pink1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Trust</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.trust ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() => {
              setAccordion((previous) => {
                return {
                  ...previous,
                  trust: !previous.trust,
                };
              });
            }}
          >
            <MaterialCommunityIcons
              name={accordion.trust ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.trust ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
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
                  isRequiredTrust: false,
                };
              })
            }
          >
            <Text style={{ color: 'white' }}>No. It's free</Text>
            {formData.isRequiredTrust === false ? (
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
                  isRequiredTrust: true,
                };
              })
            }
          >
            <Text style={{ color: 'white' }}>Required</Text>
            {formData.isRequiredTrust === false ? null : (
              <View style={{ position: 'absolute', right: -7, top: -7 }}>
                <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
              </View>
            )}
          </TouchableOpacity>
          <TextInput
            style={{ backgroundColor: inputBackgroundColorNew, padding: 10, borderRadius: 5, color: baseTextColor }}
            placeholder='How much'
            placeholderTextColor={baseTextColor}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Title;
