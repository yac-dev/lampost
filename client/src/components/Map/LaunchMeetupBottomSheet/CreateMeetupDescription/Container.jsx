import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import MapContext from '../../MeetupContext';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import lampostAPI from '../../../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ActionButton from '../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../utils/colorsTable';
import Description from './Description';
import Link from './Link';

const Container = (props) => {
  const { auth, setAuth, setLoading, setSnackBar, setMyUpcomingMeetups } = useContext(GlobalContext);
  const {
    setIsCancelLaunchMeetupConfirmationModalOpen,
    setMeetups,
    launchMeetupBottomSheetRef,
    setIsLaunchMeetupConfirmed,
    launchLocation,
    setLaunchLocation,
  } = useContext(MapContext);
  const { formData, setFormData, setComponent, INITIAL_STATE } = useContext(LaunchMeetupContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

  useEffect(() => {
    if (formData.description.length && formData.description.length <= 501) {
      setIsDisabledNext(false);
    } else {
      setIsDisabledNext(true);
    }
  }, [formData.description]);

  const onSubmitPress = async () => {
    setLoading(true);
    const payload = {
      launcher: auth.data._id,
      title: formData.title,
      place: {
        type: 'Point',
        coordinates: [launchLocation.longitude, launchLocation.latitude],
      },
      badges: Object.values(formData.badges),
      startDateAndTime: formData.startDateAndTime,
      duration: formData.duration,
      isAttendeesLimitFree: formData.isAttendeesLimitFree,
      attendeesLimit: formData.attendeesLimit,
      isFeeFree: formData.isFeeFree,
      fee: formData.fee,
      description: formData.description,
      link: formData.link,
    };
    const result = await lampostAPI.post('/meetups', payload);
    const { meetup, viewedChatsLastTime, launcher } = result.data;
    console.log('this is the launcher');
    // ここまではapi request.
    setMeetups((previous) => {
      return {
        ...previous,
        [meetup._id]: meetup,
      };
    });
    setAuth((previous) => {
      return {
        ...previous,
        data: {
          ...previous.data,
          upcomingMeetups: [meetup._id],
        },
      };
    });
    setLoading(false);
    // ここでも、chat roomにjoinしなきゃいけない。
    setMyUpcomingMeetups((previous) => {
      return {
        ...previous,
        [meetup._id]: {
          _id: meetup._id,
          title: meetup.title,
          startDateAndTime: meetup.startDateAndTime,
          launcher: launcher,
          state: meetup.state,
          unreadChatsTable: {
            general: 0,
            reply: 0,
            question: 0,
            help: 0,
          },
        },
      };
    });
    // auth.socket.emit('JOIN_A_LOUNGE', { meetupId: meetup._id });
    Keyboard.dismiss();
    setLoading(false);
    setIsLaunchMeetupConfirmed(false);
    setLaunchLocation(null);
    launchMeetupBottomSheetRef.current.close();
    setSnackBar({
      isVisible: true,
      message: 'Launched a meetup.',
      barType: 'success',
      duration: 5000,
    });
    const reault2 = await lampostAPI.post('/launcherandpatronrelationships/patronnotification', {
      launcher: {
        _id: auth.data._id,
        name: auth.data.name,
      },
      description: formData.description,
    });
    setFormData(INITIAL_STATE);
    // dispatch({ type: 'LAUNCHED', payload: '' });
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_FEE')}
          />
          <ActionButton
            label='Launch'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='rocket-launch' color={'white'} size={25} />}
            onActionButtonPress={() => onSubmitPress()}
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
      <Description />
      <Link />
    </View>
  );
};

export default Container;
