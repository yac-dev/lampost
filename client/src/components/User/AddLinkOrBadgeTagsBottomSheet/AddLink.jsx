import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, inputBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../Utils/ActionButton';

const AddLink = () => {
  const { pressedBadgeData, addLinkOrBadgeTagsBottomSheetRef, addLinkOrBadgeTagsBottomSheetType } =
    useContext(UserContext);
  const [text, setText] = useState('');
  return (
    <View>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {addLinkOrBadgeTagsBottomSheetType}
      </Text>
      <Text style={{ color: baseTextColor, marginBottom: 5 }}>Please enter the link.{pressedBadgeData.badge._id}</Text>
      <BottomSheetTextInput
        placeholder='url'
        placeholderTextColor={baseTextColor}
        style={{ backgroundColor: inputBackgroundColor, padding: 10, borderRadius: 10, marginBottom: 10 }}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <View style={{ flexDirection: 'row' }}>
        <ActionButton
          label='Done'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='check' size={25} color='white' />}
          onActionButtonPress={() => null}
        />
      </View>
    </View>
  );
};

export default AddLink;
