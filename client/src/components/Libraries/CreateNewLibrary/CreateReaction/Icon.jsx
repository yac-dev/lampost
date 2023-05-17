import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CreateReactionContext from './CreateReactionContext';
import FormContext from '../FormContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  disabledTextColor,
  rnDefaultBackgroundColor,
  inputBackgroundColorNew,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../../apis/lampost';

const Icon = () => {
  const {
    accordion,
    setAccordion,
    creatingReaction,
    setCreatingReaction,
    navigation,
    route,
    iconType,
    setIconType,
    currentlySelectedTab,
    setCurrentlySelectedTab,
    selectedEmoji,
    setSelectedEmoji,
    selectedReactionIcon,
    setSelectedReactionIcon,
  } = useContext(CreateReactionContext);
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const [icons, setIcons] = useState([]);
  const [isIconsFetched, setIsIconFetched] = useState(false);

  const switchRendering = () => {
    switch (currentlySelectedTab) {
      case 'emoji':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: baseTextColor }}>Please choose an emoji.</Text>
            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: inputBackgroundColorNew,
                borderRadius: 7,
              }}
              onPress={() => navigation.navigate('Emoji picker')}
            >
              {selectedEmoji ? (
                <Text style={{ fontSize: 25 }}>{selectedEmoji}</Text>
              ) : (
                <MaterialCommunityIcons name='plus' color={'white'} size={20} />
              )}
            </TouchableOpacity>
          </View>
        );
      case 'iconImage':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: baseTextColor }}>Please choose an icon image.</Text>
            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: inputBackgroundColorNew,
                borderRadius: 7,
              }}
              onPress={() => navigation.navigate('Reaction icon picker')}
            >
              {selectedReactionIcon ? (
                <FastImage source={{ uri: selectedReactionIcon.url }} style={{ width: 35, height: 35 }} />
              ) : (
                <MaterialCommunityIcons name='plus' color={'white'} size={20} />
              )}
            </TouchableOpacity>
          </View>
        );
      case 'custom':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: baseTextColor }}>Please select an original image.</Text>
            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: inputBackgroundColorNew,
                borderRadius: 7,
              }}
              onPress={() => navigation.navigate('Reaction icon picker')}
            >
              <MaterialCommunityIcons name='plus' color={'white'} size={20} />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (route.params?.selectedIcon) {
      setCreatingReaction((previous) => {
        return {
          ...previous,
          icon: route.params.selectedIcon,
        };
      });
    }
  }, [route.params?.selectedIcon]);

  useEffect(() => {
    if (route.params?.selectedEmoji) {
      setSelectedEmoji(route.params.selectedEmoji);
    }
  }, [route.params?.selectedEmoji]);

  useEffect(() => {
    if (route.params?.selectedReactionIcon) {
      setSelectedReactionIcon(route.params.selectedReactionIcon);
    }
  }, [route.params?.selectedReactionIcon]);

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
          <Text style={{ color: baseTextColor }}>{currentlySelectedTab}</Text>
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
          <Text style={{ color: baseTextColor, marginBottom: 10 }}>What kind of icon you wanna use?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                setIconType('emoji');
                setCurrentlySelectedTab('emoji');
              }}
              style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 7 }}
            >
              <Text>Emoji</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIconType('reactionIcon');
                setCurrentlySelectedTab('iconImage');
              }}
              style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 7 }}
            >
              <Text>Icon image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIconType('reactionIcon');
                setCurrentlySelectedTab('custom');
              }}
              style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, padding: 7 }}
            >
              <Text>Custom</Text>
            </TouchableOpacity>
          </View>
          {switchRendering()}
        </View>
      ) : null}
    </View>
  );
};

export default Icon;
