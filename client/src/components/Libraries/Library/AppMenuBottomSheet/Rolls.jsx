import React, { useContext } from 'react';
import LibraryContext from '../LibraryContext';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const Rolls = () => {
  const { appMenuBottomSheetRef, library, selectedRoll, setSelectedRoll } = useContext(LibraryContext);

  const selectRoll = (rollId) => {
    setSelectedRoll(rollId);
    appMenuBottomSheetRef.current.snapToIndex(0);
  };

  // <Image
  //             source={require('../../../../assets/app/icons8-film-roll-100.png')}
  //             style={{
  //               width: 30,
  //               height: 30,
  //             }}
  //           />

  const renderRolls = () => {
    if (library && selectedRoll) {
      const rollsList = library.rolls.map((roll, index) => {
        return (
          <TouchableOpacity key={index} style={{ padding: 10 }} onPress={() => selectRoll(roll._id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, backgroundColor: 'red', marginRight: 15, borderRadius: 10 }}></View>
              <Text style={{ color: selectedRoll === roll._id ? 'red' : 'white' }}>{roll.name}</Text>
            </View>
          </TouchableOpacity>
        );
      });
      return <View>{rollsList}</View>;
    } else {
      return null;
    }
  };

  return <ScrollView>{renderRolls()}</ScrollView>;
};

export default Rolls;
