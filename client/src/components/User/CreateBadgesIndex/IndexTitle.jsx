import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import CreateBadgesIndexContext from './createBadgesIndexContext';
import { baseTextColor, inputBackgroundColorNew } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const IndexTitle = () => {
  const { MaterialCommunityIcons } = iconsTable;
  const { indexTitleTextInput, setIndexTitleTextInput } = useContext(CreateBadgesIndexContext);

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        value={indexTitleTextInput}
        onChangeText={(text) => setIndexTitleTextInput(text)}
        placeholder='Write index title at first'
        placeholderTextColor={baseTextColor}
        // style={{ padding: 10, backgroundColor: inputBackgroundColorNew, borderRadius: 5 }}
        style={{ color: 'white', fontSize: 20, backgroundColor: inputBackgroundColorNew, padding: 10, borderRadius: 5 }}
      />
    </View>
  );
};

export default IndexTitle;
