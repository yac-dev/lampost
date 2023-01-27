import React, { useContext, useState, useEffect } from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import FormContext from '../FormContext';
import LibrariesContext from '../../LibrariesContext';
import ActionButton from '../../../Utils/ActionButton';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  sectionBackgroundColor,
  inputBackgroundColor,
} from '../../../../utils/colorsTable';

const LibraryName = (props) => {
  const inputAccessoryViewID = 'LIBRARY_NAME_INPUT';
  const { setIsConfirmCancelCreatingLibraryModalOpen } = useContext(LibrariesContext);
  const { formData, setFormData, setComponent } = useContext(FormContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

  useEffect(() => {
    if (formData.name.length && formData.name.length < 41) {
      setIsDisabledNext(false);
    } else {
      setIsDisabledNext(true);
    }
  }, [formData.name]);

  const renderLibraryNameLength = () => {
    if (formData.name.length < 41) {
      return <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor }}>{formData.name.length}/40</Text>;
    } else {
      return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'red' }}>OOPS! {formData.name.length}/40</Text>;
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_BADGES')}
            isDisabled={isDisabledNext}
          />
        </View>
        <View>
          <ActionButton
            label='Cancel'
            backgroundColor={iconColorsTable['red1']}
            icon={<AntDesign name='close' size={20} color={'white'} style={{ marginRight: 5 }} />}
            onActionButtonPress={() => {
              setFormData({ name: '', badges: {}, description: '', asset: null });
              setIsConfirmCancelCreatingLibraryModalOpen(true);
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['red1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Ionicons name='library-outline' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Library name</Text>
      </View>
      <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor, marginRight: 10 }}>
          Please write the library name.
        </Text>
        {renderLibraryNameLength()}
      </View>
      <BottomSheetTextInput
        placeholder='In 40 characters long'
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={inputAccessoryViewID}
        style={{
          borderWidth: 0.3,
          padding: 10,
          borderRadius: 10,
          backgroundColor: inputBackgroundColor,
          color: baseTextColor,
        }}
        value={formData.name}
        onChangeText={(text) =>
          setFormData((previous) => {
            return {
              ...previous,
              name: text,
            };
          })
        }
        mode='outlined'
        autoCapitalize='none'
      />
      <InputAccessoryView
        nativeID={inputAccessoryViewID}
        backgroundColor={sectionBackgroundColor}
        // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
      >
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Text style={{ color: iconColorsTable['blue1'], fontSize: 17, padding: 10, fontWeight: 'bold' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </View>
  );
};

export default LibraryName;
