import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import MapContext from '../../../MeetupContext';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Header from './Header';
import DateAndTime from './DateAndTime';
import Deadline from './Deadline';

const Container = (props) => {
  const { myUpcomingMeetups, setSnackBar } = useContext(GlobalContext);
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
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
    if (props.state.startDateAndTime && props.state.duration) {
      const launchingStartDateAndTimeString = new Date(props.state.startDateAndTime);
      let launchingEndDateAndTimeString = new Date(props.state.startDateAndTime);
      launchingEndDateAndTimeString = launchingEndDateAndTimeString.setMinutes(
        launchingStartDateAndTimeString.getMinutes() + props.state.duration
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
  }, [props.state.startDateAndTime, props.state.duration]);
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
            onActionButtonPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_PEOPLE', payload: '' })}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}
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
      <Header />
      <DateAndTime state={props.state} dispatch={props.dispatch} />
      {/* <Deadline state={props.state} dispatch={props.dispatch} /> */}
    </View>
  );
};

export default Container;
