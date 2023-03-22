import React, { useContext } from 'react';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import { Menu, Switch, TextInput } from 'react-native-paper';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  baseTextColor,
  inputBackgroundColor,
  sectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const AttendeesLimit = (props) => {
  const { MaterialIcons, MaterialCommunityIcons, Fontisto } = iconsTable;
  const { formData, setFormData } = useContext(LaunchMeetupContext);
  const inputAccessoryViewID = 'ATTENDEES_LIMIT_INPUT';

  // const renderSwitchState = () => {
  //   if (props.state.isMeetupAttendeesLimitFree) {
  //     return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>It's free.</Text>;
  //   } else {
  //     return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>It's not free.</Text>;
  //   }
  // };

  // console.log(props.state.meetupAttendeesLimit);

  const renderAttendeesLimitForm = () => {
    if (!formData.isAttendeesLimitFree) {
      return (
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
            placeholder='How many is it?'
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            value={formData.attendeesLimit}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  attendeesLimit: text,
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
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: backgroundColorsTable['blue1'],
            padding: 5,
            borderRadius: 7,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <MaterialIcons name='groups' size={25} color={iconColorsTable['blue1']} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginBottom: 5 }}>People</Text>
          <Text style={{ fontSize: 13, color: baseTextColor }}>How many people can join this meetup?</Text>
        </View>
      </View>

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
                isAttendeesLimitFree: true,
              };
            })
          }
        >
          <Fontisto name='unlocked' size={15} color={'white'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>It's free</Text>
          {formData.isAttendeesLimitFree ? (
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
                isAttendeesLimitFree: false,
              };
            })
          }
        >
          <Fontisto name='locked' size={15} color={'white'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white' }}>Limited</Text>
          {formData.isAttendeesLimitFree ? null : (
            <View style={{ position: 'absolute', top: -8, right: -8 }}>
              <MaterialCommunityIcons name='check-circle' color={'green'} size={20} />
            </View>
          )}
        </TouchableOpacity>
        {renderAttendeesLimitForm()}
        {/* {renderSwitchState()} */}
      </View>
      {/* {renderAttendeesLimitForm()} */}
    </View>
  );
};

export default AttendeesLimit;
