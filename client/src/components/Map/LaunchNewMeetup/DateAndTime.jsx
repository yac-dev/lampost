import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FormContext from './FormContext';
import { screenSectionBackgroundColor } from '../../../utils/colorsTable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { iconsTable } from '../../../utils/icons';
import { iconColorsTable, backgroundColorsTable, baseTextColor, disabledTextColor } from '../../../utils/colorsTable';

const DateAndTime = () => {
  const { auth, setSnackBar, myUpcomingMeetups } = useContext(GlobalContext);
  const { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared, accordion, setAccordion } = useContext(FormContext);
  const [isStartDateAndTimeDatePickerVisible, setIsStartDateAndTimeDatePickerVisible] = useState(false);
  const [isDurationPickerVisible, setIsDurationPickerVisible] = useState(false);

  // useEffect(() => {
  //   if (formData.startDateAndTime && formData.duration) {
  //     setStageCleared((previous) => {
  //       return {
  //         ...previous,
  //         dateAndTime: true,
  //       };
  //     });
  //   } else {
  //     setStageCleared((previous) => {
  //       return {
  //         ...previous,
  //         dateAndTime: false,
  //       };
  //     });
  //   }
  // }, [formData.startDateAndTime, formData.duration]);

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
      if (formData.startDateAndTime && formData.duration) {
        const launchingStartDateAndTimeString = new Date(formData.startDateAndTime);
        let launchingEndDateAndTimeString = new Date(formData.startDateAndTime);
        launchingEndDateAndTimeString = launchingEndDateAndTimeString.setMinutes(
          launchingStartDateAndTimeString.getMinutes() + formData.duration
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
              message: 'You have upcoming meetups on this time range.',
              duration: 3000,
            });
            setStageCleared((previous) => {
              return {
                ...previous,
                dateAndTime: false,
              };
            });
            // setIsDisabledNext(true);
          } else if (
            launchingStartDateAndTime < startDateAndTime &&
            endDateAndTime - startDateAndTime < launchingEndDateAndTime - launchingStartDateAndTime
          ) {
            setSnackBar({
              isVisible: true,
              barType: 'error',
              message: 'You have upcoming meetups on this time range.',
              duration: 3000,
            });
            setStageCleared((previous) => {
              return {
                ...previous,
                dateAndTime: false,
              };
            });
          } else {
            // console.log("It's ok👍");
            // setIsDisabledNext(false);
            setStageCleared((previous) => {
              return {
                ...previous,
                dateAndTime: true,
              };
            });
          }
        });
      }
    } else {
      if (formData.startDateAndTime && formData.duration) {
        setStageCleared((previous) => {
          return {
            ...previous,
            dateAndTime: true,
          };
        });
      } else {
        setStageCleared((previous) => {
          return {
            ...previous,
            dateAndTime: false,
          };
        });
      }
    }
  }, [formData.startDateAndTime, formData.duration]);

  const onStartDateConfirm = (date) => {
    setFormData((previous) => {
      return {
        ...previous,
        startDateAndTime: date,
      };
    });
    setIsStartDateAndTimeDatePickerVisible(false);
  };

  const onDurationConfirm = (date) => {
    const minutes = date.getMinutes() + date.getHours() * 60;
    setFormData((previous) => {
      return {
        ...previous,
        duration: minutes,
      };
    });
    setIsDurationPickerVisible(false);
  };

  const renderDate = (date) => {
    if (date) {
      return (
        <Text style={{ color: 'white' }}>{`${new Date(date).toLocaleString('en-US', {
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
      return <Text style={{ color: 'white' }}>{`${hours} hours ${minutes} minutes`}</Text>;
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
              backgroundColor: backgroundColorsTable['orange1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='calendar-clock' size={25} color={iconColorsTable['orange1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Date & Time</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.dateAndTime ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
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
              {renderDate(formData.startDateAndTime)}
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
              {renderDuration(formData.duration)}
            </View>
          </View>
          <DateTimePickerModal
            defaultDate={formData.startDateAndTime ? formData.startDateAndTime : null}
            isVisible={isStartDateAndTimeDatePickerVisible}
            mode='datetime'
            onConfirm={(date) => onStartDateConfirm(date)}
            onCancel={() => setIsStartDateAndTimeDatePickerVisible(false)}
            is24Hour={true}
            minimumDate={new Date()}
          />
          <DateTimePickerModal
            isVisible={isDurationPickerVisible}
            mode='time'
            date={new Date(new Date().setHours(1, 0, 0, 0))}
            onConfirm={(date) => onDurationConfirm(date)}
            onCancel={() => setIsDurationPickerVisible(false)}
            locale='en_GB'
          />
        </View>
      ) : null}
      {/* <DateTimePickerModal
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
      /> */}
    </View>
  );
};

export default DateAndTime;
