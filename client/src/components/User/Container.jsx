import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import BadgeContext from './BadgeContext';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';
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
  inputBackgroundColorNew,
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
import BadgeMenuBottomSheet from './BadgeMenuBottomSheet';
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
  const { Ionicons, MaterialCommunityIcons, Entypo, Foundation } = iconsTable;
  const { auth, setLoading, setSnackBar, setAuth, isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;

  const [user, setUser] = useState(null);
  const [isFetchedUserData, setIsFetchedUserData] = useState(false);
  const [userBadges, setUserBadges] = useState({});
  const [isFetchedUserBadges, setIsFetchedUserBadges] = useState(false);
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
  const badgeMenuBottomSheetRef = useRef(null);
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
  const [badgeIndexes, setBadgeIndexes] = useState({});
  console.log(userBadges);
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
      // getBadgeDatasByUserId();
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
    const { badgeAndUserRelationships } = result.data;
    if (badgeAndUserRelationships.length) {
      setUserBadges(() => {
        const userBadgesTable = {};
        badgeAndUserRelationships.forEach((badgeAndUserRelationship) => {
          userBadgesTable[badgeAndUserRelationship._id] = badgeAndUserRelationship;
          // userBadgesTable[badgeData.badge._id] = badgeData;
        });
        return userBadgesTable;
      });
    }
    setIsFetchedUserBadges(true);
  };

  // indiesだけを、create indexに持ってくる感じかな。
  const getBadgeIndexes = async () => {
    const result = await lampostAPI.get(`/badgeindexes/${props.route.params.userId}`);
    const { badgeIndexes } = result.data;
    // badge indexesがあれば。
    if (badgeIndexes.length) {
      const copiedUserBadges = { ...userBadges };
      setBadgeIndexes(() => {
        const table = {};
        badgeIndexes.forEach((badgeIndex) => {
          table[badgeIndex.title] = {
            title: badgeIndex.title,
            userBadges: badgeIndex.userBadges.map((userBadgeId) => {
              const val = copiedUserBadges[userBadgeId];
              delete copiedUserBadges[userBadgeId];
              return val;
            }),
          };
        });
        table['indies'] = {
          title: '',
          userBadges: Object.values(copiedUserBadges),
        };
        return table;
      });
    } else {
      const copiedUserBadges = { ...userBadges };
      setBadgeIndexes(() => {
        const table = {
          indies: {
            title: '',
            userBadges: Object.values(copiedUserBadges),
          },
        };
        return table;
      });
    }
  };

  useEffect(() => {
    getBadgeDatasByUserId();
  }, []);

  useEffect(() => {
    if (isFetchedUserBadges) {
      getBadgeIndexes();
    }
  }, [isFetchedUserBadges]);

  // これ、もういらない。useFocusにしたから。
  useEffect(() => {
    if (props.route.params?.addedUserBadges) {
      const addedUserBadges = JSON.parse(props.route.params.addedUserBadges);
      setUserBadges((previous) => {
        const updating = { ...previous };
        addedUserBadges.forEach((userBadge) => {
          updating[userBadge._id] = userBadge;
        });
        return updating;
      });

      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Badges have been added successfully.',
        duration: 5000,
      });
    }
  }, [props.route.params?.addedUserBadges]);

  useEffect(() => {
    if (props.route.params?.addedBadgeTags) {
      setUserBadges((previous) => {
        return {
          ...previous,
          [props.route.params.addedBadgeTags.userBadgeId]: {
            ...previous[props.route.params.addedBadgeTags.userBadgeId],
            badgeTags: [
              ...previous[props.route.params.addedBadgeTags.userBadgeId].badgeTags,
              ...props.route.params.addedBadgeTags.data,
            ],
          },
        };
      });
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Badge Tags have been added successfully.',
        duration: 5000,
      });
    }
  }, [props.route.params?.addedBadgeTags]);

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

  const renderBadges = () => {
    const userBadgesList = Object.values(userBadges);
    if (userBadgesList.length) {
      const badgesList = userBadgesList.map((userBadge, index) => {
        return (
          <BadgeContext.Provider value={{ userBadge }} key={index}>
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
                🤔 Who are you?{'\n'}Let's add some badges that are related to your interests{'\n'}from down below.
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
          <View>
            <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
              {/* <TouchableOpacity
                style={{
                  width: '100%',
                  padding: 5,
                  borderWidth: 0.3,
                  borderColor: baseTextColor,
                  borderRadius: 8,
                }}
              >
                <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                  <Entypo name='bookmark' color={baseTextColor} size={20} style={{ marginRight: 10 }} />
                  <Text style={{ color: 'white' }}>Create index</Text>
                </View>
              </TouchableOpacity> */}
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderBadges()}</ScrollView>
          </View>
        )}
        {!auth.isAuthenticated || !isMyPage ? null : (
          // <View
          //   style={{
          //     position: 'absolute',
          //     bottom: 20,
          //     backgroundColor: backgroundColorsTable['green1'],
          //     borderRadius: 10,
          //     alignSelf: 'center',
          //     padding: 10,
          //     flexDirection: 'row',
          //   }}
          // >
          //   <TouchableOpacity
          //     style={{
          //       backgroundColor: iconColorsTable['green1'],
          //       padding: 10,
          //       flexDirection: 'row',
          //       alignItems: 'center',
          //       borderRadius: 10,
          //       marginRight: 10,
          //     }}
          //     onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
          //   >
          //     <Ionicons name='ios-apps' size={25} color={'white'} />
          //   </TouchableOpacity>
          //   <TouchableOpacity
          //     onPress={() => {
          //       badgeMenuBottomSheetRef.current.snapToIndex(0);
          //     }}
          //   >
          //     <View
          //       style={{
          //         backgroundColor: iconColorsTable['green1'],
          //         padding: 10,
          //         flexDirection: 'row',
          //         alignItems: 'center',
          //         borderRadius: 10,
          //       }}
          //     >
          //       <Ionicons name='hammer' size={25} color={'white'} />
          //     </View>
          //   </TouchableOpacity>
          // </View>
          <ScrollView
            horizontal={true}
            style={{ backgroundColor: screenSectionBackgroundColor, position: 'absolute', width: '100%', bottom: 0 }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['red1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() =>
                    props.navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: userBadges })
                  }
                >
                  <MaterialCommunityIcons name='plus' size={20} color={iconColorsTable['red1']} />
                </TouchableOpacity>

                <Text style={{ color: 'white', textAlign: 'center' }}>Add badges</Text>
              </View>
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['blue1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => props.navigation.navigate('My log', { userId: auth.data._id })}
                >
                  <MaterialCommunityIcons name='history' size={20} color={iconColorsTable['blue1']} />
                </TouchableOpacity>

                <Text style={{ color: 'white', textAlign: 'center' }}>Log</Text>
              </View>
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['yellow1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => props.navigation.navigate('My friends')}
                >
                  <MaterialCommunityIcons name='human-greeting-variant' size={20} color={iconColorsTable['yellow1']} />
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Friends</Text>
              </View>
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['violet1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => props.navigation.navigate('Assets', { userId: auth.data._id })}
                >
                  <Ionicons name='camera' size={20} color={iconColorsTable['violet1']} />
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Snaps</Text>
              </View>
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: iconColorsTable['grey1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
                >
                  <Ionicons name='settings' size={20} color={'white'} />
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Setting</Text>
              </View>
            </View>
          </ScrollView>
        )}

        <AppMenuBottomSheet />
        {/* <InboxBottomSheet /> */}
        <BadgeMenuBottomSheet />
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
        badgeMenuBottomSheetRef,
        inboxBottomSheetRef,
        badgeDetailBottomSheetRef,
        addBadgeTagsBottomSheetRef,
        addLinkBottomSheetRef,
        addLinkOrBadgeTagsBottomSheetType,
        setAddLinkOrBadgeTagsBottomSheetType,
        pressedBadgeData,
        setPressedBadgeData,
        userBadges,
        setUserBadges,
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
        badgeIndexes,
        setBadgeIndexes,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <SafeAreaView style={{ flex: 1 }}>{!isFetchedUserData ? <ActivityIndicator /> : renderUserData()}</SafeAreaView>
      </View>
    </UserContext.Provider>
  );
};

export default Container;
