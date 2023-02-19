import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import BadgeContext from './BadgeContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
} from '../../utils/colorsTable';
import { Provider as PaperProvider } from 'react-native-paper';
import ActionButton from '../Utils/ActionButton';

// components
import Header from './Header';
import Badge from './Badge';
import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
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

// badgeを取ってきて、skillも取ってくる。subscriberの数も返すし、connectionの数も返す。
const Container = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
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
  const badgeDetailBottomSheetRef = useRef(null);
  const addBadgeTagsBottomSheetRef = useRef(null);
  const addLinkBottomSheetRef = useRef(null);
  const flagUserMenuBottomSheetRef = useRef(null);
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
    setBadgeDatas(() => {
      const userBadgeDatasTable = {};
      userBadgeDatas.forEach((badgeData) => {
        userBadgeDatasTable[badgeData.badge._id] = badgeData;
      });
      return userBadgeDatasTable;
    });
  };

  useEffect(() => {
    getBadgeDatasByUserId();
  }, []);

  useEffect(() => {
    if (props.route.params?.addedUserBadges) {
      const addedBadges = JSON.parse(props.route.params.addedUserBadges);
      const addedBadgeDatasTable = { ...addedBadges };
      for (const key in addedBadgeDatasTable) {
        addedBadgeDatasTable[key]['badge'] = addedBadgeDatasTable[key];
        addedBadgeDatasTable[key]['link'] = '';
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
              <Text style={{ color: baseTextColor, textAlign: 'center', marginBottom: 10 }}>
                Let's add some badges and express yourself more.{'\n'} e.g.) Your profession, foods you like,{'\n'} your
                favorite musicians, what you are learning etc
              </Text>
              <TouchableOpacity
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
                  Add here
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={{ color: baseTextColor, textAlign: 'center' }}>You'll see all the badges of this user.</Text>
          )}
        </View>
      );
    }
  };

  if (user) {
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
          isConfirmBlockUserModalOpen,
          setIsConfirmBlockUserModalOpen,
        }}
      >
        <PaperProvider>
          <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
            <Header />
            {isBlocked ? (
              <View>
                <Text style={{ color: baseTextColor, textAlign: 'center', marginBottom: 10 }}>
                  You are blocking this user now.
                </Text>
                {/* <TouchableOpacity
                  style={{
                    padding: 15,
                    alignSelf: 'center',
                    backgroundColor: screenSectionBackgroundColor,
                    borderRadius: 10,
                  }}
                  onPress={async () => {
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
                  }}
                >
                  <Text style={{ color: baseTextColor }}>Unblock this user</Text>
                </TouchableOpacity> */}
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
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 20,
                  backgroundColor: rnDefaultBackgroundColor,
                  borderRadius: 10,
                  alignSelf: 'center',
                  // elevation: 5,
                  // shadowColor: '#000',
                  // shadowOffset: { width: 0, height: 0 },
                  // shadowOpacity: 0.1,
                  // shadowRadius: 5,
                }}
                onPress={() => appMenuBottomSheetRef.current.snapToIndex(1)}
              >
                <View
                  style={{
                    backgroundColor: iconColorsTable['green1'],
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                >
                  <Foundation name='sheriff-badge' size={25} color={'white'} style={{ marginRight: 10 }} />
                  <Text style={{ color: 'white' }}>Menu</Text>
                  <MaterialCommunityIcons name='chevron-down' size={25} color={'white'} />
                </View>
              </TouchableOpacity>
            )}

            <AppMenuBottomSheet />
            <BadgeDetailBottomSheet />
            <AddBadgeTagsBottomSheet />
            <AddLinkBottomSheet />
            <FlagUserMenuBottomSheet />
            {/* <SelectedProfileImage /> */}
            <ConfirmEditProfileModal />
            <ConfirmFlagUserModal />
            <ConfirmActionButtonModal />
            <ConfirmDeleteAccount />
            <ConfirmLogout />
            <ConfirmBlockUserModal />
          </View>
        </PaperProvider>
      </UserContext.Provider>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>Fetching the data now...</Text>
      </View>
    );
  }
};

export default Container;
