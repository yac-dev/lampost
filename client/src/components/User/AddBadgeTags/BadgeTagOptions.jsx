import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import {
  screenSectionBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const BadgeTagOptions = () => {
  const { AntDesign, MaterialCommunityIcons, Ionicons } = iconsTable;
  const { badgeTagOptions, alreadyHaveBadgeTags, setAddedBadgeTags, setBadgeTagOptions } =
    useContext(AddBadgeTagsContext);

  const renderBadgeOptions = () => {
    const badgeTagOptionsList = Object.values(badgeTagOptions);
    if (badgeTagOptionsList.length) {
      const renderingList = badgeTagOptionsList.map((badgeTag, index) => {
        return (
          <View
            key={index}
            style={{
              padding: 10,
              backgroundColor: screenSectionBackgroundColor,
              borderRadius: 5,
              marginRight: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            disabled={alreadyHaveBadgeTags[badgeTag.name] ? true : false}
          >
            <Text style={{ color: 'white', marginRight: alreadyHaveBadgeTags[badgeTag.name] ? 5 : 5 }}>
              {badgeTag.name}
            </Text>
            {alreadyHaveBadgeTags[badgeTag.name] ? (
              <Text style={{ color: baseTextColor }}>(already have)</Text>
            ) : (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -7,
                  right: -7,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: iconColorsTable['blue1'],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setBadgeTagOptions((previous) => {
                    const updating = { ...previous };
                    delete updating[badgeTag.name];
                    return updating;
                  });
                  setAddedBadgeTags((previous) => {
                    return {
                      ...previous,
                      [badgeTag.name]: badgeTag,
                    };
                  });
                }}
              >
                <AntDesign name='plus' color={'white'} size={13} />
              </TouchableOpacity>
            )}
          </View>
        );
      });
      return (
        <View>
          <Text style={{ color: 'white', marginBottom: 15 }}>
            These are already created by other users. Chosse whatever tags you want.
          </Text>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>{renderingList}</View>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }}>No tags have been created for this badge yet🤔</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['lightGreen1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <Ionicons name='pricetags' color={iconColorsTable['lightGreen1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Options</Text>
        </View>
      </View>
      {renderBadgeOptions()}
    </View>
  );
};

export default BadgeTagOptions;
