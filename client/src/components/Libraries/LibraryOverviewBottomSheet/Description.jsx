import React, { useContext } from 'react';
import LibrariesContext from '../LibrariesContext';
import { View, Text } from 'react-native';
import { baseTextColor, baseBackgroundColor } from '../../../utils/colorsTable';

const Description = (props) => {
  return (
    <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, flex: 1, backgroundColor: baseBackgroundColor }}>
      <Text style={{ color: 'white', fontSize: 18 }}>{props.route.params.description}</Text>
    </View>
  );
};

export default Description;
