import React, { useContext, useState, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import MyMeetupsContext from './MyMeetupsContext';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import Meetups from './Meetups';
import MoreMenuBottomSheet from './MoreMenuBottomSheet';
import ConfirmStartMeetup from './ConfirmStartMeetup';
import ConfirmFinishMeetup from './ConfirmFinishMeetup';
import ConfirmRSVP from './ConfirmRSVP';

const Container = (props) => {
  const { auth, isFetchedAuthData } = useContext(GlobalContext);
  const [isStartMeetupConfirmationModalOpen, setIsStartMeetupConfirmationModalOpen] = useState(false);
  const [startingMeetup, setStartingMeetup] = useState(null);
  const [isFinishMeetupConfirmationModalOpen, setIsFinishMeetupConfirmationModalOpen] = useState(false);
  const [finishingMeetup, setFinishingMeetup] = useState('');
  const [isRSVPConfirmationModalOpen, setIsRSVPConfirmationModalOpen] = useState(false);
  const [RSVPingMeetup, setRSVPingMeetup] = useState(null);
  const moreMenuBottomSheetRef = useRef(null);
  const [moreMenu, setMenuMenu] = useState(null);

  console.log(moreMenu);
  if (isFetchedAuthData) {
    if (auth.isAuthenticated) {
      return (
        <MyMeetupsContext.Provider
          value={{
            moreMenuBottomSheetRef,
            moreMenu,
            setMenuMenu,
            isStartMeetupConfirmationModalOpen,
            setIsStartMeetupConfirmationModalOpen,
            startingMeetup,
            setStartingMeetup,
            isFinishMeetupConfirmationModalOpen,
            setIsFinishMeetupConfirmationModalOpen,
            finishingMeetup,
            setFinishingMeetup,
            isRSVPConfirmationModalOpen,
            setIsRSVPConfirmationModalOpen,
            RSVPingMeetup,
            setRSVPingMeetup,
          }}
        >
          <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
            <Meetups />
            <MoreMenuBottomSheet />
            <ConfirmStartMeetup />
            <ConfirmFinishMeetup />
            <ConfirmRSVP />
          </View>
        </MyMeetupsContext.Provider>
      );
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }}>Please login</Text>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default Container;
