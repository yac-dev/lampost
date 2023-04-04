import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FormContext from './FormContext';
import {
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  disabledTextColor,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import FastImage from 'react-native-fast-image';

const Badges = () => {
  const { Ionicons, Foundation, MaterialCommunityIcons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, navigation, route, accordion, setAccordion } =
    useContext(FormContext);

  useEffect(() => {
    if (Object.values(formData.badges).length && Object.values(formData.badges).length <= 5) {
      setStageCleared((previous) => {
        return {
          ...previous,
          badges: true,
        };
      });
    } else {
      setStageCleared((previous) => {
        return {
          ...previous,
          badges: false,
        };
      });
    }
  }, [formData.badges]);

  useEffect(() => {
    if (route.params?.addedLibraryBadges) {
      console.log('this is the badges...', route.params.addedLibraryBadges);
      // props.dispatch({ type: 'SET_LIBRARY_BADGES', payload: route.params.addedLibraryBadges });
      setFormData((previous) => {
        return {
          ...previous,
          badges: route.params.addedLibraryBadges,
        };
      });
    }
  }, [route.params?.addedLibraryBadges]);

  const renderBadges = () => {
    const badges = Object.values(formData.badges);
    if (badges.length) {
      const addedBadgesList = badges.map((badge, index) => {
        return (
          <View
            key={index}
            style={{
              width: 60, // さらにbadgeを覆う必要がある。textも含めた守備範囲が必要だ。
              height: 75,
              // backgroundColor: 'red',
              alignItems: 'center',
              // justifyContent: 'center', // これで、verticallyにもcenterにする。
            }}
          >
            <View
              style={{
                backgroundColor: rnDefaultBackgroundColor,
                width: 45,
                height: 45,
                borderRadius: 7,
                marginBottom: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center', // これと
                  justifyContent: 'center', // これで中のimageを上下左右真ん中にする
                  borderRadius: 7,
                  backgroundColor: backgroundColorsTable[badge.color],
                  borderColor: backgroundColorsTable[badge.color],
                  borderWidth: 0.3,
                }}
              >
                <FastImage
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: badge.icon,
                    priority: FastImage.priority.normal,
                  }}
                  tintColor={iconColorsTable[badge.color]}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                // alignSelf: 'center',
                fontSize: 12,
                textAlign: 'center',
                color: baseTextColor,
              }}
            >
              {badge.name}
            </Text>
          </View>
        );
      });

      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>{addedBadgesList}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  const renderBadgesLength = () => {
    return (
      <Text style={{ color: Object.keys(formData.badges).length <= 5 ? baseTextColor : 'red' }}>
        {Object.keys(formData.badges).length}/5
      </Text>
    );
  };

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                badges: !previous.badges,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['green1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Foundation name='sheriff-badge' size={25} color={iconColorsTable['green1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Badges</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.badges ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  badges: !previous.badges,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.badges ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.badges ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>What is your library about?</Text>
            {renderBadgesLength()}
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: iconColorsTable['blue1'],
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                marginBottom: 10,
              }}
              onPress={() => {
                navigation.navigate('Add badges', {
                  fromComponent: 'ADD_LIBRARY_BADGES',
                  addedLibraryBadges: formData.badges,
                });
              }}
            >
              <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='add' color={'white'} size={20} />
                <Text style={{ color: 'white' }}>Add</Text>
              </View>
            </TouchableOpacity>
            {renderBadges()}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Badges;
