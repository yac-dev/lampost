import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../../LibrariesContext';
import { baseBorderColor, baseTextColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';

const Container = () => {
  const { selectedLibrary, navigation } = useContext(LibrariesContext);

  const renderRolls = () => {
    if (selectedLibrary.rolls.length) {
      const rollsList = selectedLibrary.rolls.map((roll, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ padding: 20, borderBottomWidth: 0.3, borderBottomColor: baseBorderColor }}
            onPress={() => navigation.navigate('Roll', { rollId: roll._id })}
          >
            <Text style={{ color: baseTextColor }}>{roll.name}</Text>
          </TouchableOpacity>
        );
      });

      return <View>{rollsList}</View>;
    } else {
      return <Text>No rolls created yet...</Text>;
    }
  };
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10, color: 'white' }}>Rolls</Text>
      <View style={{ backgroundColor: sectionBackgroundColor, borderRadius: 10 }}>{renderRolls()}</View>
    </View>
  );
};

export default Container;
