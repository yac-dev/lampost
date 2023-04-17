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

const Fee = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons, Foundation, Fontisto } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);
  const inputAccessoryViewID = 'MEETUP_FEE_INPUT';

  useEffect(() => {
    if (typeof formData.isFeeFree === 'boolean') {
      if (formData.isFeeFree) {
        setStageCleared((previous) => {
          return {
            ...previous,
            fee: true,
          };
        });
      } else {
        if (formData.fee) {
          setStageCleared((previous) => {
            return {
              ...previous,
              fee: true,
            };
          });
        } else {
          setStageCleared((previous) => {
            return {
              ...previous,
              fee: false,
            };
          });
        }
      }
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          fee: false,
        };
      });
    }
  }, [formData.isFeeFree, formData.fee]);

  const renderFeeForm = () => {
    if (typeof formData.isFeeFree === 'boolean') {
      if (!formData.isFeeFree) {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Fontisto name='dollar' size={15} color={baseTextColor} style={{ padding: 10 }} />
            <View style={{ width: 130 }}>
              <TextInput
                style={{
                  // flex: 1,
                  padding: 10,
                  backgroundColor: inputBackgroundColorNew,
                  color: baseTextColor,
                  borderRadius: 5,
                }}
                keyboardType='numeric'
                // maxLength={999} //setting limit of input
                placeholder='How much is it?'
                placeholderTextColor={baseTextColor}
                inputAccessoryViewID={inputAccessoryViewID}
                value={formData.fee}
                onChangeText={(text) =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      fee: text,
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
                      // launchMeetupBottomSheetRef.current.snapToIndex(0);
                    }}
                  >
                    <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
                  </TouchableOpacity>
                </View>
              </InputAccessoryView>
            </View>
          </View>
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
                fee: !previous.fee,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['yellow1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Foundation name='dollar-bill' size={25} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Fee</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.fee ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  fee: !previous.fee,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.fee ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.fee ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 13, color: baseTextColor, marginBottom: 10 }}>Is it free to join?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: iconColorsTable['blue1'],
                marginRight: 15,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isFeeFree: true,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>It's free</Text>
              {formData.isFeeFree ? (
                <View style={{ position: 'absolute', top: -8, right: -8 }}>
                  <MaterialCommunityIcons name='check-circle' color={'green'} size={20} />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: iconColorsTable['blue1'],
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 15,
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isFeeFree: false,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Not free</Text>
              {/* {formData.isFeeFree ? null : (
                <View style={{ position: 'absolute', top: -8, right: -8 }}>
                  <MaterialCommunityIcons name='check-circle' color={'green'} size={20} />
                </View>
              )} */}
            </TouchableOpacity>
            {renderFeeForm()}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Fee;
