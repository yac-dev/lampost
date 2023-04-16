import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { screenSectionBackgroundColor } from '../../../utils/colorsTable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { iconsTable } from '../../../utils/icons';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

const DateAndTime = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);

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
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() =>
            setAccordion((previous) => {
              return {
                ...previous,
                dateAndTime: !previous.dateAndTime,
              };
            })
          }
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
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
            <MaterialCommunityIcons name='calendar-clock' size={25} color={iconColorsTable['yellow1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Date & Time</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} style={{ marginRight: 10 }} /> */}
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  dateAndTime: !previous.dateAndTime,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.dateAndTime ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {accordion.dateAndTime ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>When does it start? How long is it?</Text>
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 5,
                  padding: 10,
                  backgroundColor: iconColorsTable['blue1'],
                  marginRight: 10,
                }}
                onPress={() => setIsStartDateAndTimeDatePickerVisible(true)}
              >
                <MaterialIcons name='hourglass-top' color={'white'} size={20} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Start</Text>
              </TouchableOpacity>
              <View>
                {meetup ? renderOriginalDate(meetup.startDateAndTime) : null}
                {renderEditedDate()}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 5,
                  padding: 10,
                  backgroundColor: iconColorsTable['blue1'],
                  marginRight: 10,
                }}
                onPress={() => setIsDurationPickerVisible(true)}
              >
                <MaterialIcons name='hourglass-bottom' color={'white'} size={20} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Duration</Text>
              </TouchableOpacity>
              <View>
                {meetup ? renderOriginalDuration(meetup.duration) : null}
                {editingData.duration.isEdited ? (
                  <Text style={{ color: 'white' }}>{renderEditedDuration(editingData.duration.data)}</Text>
                ) : null}
              </View>
            </View>
            {/* {stageCleared.dateAndTime ? (
              <Text>👍</Text>
            ) : (
              <Text style={{ color: 'red' }}>This time range is not available because you have upcoming meetups</Text>
            )} */}
          </View>
          <DateTimePickerModal
            defaultDate={meetup ? meetup.startDateAndTime : null}
            isVisible={isStartDateAndTimeDatePickerVisible}
            mode='datetime'
            onConfirm={(date) => onStartDateConfirm(date)}
            onCancel={() => setIsStartDateAndTimeDatePickerVisible(false)}
            is24Hour={true}
            minimumDate={new Date()}
            isConfirmBtnDisabled={false}
          />
          <DateTimePickerModal
            isVisible={isDurationPickerVisible}
            mode='time'
            date={new Date(new Date().setHours(1, 0, 0, 0))}
            onConfirm={(date) => onDurationConfirm(date)}
            onCancel={() => setIsDurationPickerVisible(false)}
            locale='en_GB'
            isConfirmBtnDisabled={true}
          />
        </View>
      ) : null}
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
