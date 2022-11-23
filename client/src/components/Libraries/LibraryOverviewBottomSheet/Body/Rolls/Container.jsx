import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../../LibrariesContext';

const Container = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  const renderRolls = () => {
    if (selectedLibrary.rolls.length) {
      const rollsList = selectedLibrary.rolls.map((roll, index) => {
        return (
          <TouchableOpacity key={index} style={{ padding: 10 }}>
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
