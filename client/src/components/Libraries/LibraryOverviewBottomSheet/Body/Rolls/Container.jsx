import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../../LibrariesContext';

const Container = () => {
  const { selectedLibrary, navigation } = useContext(LibrariesContext);

  const renderRolls = () => {
    if (selectedLibrary.rolls.length) {
      const rollsList = selectedLibrary.rolls.map((roll, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ padding: 10 }}
            onPress={() => navigation.navigate('Roll', { rollId: roll._id })}
          >
            <Text>{roll.name}</Text>
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
      <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>Rolls</Text>
      {renderRolls()}
    </View>
  );
};

export default Container;
