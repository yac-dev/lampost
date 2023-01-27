import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import FormContext from '../FormContext';
import LibrariesContext from '../../LibrariesContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ActionButton from '../../../Utils/ActionButton';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  sectionBackgroundColor,
  inputBackgroundColor,
} from '../../../../utils/colorsTable';

const LibraryDescription = (props) => {
  const inputAccessoryViewID = 'LIBRARY_DESCRIPTION_INPUT';
  const { formData, setFormData, setComponent } = useContext(FormContext);
  const { setIsConfirmCancelCreatingLibraryModalOpen } = useContext(LibrariesContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

  useEffect(() => {
    if (formData.description.length && formData.description.length < 501) {
      setIsDisabledNext(false);
    } else {
      setIsDisabledNext(true);
    }
  }, [formData.description]);

  const renderDescriptionLength = () => {
    if (formData.description.length >= 501) {
      return <Text style={{ fontSize: 13, color: 'red' }}>OOPS! {formData.description.length}/500</Text>;
    } else {
      return <Text style={{ fontSize: 13, color: baseTextColor }}>{formData.description.length}/500</Text>;
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_BADGES')}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('LIBRARY_ASSET')}
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
            backgroundColor: iconColorsTable['green1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='message-text' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Description</Text>
      </View>
      <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor, marginRight: 10 }}>
          Please describe about this library.
        </Text>
        {renderDescriptionLength()}
      </View>
      <BottomSheetTextInput
        style={{
          // borderWidth: 0.3,
          // height: 100,
          flex: 1,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          padding: 10,
          color: baseTextColor,
        }}
        inputAccessoryViewID={inputAccessoryViewID}
        value={formData.description}
        onChangeText={(text) =>
          setFormData((previous) => {
            return {
              ...previous,
              description: text,
            };
          })
        }
        scrollEnabled={false}
        mode='outlined'
        autoCapitalize='none'
        multiline={true}
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

export default LibraryDescription;
