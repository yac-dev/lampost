import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import DateContext from './DateContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';

const EditBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const {
    editing,
    setEditing,
    setIsDateTimePickerModalOpen,
    setIsDurationPickerModalOpen,
    editedStartDateAndTime,
    setEditedStartDateAndTime,
    editedDuration,
    setEditedDuration,
    editBottomSheetRef,
    meetupId,
    launcherId,
    startDateAndTime,
    setStartDateAndTime,
    duration,
    setDuration,
  } = useContext(DateContext);

  const updateStartDateAndTime = async () => {
    const payload = {
      data: editedStartDateAndTime,
      type: 'startDateAndTime',
    };
    // const result = await lampostAPI.patch(`/meetups/${meetupId}`, payload);
    setStartDateAndTime(editedStartDateAndTime);
    editBottomSheetRef.current.close();
    setEditedStartDateAndTime(null);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Start time has been updated and notification will be sent to all members.',
      duration: 5000,
    });
  };

  const updateDuration = async () => {
    const payload = {
      data: editedDuration,
      type: 'duration',
    };
    // const result = await lampostAPI.patch(`/meetups/${meetupId}`, payload);
    setDuration(editedDuration);
    editBottomSheetRef.current.close();
    setEditedDuration(null);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Duration has been updated and notification will be sent to all members.',
      duration: 5000,
    });
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

  const renderEditStartDate = () => {
    if (editing === 'startDateAndTime') {
      return (
        <View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}
          >
            <Text style={{ color: baseTextColor }}>What date do you want to change?</Text>
            <TouchableOpacity
              style={{ padding: 10, borderRadius: 5, backgroundColor: iconColorsTable['blue1'], marginRight: 10 }}
              onPress={() => setIsDateTimePickerModalOpen(true)}
            >
              <Text style={{ color: 'white' }}>Select</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>
            {editedStartDateAndTime
              ? `${new Date(editedStartDateAndTime).toLocaleString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : null}
          </Text>
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: editedStartDateAndTime ? iconColorsTable['blue1'] : screenSectionBackgroundColor,
              alignSelf: 'center',
            }}
            disabled={editedStartDateAndTime ? false : true}
            onPress={() => updateStartDateAndTime()}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (editing === 'duration') {
      return (
        <View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}
          >
            <Text style={{ color: 'white' }}>How long do you want to change?</Text>
            <TouchableOpacity
              style={{ padding: 10, borderRadius: 5, backgroundColor: iconColorsTable['blue1'], marginRight: 10 }}
              onPress={() => setIsDurationPickerModalOpen(true)}
            >
              <Text style={{ color: 'white' }}>Select</Text>
            </TouchableOpacity>
          </View>
          {editedDuration ? renderDuration(editedDuration) : null}
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: editedDuration ? iconColorsTable['blue1'] : screenSectionBackgroundColor,
              alignSelf: 'center',
            }}
            disabled={editedDuration ? false : true}
            onPress={() => updateDuration()}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
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
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Edit {editing}</Text>
        {editing ? renderEditStartDate() : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default EditBottomSheet;
