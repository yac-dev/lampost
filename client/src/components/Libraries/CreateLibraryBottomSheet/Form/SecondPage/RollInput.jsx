import React, { useContext, useState } from 'react';
import FormContext from '../../FormContext';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';

const RollInput = (props) => {
  const { setForm } = useContext(FormContext);
  const [text, setText] = useState('');

  return (
    <BottomSheetTextInput
      // これ、多分配列ひとつひとつにcomponentを作って、そこにbottomsheetとstateっていう感じじゃないといかんな。
      placeholder='Library name'
      placeholderTextColor={baseTextColor}
      value={text}
      onChangeText={(text) => setText(text)}
      style={{ borderWidth: 0.3, padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor }}
      mode='outlined'
      autoCapitalize='none'
    />
  );
};

export default RollInput;
