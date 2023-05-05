import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    const list = selectedLibrary.reactions.map((reaction, index) => {
      return (
        <View key={index} style={{ width: 40, height: 40, backgroundColor: rnDefaultBackgroundColor, borderRadius: 5 }}>
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

    return <View>{list}</View>;
  };

  const renderReactions = () => {};

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
              <MaterialIcons name='do-not-disturb-on' color={iconColorsTable['yellow1']} size={20} />
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
            <View>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                You use these options to like/upvote each snap.
              </Text>
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Just enjoy the photos and videos without any upvotes/likes!
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default Reactions;
