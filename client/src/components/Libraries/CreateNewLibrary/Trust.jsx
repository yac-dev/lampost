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
    if (typeof formData.isTrustRequired === 'boolean') {
      if (formData.isTrustRequired) {
        if (formData.requiredTrust) {
          setStageCleared((previous) => {
            return {
              ...previous,
              trust: true,
            };
          });
        } else {
          setStageCleared((previous) => {
            return {
              ...previous,
              trust: false,
            };
          });
        }
      } else {
        setStageCleared((previous) => {
          return {
            ...previous,
            trust: true,
          };
        });
      }
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          trust: false,
        };
      });
    }
  }, [formData.isTrustRequired, formData.requiredTrust]);

  const renderCheckMarkForFree = () => {
    if (typeof formData.isTrustRequired === 'boolean') {
      if (formData.isTrustRequired) {
        return null;
      } else {
        return (
          <View style={{ position: 'absolute', right: -7, top: -7 }}>
            <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
          </View>
        );
      }
    } else {
      return null;
    }
  };

  const renderCheckMarkForRequired = () => {
    if (typeof formData.isTrustRequired === 'boolean') {
      if (formData.isTrustRequired) {
        return (
          <View style={{ position: 'absolute', right: -7, top: -7 }}>
            <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
          </View>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const renderTextInputForTrust = () => {
    if (typeof formData.isTrustRequired === 'boolean') {
      if (formData.isTrustRequired) {
        return (
          <TextInput
            style={{ backgroundColor: inputBackgroundColorNew, padding: 10, borderRadius: 5, color: baseTextColor }}
            placeholder='How much'
            placeholderTextColor={baseTextColor}
          />
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

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
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Trust requirements</Text>
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
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
              Are people required to have certain trust to join this library?
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    isTrustRequired: false,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>It's free</Text>
              {renderCheckMarkForFree()}
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
                    isTrustRequired: true,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Required</Text>
              {renderCheckMarkForRequired()}
            </TouchableOpacity>
            {renderTextInputForTrust()}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Title;
