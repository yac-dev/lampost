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

const Member = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons, Fontisto } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);
  const inputAccessoryViewID = 'ATTENDEES_LIMIT_INPUT';

  useEffect(() => {
    if (typeof formData.isAttendeesLimitFree === 'boolean') {
      if (formData.isAttendeesLimitFree) {
        setStageCleared((previous) => {
          return {
            ...previous,
            member: true,
          };
        });
      } else {
        if (formData.attendeesLimit) {
          setStageCleared((previous) => {
            return {
              ...previous,
              member: true,
            };
          });
        } else {
          setStageCleared((previous) => {
            return {
              ...previous,
              member: false,
            };
          });
        }
      }
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          comment: false,
        };
      });
    }
  }, [formData.isAttendeesLimitFree, formData.attendeesLimit]);

  const renderCheckMarkForFree = () => {
    if (typeof formData.isAttendeesLimitFree === 'boolean') {
      if (formData.isAttendeesLimitFree) {
        return (
          <View style={{ position: 'absolute', right: -7, top: -7 }}>
            <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
          </View>
        );
      } else {
        return null;
      }
    }
  };

  const renderCheckMarkForLimited = () => {
    if (typeof formData.isAttendeesLimitFree === 'boolean') {
      if (formData.isAttendeesLimitFree) {
        return null;
      } else {
        return (
          <View style={{ position: 'absolute', right: -7, top: -7 }}>
            <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
          </View>
        );
      }
    }
  };

  const renderAttendeesLimitForm = () => {
    if (typeof formData.isAttendeesLimitFree === 'boolean') {
      if (!formData.isAttendeesLimitFree) {
        return (
          <View style={{ width: 130 }}>
            {/* <TextInput
              style={{ width: 200, marginLeft: 10, color: baseTextColor }}
              mode='outlined'
              label='How many people?'
              value={props.state.fee}
              onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_FEE', payload: text })}
            /> */}
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
              placeholder='How many is it?'
              placeholderTextColor={baseTextColor}
              inputAccessoryViewID={inputAccessoryViewID}
              value={formData.attendeesLimit}
              onChangeText={(text) =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    attendeesLimit: text,
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
        );
      }
    } else {
      return null;
    }
  };

  {
    /* <Text style={{ fontSize: 13, color: baseTextColor }}>How many people can join this meetup?</Text> */
  }
  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                member: !previous.member,
              };
            })
          }
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
            <MaterialCommunityIcons name='account-group' size={25} color={iconColorsTable['pink1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Member</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.member ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  member: !previous.member,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.member ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.member ? (
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'column', marginBottom: 10 }}>
            <Text style={{ fontSize: 13, color: baseTextColor }}>How many people can join this meetup?</Text>
          </View>
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
                    isAttendeesLimitFree: true,
                  };
                })
              }
            >
              <Fontisto name='unlocked' size={15} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>It's free</Text>
              {renderCheckMarkForFree()}
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
                    isAttendeesLimitFree: false,
                  };
                })
              }
            >
              <Fontisto name='locked' size={15} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Limited</Text>
              {renderCheckMarkForLimited()}
            </TouchableOpacity>
            {renderAttendeesLimitForm()}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Member;
