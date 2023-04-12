import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import EditMeetupContext from './EditMeetupContext';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
  sectionBackgroundColor,
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Place = () => {
  const { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } = iconsTable;
  const { myUpcomingMeetups, setSnackBar } = useContext(GlobalContext);
  const { accordion, setAccordion, meetup, editingData, setEditingData, stageCleared, setStageCleared } =
    useContext(EditMeetupContext);
  const [isStartDateAndTimeDatePickerVisible, setIsStartDateAndTimeDatePickerVisible] = useState(false);
  const [isDurationPickerVisible, setIsDurationPickerVisible] = useState(false);

  const myDates = Object.values(myUpcomingMeetups).map((meetup) => {
    const startDateAndTime = new Date(meetup.startDateAndTime);
    let endDateAndTime = new Date(startDateAndTime);
    endDateAndTime.setMinutes(startDateAndTime.getMinutes() + meetup.duration);

    return {
      _id: meetup._id,
      startDateAndTime,
      endDateAndTime,
    };
  });

  // console.log(myDates);

  // dateのvalidation
  useEffect(() => {
    if (myDates.length) {
      if (editingData.startDateAndTime.isEdited && editingData.duration.isEdited) {
        const launchingStartDateAndTimeString = new Date(editingData.startDateAndTime.data);
        let launchingEndDateAndTimeString = new Date(editingData.startDateAndTime.data);
        launchingEndDateAndTimeString = launchingEndDateAndTimeString.setMinutes(
          launchingStartDateAndTimeString.getMinutes() + editingData.duration.data
        );
        const launchingStartDateAndTime = launchingStartDateAndTimeString.getTime();
        const launchingEndDateAndTime = new Date(launchingEndDateAndTimeString).getTime();
        myDates.forEach((dateObject) => {
          const startDateAndTimeString = new Date(dateObject.startDateAndTime);
          const endDateAndTimeString = new Date(dateObject.endDateAndTime);
          const startDateAndTime = startDateAndTimeString.getTime();
          const endDateAndTime = endDateAndTimeString.getTime();
          if (
            (startDateAndTime < launchingStartDateAndTime && launchingStartDateAndTime < endDateAndTime) ||
            (startDateAndTime < launchingEndDateAndTime && launchingEndDateAndTime < endDateAndTime)
          ) {
            setSnackBar({
              isVisible: true,
              barType: 'error',
              message: 'OOPS. Not available this time. You have upcoming meetups on this time range.',
              duration: 3000,
            });
            setStageCleared((previous) => {
              return {
                ...previous,
                dateAndTime: false,
              };
            });
          } else if (
            launchingStartDateAndTime < startDateAndTime &&
            endDateAndTime - startDateAndTime < launchingEndDateAndTime - launchingStartDateAndTime
          ) {
            setSnackBar({
              isVisible: true,
              barType: 'error',
              message: 'OOPS. Not available this time. You have upcoming meetups on this time range.',
              duration: 3000,
            });
            setStageCleared((previous) => {
              return {
                ...previous,
                dateAndTime: false,
              };
            });
          } else {
            console.log("It's ok👍");
            setStageCleared((previous) => {
              return {
                ...previous,
                dateAndTime: true,
              };
            });
          }
        });
      }
    }
  }, [editingData.startDateAndTime, editingData.duration]);

  const onStartDateConfirm = (date) => {
    // もし、
    if (meetup.startDateAndTime === date) {
      return null;
    } else {
      setEditingData((previous) => {
        return {
          ...previous,
          startDateAndTime: {
            isEdited: true,
            data: date,
          },
        };
      });
      setIsStartDateAndTimeDatePickerVisible(false);
    }
  };

  // const disableConfirmButton = () => {
  //   if(editingData){}
  // }

  const onDurationConfirm = (date) => {
    const minutes = date.getMinutes() + date.getHours() * 60;
    if (meetup.duration === minutes) {
      // 値が一緒の場合は、editしたことにさせない。
      return null;
    } else {
      setEditingData((previous) => {
        return {
          ...previous,
          duration: {
            isEdited: true,
            data: minutes,
          },
        };
      });
      setIsDurationPickerVisible(false);
    }
  };

  const renderOriginalDate = (date) => {
    return (
      <Text style={{ color: 'white' }}>
        {editingData.startDateAndTime.isEdited ? '❌' : null}&nbsp;
        {`${new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}
      </Text>
    );
  };

  const renderEditedDate = () => {
    if (editingData.startDateAndTime.isEdited) {
      return (
        <Text style={{ color: 'white' }}>
          ✅&nbsp;
          {`${new Date(editingData.startDateAndTime.data).toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        </Text>
      );
    }
  };

  const renderOriginalDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return (
      <Text style={{ color: 'white' }}>
        {editingData.duration.isEdited ? '❌' : null}&nbsp;
        {`${hours} hours ${minutes} minutes`}
      </Text>
    );
  };

  const renderEditedDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return <Text style={{ color: 'white' }}>{`${hours} hours ${minutes} minutes`}</Text>;
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
            <Text style={{ fontSize: 13, color: baseTextColor }}>
              Please select date or duration if you need to change.
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
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
                <Text style={{ color: 'white', marginBottom: editingData.startDateAndTime.isEdited ? 5 : null }}>
                  {meetup ? renderOriginalDate(meetup.startDateAndTime) : null}
                </Text>
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
                <Text style={{ color: 'white', marginBottom: editingData.duration.isEdited ? 5 : null }}>
                  {meetup ? renderOriginalDuration(meetup.duration) : null}
                </Text>
                {editingData.duration.isEdited ? (
                  <Text style={{ color: 'white' }}>✅&nbsp;{renderEditedDuration(editingData.duration.data)}</Text>
                ) : null}
              </View>
            </View>
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
    </View>
  );
};

export default Place;
