import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import BadgeContext from './BadgeContext';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import {
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  sectionBackgroundColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
import { Provider as PaperProvider } from 'react-native-paper';
import ActionButton from '../Utils/ActionButton';

// components
// import Header from './Header';
import Header from './Header/Container';
import ActionButttons from './Header/ActionButttons';
import Badge from './Badge';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import InboxBottomSheet from './InboxBottomSheet/Container';
import BadgeDetailBottomSheet from './BadgeDetailBottomSheet/Container';
import AddBadgeTagsBottomSheet from './AddBadgeTagsBottomSheet/Container';
import AddLinkBottomSheet from './AddLinkBottomSheet/Container';
import ConfirmEditProfileModal from './ConfirmEditProfileModal';
import ConfirmFlagUserModal from './ConfirmFlagUserModal';
import ConfirmDeleteAccount from './ConfirmDeleteAccount';
import ConfirmActionButtonModal from './ConfirmActionButtonModal';
import ConfirmLogout from './ConfirmLogout';
import ConfirmBlockUserModal from './ConfirmBlockUserModal';
import FlagUserMenuBottomSheet from './FlagUserMenuBottomSheet';
import ActivitiesMenuBottomSheet from './ActivitiesMenuBottomSheet';
import LeadershipBottomSheet from './LeadershipBottomSheet';

// badgeを取ってきて、skillも取ってくる。subscriberの数も返すし、connectionの数も返す。
const Container = (props) => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const {
    auth,
    setLoading,
    setSnackBar,

    friendChatsNotificationCount,
  } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const [isFetchedUserData, setIsFetchedUserData] = useState(false);
  const [badgeDatas, setBadgeDatas] = useState({});
  const [pressedBadgeData, setPressedBadgeData] = useState(null);
  const [isMyPage, setIsMyPage] = useState();
  const [isBlocked, setIsBlocked] = useState(false);
  const [isConfirmEditProfileModalOpen, setIsConfirmEditProfileModalOpen] = useState(false);
  const [isConfirmDeleteAccountModalOpen, setIsConfirmDeleteAccountModalOpen] = useState(false);
  const [isConfirmFlagUserModalOpen, setIsConfirmFlagUserModalOpen] = useState(false);
  const [isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen] = useState(false);
  const [isConfirmBlockUserModalOpen, setIsConfirmBlockUserModalOpen] = useState(false);
  const [confirmActionButtonModal, setConfirmActionButtonModal] = useState({ isOpen: false, type: '' });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const appMenuBottomSheetRef = useRef(null);
  const inboxBottomSheetRef = useRef(null);
  const badgeDetailBottomSheetRef = useRef(null);
  const addBadgeTagsBottomSheetRef = useRef(null);
  const addLinkBottomSheetRef = useRef(null);
  const flagUserMenuBottomSheetRef = useRef(null);
  const activitiesMenuBottomSheetRef = useRef(null);
  const leadershipBottomSheetRef = useRef(null);
  const [addLinkOrBadgeTagsBottomSheetType, setAddLinkOrBadgeTagsBottomSheetType] = useState('');
  const [fetchedBadgeTags, setFetchedBadgeTags] = useState([]);
  const [isOpenCreateBadgeTagTextInput, setIsOpenCreateBadgeTagTextInput] = useState(false);
  // これで、自分のpageを見ているか、他人のpageを見ているかのstateを管理する。
  useEffect(() => {
    if (auth.isAuthenticated && props.route.params.userId === auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getUser = async () => {
    const result = await lampostAPI.post(`/users/${props.route.params.userId}`, { userId: auth.data._id });
    const { user, isBlocking } = result.data;
    // console.log(user);
    setUser(user);
    setIsBlocked(isBlocking);
    setIsFetchedUserData(true);
  }; // ここ、4回queryしているのはなぜだ？？
  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  const onUnlockUserPress = async () => {
    const payload = {
      userId: auth.data._id,
      blockingUserId: user._id,
    };
    setLoading(true);
    const result = await lampostAPI.post('/userblockingrelationships/unblock', payload);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Unblocked this user.',
      duration: 5000,
    });
    setIsBlocked(false);
  };
  // console.log(badgeDatas[2]);

  const getBadgeDatasByUserId = async () => {
    const result = await lampostAPI.get(`/badgeanduserrelationships/${props.route.params.userId}`);
    const { userBadgeDatas } = result.data;
    if (userBadgeDatas.length) {
      setBadgeDatas(() => {
        const userBadgeDatasTable = {};
        userBadgeDatas.forEach((badgeData) => {
          userBadgeDatasTable[badgeData.badge._id] = badgeData;
        });
        return userBadgeDatasTable;
      });
    }
  };

  useEffect(() => {
    getBadgeDatasByUserId();
  }, []);

  useEffect(() => {
    if (props.route.params?.addedUserBadges) {
      const addedBadges = JSON.parse(props.route.params.addedUserBadges);
      const addedBadgeDatasTable = { ...addedBadges };
      for (const key in addedBadgeDatasTable) {
        addedBadgeDatasTable[key]['totalExperience'] = 0;
        addedBadgeDatasTable[key]['badge'] = addedBadgeDatasTable[key];
        addedBadgeDatasTable[key]['links'] = [];
        addedBadgeDatasTable[key]['badgeTags'] = [];
      }
      setBadgeDatas((previous) => {
        return {
          ...previous,
          ...addedBadgeDatasTable,
        };
      });
      console.log('I added these badg', props.route.params.addedUserBadges);
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Badge added.',
        duration: 5000,
      });
    }
  }, [props.route.params?.addedUserBadges]);

  useEffect(() => {
    if (props.route.params?.linkObject) {
      setBadgeDatas((previous) => {
        return {
          ...previous,
          [props.route.params.badgeId]: {
            ...previous[props.route.params.badgeId],
            links: [...previous[props.route.params.badgeId].links, props.route.params.linkObject],
          },
        };
      });
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Link added.',
        duration: 5000,
      });
    }
  }, [props.route.params?.linkObject]);

  useEffect(() => {
    if (props.route.params?.badgeTags) {
      setBadgeDatas((previous) => {
        return {
          ...previous,
          [props.route.params.badgeId]: {
            ...previous[props.route.params.badgeId],
            badgeTags: [...previous[props.route.params.badgeId].badgeTags, ...props.route.params.badgeTags],
          },
        };
      });
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Link added.',
        duration: 5000,
      });
    }
  }, [props.route.params?.badgeTags]);

  const renderBadges = () => {
    const badgeDatasList = Object.values(badgeDatas);
    if (badgeDatasList.length) {
      const badgesList = badgeDatasList.map((badgeData, index) => {
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
          {auth.data && user._id === auth.data._id ? (
            <View>
              <Text style={{ color: baseTextColor, textAlign: 'center', marginBottom: 10, paddingTop: 70 }}>
                Who are you?🤔{'\n'}Let's add some badges that related your interests{'\n'}from down below.
              </Text>
              {/* <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  padding: 10,
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 10,
                }}
                onPress={() => props.navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES' })}
              >
                <Text
                  style={{
                    // textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Add from here
                </Text>
              </TouchableOpacity> */}
            </View>
          ) : (
            <Text style={{ color: baseTextColor, textAlign: 'center' }}>You'll see all the badges of this user.</Text>
          )}
        </View>
      );
    }
  };

  const renderUserData = () => {
    return (
      <>
        <Header />
        {isBlocked ? (
          <View>
            <Text style={{ color: baseTextColor, textAlign: 'center', marginBottom: 10 }}>
              You are blocking this user now.
            </Text>
            <View style={{ alignSelf: 'center' }}>
              <ActionButton
                label='Unblock this user'
                icon={<Fontisto name='unlocked' size={20} color='white' />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => onUnlockUserPress()}
              />
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderBadges()}</ScrollView>
        )}
        {!auth.isAuthenticated || !isMyPage ? null : (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              backgroundColor: backgroundColorsTable['pink1'],
              borderRadius: 10,
              alignSelf: 'center',
              padding: 10,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: iconColorsTable['pink1'],
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
              onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
            >
              <Ionicons name='ios-apps' size={25} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                inboxBottomSheetRef.current.snapToIndex(0);
              }}
            >
              <View
                style={{
                  backgroundColor: iconColorsTable['pink1'],
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons name='email-multiple' size={25} color={'white'} />
              </View>
              {friendChatsNotificationCount ? (
                <View
                  style={{
                    position: 'absolute',
                    right: -7,
                    top: -7,
                    backgroundColor: rnDefaultBackgroundColor,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20 / 2,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: iconColorsTable['pink1'],
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20 / 2,
                    }}
                  >
                    <Text style={{ color: 'white' }}>{friendChatsNotificationCount}</Text>
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        )}

        <AppMenuBottomSheet />
        <InboxBottomSheet />
        <BadgeDetailBottomSheet />
        <AddBadgeTagsBottomSheet />
        <AddLinkBottomSheet />
        <FlagUserMenuBottomSheet />
        <ActivitiesMenuBottomSheet />
        {/* <LeadershipBottomSheet /> */}
        {/* <SelectedProfileImage /> */}
        <ConfirmEditProfileModal />
        <ConfirmFlagUserModal />
        <ConfirmActionButtonModal />
        <ConfirmDeleteAccount />
        <ConfirmLogout />
        <ConfirmBlockUserModal />
      </>
    );
  };

  // if (user) {
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isMyPage,
        isBlocked,
        setIsBlocked,
        navigation: props.navigation,
        appMenuBottomSheetRef,
        inboxBottomSheetRef,
        badgeDetailBottomSheetRef,
        addBadgeTagsBottomSheetRef,
        addLinkBottomSheetRef,
        addLinkOrBadgeTagsBottomSheetType,
        setAddLinkOrBadgeTagsBottomSheetType,
        pressedBadgeData,
        setPressedBadgeData,
        badgeDatas,
        setBadgeDatas,
        isConfirmEditProfileModalOpen,
        setIsConfirmEditProfileModalOpen,
        isConfirmLogoutModalOpen,
        setIsConfirmLogoutModalOpen,
        confirmActionButtonModal,
        setConfirmActionButtonModal,
        selectedProfileImage,
        setSelectedProfileImage,
        fetchedBadgeTags,
        setFetchedBadgeTags,
        isOpenCreateBadgeTagTextInput,
        setIsOpenCreateBadgeTagTextInput,
        isConfirmDeleteAccountModalOpen,
        setIsConfirmDeleteAccountModalOpen,
        isConfirmFlagUserModalOpen,
        setIsConfirmFlagUserModalOpen,
        flagUserMenuBottomSheetRef,
        activitiesMenuBottomSheetRef,
        leadershipBottomSheetRef,
        isConfirmBlockUserModalOpen,
        setIsConfirmBlockUserModalOpen,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {!isFetchedUserData ? <ActivityIndicator /> : renderUserData()}
      </View>
    </UserContext.Provider>
  );
};

export default Container;
