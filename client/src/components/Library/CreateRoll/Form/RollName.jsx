import React from 'react';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const RollName = (props) => {
  return (
    <View>
      <Text>Roll name here</Text>
      <BottomSheetTextInput placeholder='Roll name' style={{ borderWidth: 0.3 }} />
    </View>
  );
};

export default RollName;
