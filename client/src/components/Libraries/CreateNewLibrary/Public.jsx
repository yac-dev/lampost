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

const Public = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);

  useEffect(() => {
    if (typeof formData.public === 'boolean') {
      setStageCleared((previous) => {
        return {
          ...previous,
          public: true,
        };
      });
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          public: false,
        };
      });
    }
  }, [formData.public]);

  const renderCheckMarkForOpenToAnyone = () => {
    if (typeof formData.public === 'boolean') {
      if (formData.public) {
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

  const renderCheckMarkForJustFriends = () => {
    if (typeof formData.public === 'boolean') {
      if (formData.public) {
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

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                public: !previous.public,
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
            <MaterialCommunityIcons name='door-open' size={25} color={iconColorsTable['pink1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Public</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.public ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  public: !previous.public,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.public ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.public ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>
              Is this library open to anyone in this app or just your friends?
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: iconColorsTable['blue1'],
                marginRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    public: true,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Open to anyone</Text>
              {renderCheckMarkForOpenToAnyone()}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: iconColorsTable['blue1'],
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    public: false,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Just my friends</Text>
              {renderCheckMarkForJustFriends()}
            </TouchableOpacity>
          </View>
          {!formData.public ? (
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <MaterialCommunityIcons
                    name='human-greeting-variant'
                    size={20}
                    color='white'
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: 'white' }}>Invite your friends now? (Optional)</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default Public;
