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

const Comment = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons, Foundation } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);

  useEffect(() => {
    if (typeof formData.isCommentAvailable === 'boolean') {
      setStageCleared((previous) => {
        return {
          ...previous,
          comment: true,
        };
      });
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          comment: false,
        };
      });
    }
  }, [formData.isCommentAvailable]);

  const renderCheckMarkForAllow = () => {
    if (typeof formData.isCommentAvailable === 'boolean') {
      if (formData.isCommentAvailable) {
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

  const renderCheckMarkForDisable = () => {
    if (typeof formData.isCommentAvailable === 'boolean') {
      if (formData.isCommentAvailable) {
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
                comment: !previous.comment,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['orange1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='comment-alert' size={25} color={iconColorsTable['orange1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Comment</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.comment ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  comment: !previous.comment,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.comment ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.comment ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>Allow people to comment on each content?</Text>
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
                    isCommentAvailable: true,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Yes, allow</Text>
              {renderCheckMarkForAllow()}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: iconColorsTable['red1'],
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isCommentAvailable: false,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Disable comment</Text>
              {renderCheckMarkForDisable()}
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Comment;
