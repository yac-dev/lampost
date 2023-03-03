import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import { sectionBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const CreatedBadgeTags = () => {
  const { AntDesign } = iconsTable;
  const { createdBadgeTags, setCreatedBadgeTags } = useContext(AddBadgeTagsContext);

  const renderCreatedBadgeTags = () => {
    const createdBadgeTagsList = Object.values(createdBadgeTags);
    if (createdBadgeTagsList.length) {
      return (
        <FlatList
          data={createdBadgeTagsList}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingTop: 10 }}>
                <View style={{ padding: 10, backgroundColor: sectionBackgroundColor }}>
                  <Text>{item}</Text>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: -7,
                      right: -7,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: iconColorsTable['red1'],
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setCreatedBadgeTags((previous) => {
                        const updating = { ...previous };
                        delete updating[item];
                        return updating;
                      });
                    }}
                  >
                    <AntDesign name='minus' color={'white'} size={13} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal={true}
        />
      );
    }
  };

  return <View>{renderCreatedBadgeTags()}</View>;
};

export default CreatedBadgeTags;
