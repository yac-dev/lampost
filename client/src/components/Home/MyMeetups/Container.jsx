import React, { useContext, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import MyMeetupsContext from './MyMeetupsContext';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import { baseBackgroundColor, iconColorsTable, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import Meetups from './Meetups';
import MoreMenuBottomSheet from './MoreMenuBottomSheet';
import ConfirmStartMeetup from './ConfirmStartMeetup';
import ConfirmFinishMeetup from './ConfirmFinishMeetup';
import ConfirmRSVP from './ConfirmRSVP';

const Container = (props) => {
  const { auth, isFetchedAuthData, myUpcomingMeetups, isFetchedMyUpcomingMeetups } = useContext(GlobalContext);
  const [isStartMeetupConfirmationModalOpen, setIsStartMeetupConfirmationModalOpen] = useState(false);
  const [startingMeetup, setStartingMeetup] = useState(null);
  const [isFinishMeetupConfirmationModalOpen, setIsFinishMeetupConfirmationModalOpen] = useState(false);
  const [finishingMeetup, setFinishingMeetup] = useState('');
  const [isRSVPConfirmationModalOpen, setIsRSVPConfirmationModalOpen] = useState(false);
  const [RSVPingMeetup, setRSVPingMeetup] = useState(null);
  const moreMenuBottomSheetRef = useRef(null);
  const [moreMenu, setMenuMenu] = useState(null);
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  // useEffect(() => {
  //   if(props.route){}
  // },[])
  if (auth.isAuthenticated) {
    if (isFetchedMyUpcomingMeetups) {
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
        <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
          <ActivityIndicator />
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginTop: 50, textAlign: 'center' }}>
          Please login or signup to experience complete functions
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 }}>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: iconColorsTable['blue1'], borderRadius: 5, marginRight: 10 }}
            onPress={() => topLevelHomeNavigation.navigate('Home login')}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: iconColorsTable['blue1'], borderRadius: 5 }}
            onPress={() => topLevelHomeNavigation.navigate('Home signup')}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default Container;
