import React, { useContext, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  appBottomSheetBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const DateCompo = (props) => {
  const snapPoints = ['35%'];
  const { MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo } = iconsTable;
  const { auth, setMyUpcomingMeetups } = useContext(GlobalContext);
  const [editing, setEditing] = useState('');
  const [isDateTimePickerModalOpen, setIsDateTimePickerModalOpen] = useState(false);
  const [editingStartDateAndTime, setEditingStartDateAndTime] = useState(null);
  const editBottomSheetRef = useRef(null);

  const onStartDateAndTimeConfirm = (date) => {
    setEditingStartDateAndTime(date);
    setIsDateTimePickerModalOpen(false);
  };

  const renderEditStartDate = () => {
    if (editing === 'startDateAndTime') {
      return (
        <View>
          <Text style={{ color: 'white' }}>When do you want to change?</Text>
          <TouchableOpacity onPress={() => setIsDateTimePickerModalOpen(true)}>
            <Text>Select</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDateTimePickerModalOpen}
            mode='datetime'
            onConfirm={(date) => onStartDateAndTimeConfirm(date)}
            onCancel={() => setIsDateTimePickerModalOpen(false)}
            is24Hour={true}
            minimumDate={new Date()}
            {...props}
          />
        </View>
      );
    } else if (editing === 'duration') {
      return (
        <View>
          <Text style={{ color: 'white' }}>Please select the updating duration</Text>
          {/* {isDateTimePickerModalOpen ? (
            <DateTimePickerModal
              isVisible={isDateTimePickerModalOpen}
              mode='datetime'
              onConfirm={(date) => onStartDateAndTimeConfirm(date)}
              onCancel={() => setIsDateTimePickerModalOpen(false)}
              is24Hour={true}
              minimumDate={new Date()}
            />
          ) : null} */}
        </View>
      );
    }
  };

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
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <TouchableOpacity
        onPress={() => {
          setIsDateTimePickerModalOpen(true);
        }}
      >
        <Text style={{ color: 'red' }}>here</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDateTimePickerModalOpen}
        mode='datetime'
        onConfirm={(date) => onStartDateAndTimeConfirm(date)}
        onCancel={() => setIsDateTimePickerModalOpen(false)}
        is24Hour={true}
        minimumDate={new Date()}
        {...props}
      />
      {/* <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
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
            <Text style={{ color: 'white', fontSize: 20 }}>{props.route.params.date}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setEditing('startDateAndTime');
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
          <Text style={{ color: 'white', fontSize: 20 }}>{props.route.params.duration} minutes</Text>
        </View>
        {renderEdit('duration')}
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
        {renderEdit('agenda')}
      </View>
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={editBottomSheetRef}
        snapPoints={snapPoints}
        keyboardBehavior={'extend'}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
      >
        <BottomSheetView style={{ flex: 1, padding: 10 }}>
          <Text style={{ color: 'white' }}>Edit {editing}</Text>
          {editing ? renderEditStartDate() : null}
        </BottomSheetView>
      </GorhomBottomSheet> */}
    </View>
  );
};

export default DateCompo;
