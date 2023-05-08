import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
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
import FastImage from 'react-native-fast-image';

const Public = (props) => {
  const { AntDesign, Ionicons, MaterialCommunityIcons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion, navigation, route } =
    useContext(FormContext);

  console.log(formData.friends);

  useEffect(() => {
    if (typeof formData.isPublic === 'boolean') {
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
  }, [formData.isPublic]);

  useEffect(() => {
    if (route.params?.selectedFriends) {
      setFormData((previous) => {
        return {
          ...previous,
          friends: route.params.selectedFriends,
        };
      });
    }
  }, [route.params?.selectedFriends]);

  const renderCheckMarkForOpenToAnyone = () => {
    if (typeof formData.isPublic === 'boolean') {
      if (formData.isPublic) {
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
    if (typeof formData.isPublic === 'boolean') {
      if (formData.isPublic) {
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

  const renderSelectedFriends = () => {
    if (Object.values(formData.friends).length) {
      const list = Object.values(formData.friends).map((friendRelationship, index) => {
        return (
          <View key={index} style={{ marginRight: 10 }}>
            <FastImage
              source={{
                uri: friendRelationship.friend.photo
                  ? friendRelationship.friend.photo
                  : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              }}
              style={{
                backgroundColor: iconColorsTable['blue1'],
                width: 40,
                height: 40,
                borderRadius: 7,
                marginBottom: 5,
              }}
              tintColor={friendRelationship.friend.photo ? null : 'white'}
            />
            <Text style={{ color: 'white' }}>{friendRelationship.friend.name}</Text>
          </View>
        );
      });

      return (
        <View>
          <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
          </ScrollView>
          <TextInput
            placeholder='Please write the invitation message to your friend.'
            placeholderTextColor={baseTextColor}
            style={{ borderRadius: 5, backgroundColor: inputBackgroundColorNew, padding: 10, color: 'white' }}
            value={formData.invitationMessage}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  invitationMessage: text,
                };
              })
            }
          />
        </View>
      );
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
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Visibility</Text>
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
            <Text style={{ fontSize: 13, color: baseTextColor }}>Who can join this library?</Text>
          </View>
          <View style={{ width: '100%', padding: 5 }}>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: iconColorsTable['blue1'],
                width: '100%',
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isPublic: true,
                  };
                })
              }
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>Public</Text>
              <Text style={{ color: baseTextColor, textAlign: 'center' }}>Everyone can join this library.</Text>
              {renderCheckMarkForOpenToAnyone()}
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', padding: 5 }}>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: iconColorsTable['blue1'],
                width: '100%',
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isPublic: false,
                  };
                })
              }
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>Private</Text>
              <Text style={{ textAlign: 'center', color: baseTextColor }}>
                Only you and meetup friends can join this library.
              </Text>
              {renderCheckMarkForJustFriends()}
            </TouchableOpacity>
          </View>
          {typeof formData.isPublic === 'boolean' && !formData.isPublic ? (
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 5, marginBottom: 10 }}
                onPress={() => navigation.navigate('My friends', { selectedFriendships: formData.friends })}
              >
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
              {renderSelectedFriends()}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default Public;
