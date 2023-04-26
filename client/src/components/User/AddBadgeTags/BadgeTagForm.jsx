import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { inputBackgroundColorNew, baseTextColor } from '../../../utils/colorsTable';

const BadgeTagForm = (props) => {
  useEffect(() => {}, []);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
      <TouchableOpacity
        style={{
          backgroundColor: inputBackgroundColorNew,
          width: 40,
          height: 40,
          borderRadius: 5,
          marginRight: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setTappedEmoji(index);
          props.navigation.navigate('Emoji picker');
        }}
      >
        {props.badgeTag.emoji ? (
          <Text style={{ fontSize: 30 }}>{props.badgeTag.emoji}</Text>
        ) : (
          <MaterialCommunityIcons name='emoticon-excited-outline' size={25} color={baseTextColor} />
        )}
      </TouchableOpacity>
      <TextInput
        placeholder='Type text here'
        placeholderTextColor={baseTextColor}
        style={{
          padding: 10,
          backgroundColor: inputBackgroundColorNew,
          borderRadius: 5,
          height: 40,
          flex: 1,
          color: baseTextColor,
          fontSize: 18,
        }}
        value={props.badgeTag.text}
        onChangeText={(text) =>
          props.setAddingprops.BadgeTags((previous) => {
            const updating = [...previous];
            updating[props.index].text = text;
            return updating;
          })
        }
      />
    </View>
  );
};

export default BadgeTagForm;
