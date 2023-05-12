import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LibrariesContext from '../LibrariesContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import FastImage from 'react-native-fast-image';
const { MaterialCommunityIcons, MaterialIcons, Ionicons } = iconsTable;

const Reactions = () => {
  const { selectedLibrary } = useContext(LibrariesContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const renderReactionIcons = () => {
    const list = selectedLibrary.reactions.slice(0, 2).map((reaction, index) => {
      return (
        <View
          key={index}
          style={{ width: 35, height: 35, backgroundColor: rnDefaultBackgroundColor, borderRadius: 5, marginRight: 5 }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: backgroundColorsTable[reaction.color],
              borderRadius: 5,
            }}
          >
            <FastImage
              source={{ uri: reaction.icon.url }}
              style={{ width: 30, height: 30 }}
              tintColor={iconColorsTable[reaction.color]}
            />
          </View>
        </View>
      );
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {list}
        {selectedLibrary.reactions.length > 2 ? <Text style={{ color: baseTextColor }}>...</Text> : null}
      </View>
    );
  };

  const renderReactions = () => {
    const list = selectedLibrary.reactions.map((reaction, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: rnDefaultBackgroundColor,
            borderRadius: 8,
            marginRight: 10,
          }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable[reaction.color],
              borderRadius: 8,
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FastImage
              source={{ uri: reaction.icon.url }}
              style={{ width: 45, height: 45, marginRight: 5 }}
              tintColor={iconColorsTable[reaction.color]}
            />
            <Text style={{ color: iconColorsTable[reaction.color], fontWeight: 'bold' }}>{reaction.comment}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  return (
    <View style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => setIsAccordionOpen((previous) => !previous)}
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
            <Ionicons name='ios-thumbs-up-sharp' size={20} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Reactions</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {selectedLibrary.isReactionAvailable ? (
            renderReactionIcons()
          ) : (
            <View>
              <Text style={{ color: baseTextColor }}>Not available</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => setIsAccordionOpen((previous) => !previous)}>
            <MaterialCommunityIcons
              name={isAccordionOpen ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isAccordionOpen ? (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          {selectedLibrary.isReactionAvailable ? (
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>
                You use these options to react each snap in this library.
              </Text>
              {renderReactions()}
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Just enjoy everyone's snaps without any reactions.
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default Reactions;
