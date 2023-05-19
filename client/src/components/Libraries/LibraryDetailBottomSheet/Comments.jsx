import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../LibrariesContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, MaterialIcons } = iconsTable;

const Comments = () => {
  const { selectedLibrary } = useContext(LibrariesContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <View style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => setIsAccordionOpen((previous) => !previous)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['lightBlue1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='comment-multiple-outline' size={20} color={iconColorsTable['lightBlue1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Comment</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>
            {selectedLibrary.isCommentAvailable ? 'Available' : 'Turned off'}
          </Text>
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
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {selectedLibrary.isCommentAvailable
              ? 'Enjoy giving some comments on each other.'
              : 'Comment feature is turned off in this library.'}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Comments;
