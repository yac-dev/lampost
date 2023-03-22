import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import MapContext from '../../MeetupContext';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionButton from '../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../utils/colorsTable';
import { AntDesign } from '@expo/vector-icons';
import { iconsTable } from '../../../../utils/icons';

import DateAndTime from './DateAndTime';
import Agenda from './Agenda';

const Container = (props) => {
  const { MaterialCommunityIcons, AntDesign } = iconsTable;
  const { myUpcomingMeetups, setSnackBar } = useContext(GlobalContext);
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  const { formData, setFormData, setComponent } = useContext(LaunchMeetupContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

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

  console.log(myDates);

  // dateのvalidation
  useEffect(() => {
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
            message: 'OOPS. Not available this time. You have upcoming meetups on this time range.',
            duration: 3000,
          });
          setIsDisabledNext(true);
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
          setIsDisabledNext(true);
        } else {
          console.log("It's ok👍");
          setIsDisabledNext(false);
        }
      });
    }
  }, [formData.startDateAndTime, formData.duration]);
  // 基本、rangeのgetTimeの差がマイナスになることはない。（endtimeよりもstart timeの方が後になるってこと）durationでやっているからね。

  // useEffect(() => {
  //   if (props.state.startDateAndTime && props.state.duration && props.state.applicationDeadline) {
  //     setIsDisabledNext(false);
  //   }
  // }, [props.state.startDateAndTime, props.state.duration, props.state.applicationDeadline]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_PEOPLE')}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_FEE')}
            isDisabled={isDisabledNext}
          />
        </View>
        <View>
          <ActionButton
            label='Cancel'
            backgroundColor={iconColorsTable['red1']}
            icon={<AntDesign name='close' size={20} color={'white'} style={{ marginRight: 5 }} />}
            onActionButtonPress={() => setIsCancelLaunchMeetupConfirmationModalOpen(true)}
          />
        </View>
      </View>
      <DateAndTime />
      <Agenda />
      {/* <Deadline state={props.state} dispatch={props.dispatch} /> */}
    </View>
  );
};

export default Container;
