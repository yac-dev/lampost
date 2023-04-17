import React, { useContext, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import DateContext from './DateContext';
import lampostAPI from '../../../../apis/lampost';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  appBottomSheetBackgroundColor,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
import EditBottomSheet from './EditBottomSheet';

const DateCompo = (props) => {
  const snapPoints = ['35%'];
  const { MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo } = iconsTable;
  const { auth, setMyUpcomingMeetups } = useContext(GlobalContext);
  const [startDateAndTime, setStartDateAndTime] = useState(props.route.params.date);
  const [duration, setDuration] = useState(props.route.params.duration);
  const [editing, setEditing] = useState('');
  const [isDateTimePickerModalOpen, setIsDateTimePickerModalOpen] = useState(false);
  const [isDurationPickerModalOpen, setIsDurationPickerModalOpen] = useState(false);
  const [editedStartDateAndTime, setEditedStartDateAndTime] = useState(null);
  const [editedDuration, setEditedDuration] = useState(null);
  const editBottomSheetRef = useRef(null);

  const onStartDateAndTimeConfirm = (date) => {
    setEditedStartDateAndTime(date);
    setIsDateTimePickerModalOpen(false);
  };

  const onDurationConfirm = (date) => {
    const minutes = date.getMinutes() + date.getHours() * 60;
    setEditedDuration(minutes);
    setIsDurationPickerModalOpen(false);
  };

  const renderDate = (date) => {};

  // const renderDateAndTime = (date) => {
  //   const k = new Date(date).toLocaleDateString('en-US', {
  //     day: '2-digit',
  //     month: '2-digit',
  //   })
  // }

  const renderEdit = (field) => {
    if (auth.data._id === props.route.params.launcherId) {
      return (
        <TouchableOpacity
          onPress={() => {
            setEditing(field);
            editBottomSheetRef.current.snapToIndex(0);
          }}
          style={{
            backgroundColor: iconColorsTable['blue1'],
            padding: 5,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <MaterialIcons name='edit' color={'white'} size={20} style={{ marginRight: 5 }} />
          <Text style={{ color: 'white' }}>Edit</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  return (
    <DateContext.Provider
      value={{
        launcherId: props.route.params.launcherId,
        meetupId: props.route.params.meetupId,
        startDateAndTime,
        setStartDateAndTime,
        duration,
        setDuration,
        editing,
        setEditing,
        isDateTimePickerModalOpen,
        setIsDateTimePickerModalOpen,
        isDurationPickerModalOpen,
        setIsDurationPickerModalOpen,
        editedStartDateAndTime,
        setEditedStartDateAndTime,
        editedDuration,
        setEditedDuration,
        editBottomSheetRef,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}
          >
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 7,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    backgroundColor: backgroundColorsTable['violet1'],
                  }}
                >
                  <MaterialCommunityIcons name='party-popper' size={20} color={iconColorsTable['violet1']} style={{}} />
                </View>
                <Text style={{ color: 'white', fontSize: 20 }}>Starts at</Text>
              </View>
              <Text style={{ color: 'white', fontSize: 20 }}>{`${new Date(startDateAndTime).toLocaleDateString(
                'en-US',
                {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }
              )}`}</Text>
            </View>
            {/* {renderEdit('startDateAndTime')} */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 7,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: backgroundColorsTable['green1'],
                  marginRight: 10,
                }}
              >
                <MaterialIcons name='hourglass-top' size={20} color={iconColorsTable['green1']} style={{}} />
              </View>
              <Text style={{ color: 'white', fontSize: 20 }}>Duration</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 20 }}>{duration} minutes</Text>
          </View>
          {/* {renderEdit('duration')} */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View
                style={{
                  marginRight: 10,
                  width: 40,
                  height: 40,
                  backgroundColor: backgroundColorsTable['blue1'],
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                }}
              >
                <Entypo name='open-book' size={20} color={iconColorsTable['blue1']} />
              </View>
              <Text style={{ color: 'white', fontSize: 20 }}>Agenda</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 20 }}>{props.route.params.agenda} minutes</Text>
          </View>
          {/* {renderEdit('agenda')} */}
        </View>
      </View>
    </DateContext.Provider>
  );
};

export default DateCompo;
