import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { baseTextColor, iconColorsTable, backgroundColorsTable } from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import { iconsTable } from '../../../../utils/icons';

const DateAndTime = (props) => {
  const { MaterialCommunityIcons, MaterialIcons } = iconsTable;
  const { formData, setFormData, setComponent } = useContext(LaunchMeetupContext);
  const onStartDateConfirm = (date) => {
    // props.dispatch({ type: 'SET_START_DATE_AND_TIME', payload: date });
    // props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: false });
    setFormData((previous) => {
      return {
        ...previous,
        startDateAndTime: date,
        isStartDatePickerVisible: false,
      };
    });
  };

  const onDurationConfirm = (date) => {
    const minutes = date.getMinutes() + date.getHours() * 60;
    // props.dispatch({ type: 'SET_DURATION', payload: minutes });
    // props.dispatch({ type: 'SET_IS_DURATION_PICKER_VISIBLE', payload: false });
    setFormData((previous) => {
      return {
        ...previous,
        duration: minutes,
        isDurationPickerVisible: false,
      };
    });
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

  const renderDuration = (duration) => {
    if (duration) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return <Text style={{ color: baseTextColor }}>{`${hours} hours ${minutes} minutes`}</Text>;
    } else {
      return null;
    }
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: backgroundColorsTable['lightBlue1'],
            // padding: 5,
            borderRadius: 7,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <MaterialCommunityIcons name='calendar-clock' size={25} color={iconColorsTable['lightBlue1']} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginBottom: 5 }}>Date and Time</Text>
          <Text style={{ fontSize: 13, color: baseTextColor }}>When does it start? How long is it?</Text>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <ActionButton
              label='Start'
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isStartDatePickerVisible: true,
                  };
                })
              }
              icon={<MaterialIcons name='hourglass-top' size={25} color='white' />}
            />
            {renderDate(formData.startDateAndTime)}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActionButton
              label='Duration'
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    isDurationPickerVisible: true,
                  };
                })
              }
              icon={<MaterialIcons name='hourglass-bottom' size={25} color='white' />}
            />
            {renderDuration(formData.duration)}
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={formData.isStartDatePickerVisible}
        mode='datetime'
        onConfirm={(date) => onStartDateConfirm(date)}
        onCancel={() =>
          setFormData((previous) => {
            return {
              ...previous,
              isStartDatePickerVisible: false,
            };
          })
        }
        is24Hour={true}
        minimumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={formData.isDurationPickerVisible}
        mode='time'
        date={new Date(new Date().setHours(0, 0, 0, 0))}
        onConfirm={(date) => onDurationConfirm(date)}
        onCancel={() =>
          setFormData((previous) => {
            return {
              ...previous,
              isDurationPickerVisible: false,
            };
          })
        }
        locale='en_GB'
        {...props}
      />
    </View>
  );
};

export default DateAndTime;
