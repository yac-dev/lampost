import React, { useState } from 'react';
import { View, Text } from 'react-native';

const BadgeTagForm = (props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: inputBackgroundColorNew,
          width: 40,
          height: 40,
          borderRadius: 8,
          marginRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons name='emoticon-excited-outline' size={25} color={baseTextColor} />
      </TouchableOpacity>
      <TextInput
        placeholder='text here'
        placeholderTextColor={baseTextColor}
        style={{ padding: 10, backgroundColor: inputBackgroundColorNew, borderRadius: 8, height: 40, flex: 1 }}
      />
    </View>
  );
};

export default BadgeTagForm;
