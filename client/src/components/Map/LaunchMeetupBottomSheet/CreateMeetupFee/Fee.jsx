import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColo,
  inputBackgroundColor,
  baseTextColor,
  sectionBackgroundColor,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const Fee = () => {
  const { Foundation, MaterialCommunityIcons, Fontisto } = iconsTable;
  const { formData, setFormData } = useContext(LaunchMeetupContext);
  const inputAccessoryViewID = 'FEE_INPUT';
  const inputAccessoryViewIDForFeeDetail = 'FEE_DETAIL_INPUT';

  const renderFeeForm = () => {
    if (!formData.isFeeFree) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Fontisto name='dollar' size={15} color={baseTextColor} style={{ padding: 10 }} />
          <View style={{ width: 130 }}>
            {/* <TextInput
            style={{ width: 200, marginLeft: 10, color: baseTextColor }}
            mode='outlined'
            label='How many people?'
            value={props.state.fee}
            onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_FEE', payload: text })}
          /> */}
            <BottomSheetTextInput
              style={{
                // flex: 1,
                padding: 10,
                backgroundColor: inputBackgroundColor,
                color: baseTextColor,
                borderRadius: 5,
              }}
              keyboardType='numeric'
              // maxLength={999} //setting limit of input
              placeholder='How much is it?'
              placeholderTextColor={baseTextColor}
              inputAccessoryViewID={inputAccessoryViewID}
              value={formData.fee}
              onChangeText={(text) =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    fee: text,
                  };
                })
              }
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
                    // launchMeetupBottomSheetRef.current.snapToIndex(0);
                  }}
                >
                  <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </InputAccessoryView>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <View
            style={{
              backgroundColor: backgroundColorsTable['yellow1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Foundation name='dollar-bill' size={25} color={iconColorsTable['yellow1']} />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginBottom: 5 }}>Fee</Text>
            <Text style={{ fontSize: 13, color: baseTextColor }}>Free to join?</Text>
          </View>
        </View>
        <View style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: iconColorsTable['blue1'],
                marginRight: 15,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isFeeFree: true,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>It's free</Text>
              {formData.isFeeFree ? (
                <View style={{ position: 'absolute', top: -8, right: -8 }}>
                  <MaterialCommunityIcons name='check-circle' color={'green'} size={20} />
                </View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: iconColorsTable['blue1'],
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 15,
              }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isFeeFree: false,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Not free</Text>
              {formData.isFeeFree ? null : (
                <View style={{ position: 'absolute', top: -8, right: -8 }}>
                  <MaterialCommunityIcons name='check-circle' color={'green'} size={20} />
                </View>
              )}
            </TouchableOpacity>
            {renderFeeForm()}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Fee;
