// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { IconButton, Button, Searchbar, Dialog, Portal, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';

// component
import HeaderFee from './HeaderFee';
import HeaderPermission from './HeaderPermission';
import MediaPermission from './MediaPermission';
import MeetupDate from './MeetupDate';
import MeetupAttendeesLimit from './MeetupAttendeesLimit';
import MeetupFee from './MeetupFee';

const Container = (props) => {
  return (
    <View>
      {/* <ScrollView contentContainerStyle={{ paddingBottom: 150 }}> */}
      <HeaderFee />
      <MeetupFee state={props.state} dispatch={props.dispatch} />
      <HeaderPermission />
      <MediaPermission state={props.state} dispatch={props.dispatch} />
      {/* <MeetupAttendeesLimit state={props.state} dispatch={props.dispatch} /> */}
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <ActionButton
          label='Back'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_DATE_AND_TIME', payload: '' })}
        />
        <ActionButton
          label='Next'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DESCRIPTION', payload: '' })}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

{
  /* <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_BADGE', payload: '' })}
          >
            <IconButton
              icon='arrow-left'
              iconColor={'blue'}
              size={20}
              // disabled={disableIconButton()}
            />
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DESCRIPTION', payload: '' })}
          >
            <Text>Next</Text>
            <IconButton
              icon='arrow-right'
              iconColor={'blue'}
              size={20}
              // disabled={disableIconButton()}
            />
          </TouchableOpacity>
        </View>
      </View> */
}

export default Container;
