import React, { useState, useEffect, useRef, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import BadgeContext from './BadgeContext';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseBackgroundColor, baseTextColor } from '../../utils/colorsTable';

// components
import Header from './Header';
import Stats from './Stats';
import Badge from './Badge';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import BadgeDetailBottomSheet from './BadgeDetailBottomSheet/Container';
import ConfirmEditProfileModal from './ConfirmEditProfileModal';
import SelectedProfileImage from './SelectedProfileImage';

// badgeを取ってきて、skillも取ってくる。subscriberの数も返すし、connectionの数も返す。
const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const [badgeDatas, setBadgeDatas] = useState([]);
  const [pressedBadgeData, setPressedBadgeData] = useState(null);
  const [isMyPage, setIsMyPage] = useState();
  const [isConfirmEditProfileModalOpen, setIsConfirmEditProfileModalOpen] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const badgeDetailBottomSheetRef = useRef(null);
  const appMenuBottomSheetRef = useRef(null);

  // これで、自分のpageを見ているか、他人のpageを見ているかのstateを管理する。
  useEffect(() => {
    if (props.auth.isAuthenticated && props.route.params.userId === props.auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getUser = async () => {
    const result = await lampostAPI.get(`/users/${props.route.params.userId}`);
    const { user } = result.data;
    console.log(user);
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getBadgeDatasByUserId = async () => {
    const result = await lampostAPI.get(`/badgeanduserrelationships/${props.route.params.userId}`);
    const { userBadgeDatas } = result.data;
    setBadgeDatas(userBadgeDatas);
  };
  useEffect(() => {
    getBadgeDatasByUserId();
  }, []);

  useEffect(() => {
    if (props.route.params?.addedUserBadges) {
      setBadgeDatas((previous) => [...previous, ...props.route.params.addedUserBadges]);
      console.log('I added these badg', props.route.params.addedUserBadges);
    }
  }, [props.route.params?.addedUserBadges]);

  const renderBadges = () => {
    if (badgeDatas.length) {
      const badgesList = badgeDatas.map((badgeData, index) => {
        return (
          <BadgeContext.Provider value={{ badgeData }} key={index}>
            <Badge />
          </BadgeContext.Provider>
        );
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgesList}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor }}>No badges add yet...</Text>
        </View>
      );
    }
  };

  if (user) {
    return (
      <UserContext.Provider
        value={{
          user,
          isMyPage,
          navigation: props.navigation,
          appMenuBottomSheetRef,
          badgeDetailBottomSheetRef,
          pressedBadgeData,
          setPressedBadgeData,
          isConfirmEditProfileModalOpen,
          setIsConfirmEditProfileModalOpen,
          selectedProfileImage,
          setSelectedProfileImage,
        }}
      >
        <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
          <Header />
          <Stats />
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderBadges()}</ScrollView>
          <AppMenuBottomSheet />
          <BadgeDetailBottomSheet />
          {/* <SelectedProfileImage /> */}
          <ConfirmEditProfileModal />
        </View>
      </UserContext.Provider>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Text style={{ color: baseTextColor }}>Loading...</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Container);
