import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InboxContext from '../InboxContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, MaterialIcons, Fontisto, Ionicons } = iconsTable;

const SnapType = () => {
  const { selectedLibrary } = useContext(InboxContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const renderAssetType = (assetType) => {
    if (assetType === 'photo') {
      return <Text style={{ color: baseTextColor }}>Photo</Text>;
    } else if (assetType === 'video') {
      return <Text style={{ color: baseTextColor }}>Video</Text>;
    } else {
      return <Text style={{ color: baseTextColor }}>Photo & Video</Text>;
    }
  };

  const renderExplanation = (assetType) => {
    if (assetType === 'photo') {
      return <Text style={{ color: 'white', textAlign: 'center' }}>Here you can post photos only.</Text>;
    } else if (assetType === 'video') {
      return <Text style={{ color: 'white', textAlign: 'center' }}>Here you can post photos videos.</Text>;
    } else {
      return <Text style={{ color: 'white', textAlign: 'center' }}>Here you can post photos and videos.</Text>;
    }
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
            <Ionicons name='camera' size={20} color={iconColorsTable['pink1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Snap type</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderAssetType(selectedLibrary.assetType)}
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
        <View style={{ marginTop: 10, marginBottom: 10 }}>{renderExplanation(selectedLibrary.assetType)}</View>
      ) : null}
    </View>
  );
};

export default SnapType;
