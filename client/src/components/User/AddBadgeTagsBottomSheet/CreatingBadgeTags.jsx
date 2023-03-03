import React from 'react';
import { View, Text } from 'react-native';

const CreatingBadgeTags = () => {
  const renderCreatingBadgeTags = () => {
    const createdBadgeTagsList = creatingBadgeTagNames.map((badgeTagName, index) => {
      return (
        <View
          style={{
            backgroundColor: screenSectionBackgroundColor,
            padding: 10,
            marginRight: 15,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          key={index}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{badgeTagName}</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -5,
              right: -10,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: iconColorsTable['red1'],
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              setCreatingBadgeTagNames((previous) => {
                const updating = [...previous];
                updating.splice(index, 1);
                return updating;
              })
            }
          >
            <Ionicons name='remove' size={15} color={'white'} />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Adding tags</Text>
        <ScrollView horizontal={true} style={{ paddingTop: 10, paddingBottom: 5 }}>
          {createdBadgeTagsList}
        </ScrollView>
      </View>
    );
  };
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default CreatingBadgeTags;
