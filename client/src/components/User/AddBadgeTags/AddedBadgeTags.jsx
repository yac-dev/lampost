import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import { iconColorsTable, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const AddedBadgeTags = () => {
  const { AntDesign } = iconsTable;
  const { addedBadgeTags, setAddedBadgeTags, setBadgeTagOptions } = useContext(AddBadgeTagsContext);

  const renderAddedBadgeTags = () => {
    const addedBadgeTagsList = Object.values(addedBadgeTags);
    if (addedBadgeTagsList) {
      return (
        <FlatList
          data={addedBadgeTagsList}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingTop: 10 }}>
                <View style={{ padding: 10, backgroundColor: screenSectionBackgroundColor, borderRadius: 5 }}>
                  <Text style={{ color: 'white' }}>{item.name}</Text>
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
                      setAddedBadgeTags((previous) => {
                        const updating = { ...previous };
                        delete updating[item.name];
                        return updating;
                      });
                      setBadgeTagOptions((previous) => {
                        const updating = { ...previous };
                        updating[item.name] = item;
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
          keyExtractor={(item, index) => `${item._id}-${index}`}
          horizontal={true}
        />
      );
    } else {
      return null;
    }
  };

  return <View style={{}}>{renderAddedBadgeTags()}</View>;
};

export default AddedBadgeTags;
