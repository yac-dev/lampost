import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu, Switch } from 'react-native-paper';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseTextColor } from '../../../../../utils/colorsTable';
import ActionButton from '../../../../Utils/ActionButton';

const Deadline = (props) => {
  const onStartDateConfirm = (date) => {
    props.dispatch({ type: 'SET_START_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: false });
  };

  const onEndDateConfirm = (date) => {
    props.dispatch({ type: 'SET_END_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_END_DATE_PICKER_VISIBLE', payload: false });
  };

  const onApplicationDeadlineConfirm = (date) => {
    props.dispatch({ type: 'SET_APPLICATION_DEADLINE', payload: date });
    props.dispatch({ type: 'SET_IS_APPLICATION_DEADLINE_PICKER_VISIBLE', payload: false });
  };

  const renderDate = (date) => {
    if (date) {
      return (
        <Text style={{ color: baseTextColor }}>{`${new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}</Text>
      );
    } else {
      return null;
    }
  };
  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
          Until when can people apply for join this meetup?
        </Text>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
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
            <MaterialCommunityIcons name='login' size={25} color='white' />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Application deadline</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
              Until when can the users apply for join this meetup?
            </Text>
          </View>
        </View> */}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Button
              style={{ marginRight: 10, marginBottom: 10 }}
              mode='outlined'
              onPress={() => props.dispatch({ type: 'SET_IS_APPLICATION_DEADLINE_PICKER_VISIBLE', payload: true })}
            >
              Deadline
            </Button> */}
            <ActionButton
              label='Deadline'
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() =>
                props.dispatch({ type: 'SET_IS_APPLICATION_DEADLINE_PICKER_VISIBLE', payload: true })
              }
              icon={<Octicons name='stop' size={25} color='white' />}
            />
            {renderDate(props.state.applicationDeadline)}
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={props.state.isApplicationDeadlinePickerVisible}
        mode='datetime'
        onConfirm={(date) => onApplicationDeadlineConfirm(date)}
        onCancel={() => props.dispatch({ type: 'SET_IS_APPLICATION_DEADLINE_PICKER_VISIBLE', payload: false })}
        is24Hour={true}
      />
    </View>
  );
};

export default Deadline;
