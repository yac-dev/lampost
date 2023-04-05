import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  disabledTextColor,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
import FastImage from 'react-native-fast-image';

const icons = [
  'animes',
  'apps',
  'artsAndCrafts',
  'books',
  'business',
  'dancing',
  'education',
  'family',
  'fashionAndBeauty',
  'films',
  'finance',
  'fitnessAndHealth',
  'foodsAndDrinks',
  'gamings',
  'languagesAndEthnic',
  'music',
  'outdoors',
  'petsAndAnimals',
  'photography',
  'spirituality',
  'sports',
  'tech',
  'vehicles',
  'videoGames',
  'writings',
];

const Icon = () => {
  const { accordion, setAccordion, creatingReaction, setCreatingReaction } = useContext(CreateReactionContext);
  const { MaterialCommunityIcons, Ionicons } = iconsTable;

  // const renderCheckMark = () => {
  //   if(creatingReaction.icon?.name){

  //   }
  // }
  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                icon: !previous.icon,
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
            <MaterialCommunityIcons name='thumb-up' size={25} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Icon</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  icon: !previous.icon,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.icon ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.icon ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 13, color: baseTextColor, marginBottom: 10 }}>Please choose an icon.</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            {icons.map((icon, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    setCreatingReaction((previous) => {
                      return {
                        ...previous,
                        icon: { name: icon, data: `https://lampost-dev.s3.us-east-2.amazonaws.com/icons/${icon}.png` },
                      };
                    })
                  }
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 7,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: rnDefaultBackgroundColor,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                      }}
                    >
                      <FastImage
                        source={{ uri: `https://lampost-dev.s3.us-east-2.amazonaws.com/icons/${icon}.png` }}
                        style={{ width: 30, height: 30, color: 'black' }}
                      />
                    </View>
                    <Text style={{ color: 'white', fontSize: 18 }}>{icon}</Text>
                  </View>
                  {creatingReaction.icon?.name === icon ? (
                    <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={25} />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default Icon;
