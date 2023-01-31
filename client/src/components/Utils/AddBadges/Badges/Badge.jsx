import React, { useContext } from 'react';
import AddBadgesContext from '../AddBadgesContext';
import BadgeContext from '../BadgeContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
  baseTextColor,
} from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
// ac
import { selectBadge } from '../../../../redux/actionCreators/selectItem';
import { removeBadge } from '../../../../redux/actionCreators/selectItem';
import { setIsTappedBadgeBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const Badge = (props) => {
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const { badge } = useContext(BadgeContext);
  const {
    fromComponent,
    selectedUserBadges,
    addedMeetupBadges,
    addedLibraryBadges,
    badgeDetailBottomSheetRef,
    searchBadgeBottomSheetRef,
    setTappedBadge,
    tappedBadgeHolders,
    setTappedBadgeHolders,
  } = useContext(AddBadgesContext);

  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  // const oneGridHeight = Dimensions.get('window').height / 7;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.7;
  // const isBadgeSelectedIconPlace = Dimensions.get('window').width / 100

  // Add badges(add user badgeとadd meetup badge)componentのbadgeをtapした時の挙動、
  // const renderBadgeIcon = () => {
  //   if (fromComponent === 'Select meetup badge') {
  //     if (props.badgeState && props.badge._id === props.badgeState._id) {
  //       return (
  //         <View
  //           style={{
  //             top: 0,
  //             right: 0,
  //             position: 'absolute',
  //             color: '#989898',
  //           }}
  //         >
  //           <Foundation name='sheriff-badge' size={20} color='#49CF13' />
  //         </View>
  //       );
  //     } else {
  //       return null;
  //     }
  //   } else if (fromComponent === 'Add meetup badges') {
  //     if (props.meetupBadges[props.badge._id]) {
  //       return (
  //         <View
  //           style={{
  //             top: 5,
  //             right: 5,
  //             position: 'absolute',
  //             color: '#989898',
  //           }}
  //         >
  //           <Foundation name='sheriff-badge' size={20} color='#49CF13' />
  //         </View>
  //       );
  //     } else {
  //       return null;
  //     }
  //   } else if (fromComponent === 'Add user badges') {
  //     if (selectedUserBadges[badge._id]) {
  //       <View
  //         style={{
  //           top: 5,
  //           right: 5,
  //           position: 'absolute',
  //           color: '#989898',
  //         }}
  //       >
  //         <Foundation name='sheriff-badge' size={20} color='#49CF13' />
  //       </View>;
  //     }
  //   }
  // };

  // ここ、　userbadgesとmeetup badgesで分ける必要ないかもな。
  const renderIsBadgeSelected = () => {
    if (fromComponent === 'ADD_USER_BADGES') {
      if (selectedUserBadges[badge._id]) {
        return (
          <View
            style={{
              top: -10,
              right: 10,
              position: 'absolute',
              color: '#989898',
            }}
          >
            <Foundation name='sheriff-badge' size={20} color='#49CF13' />
          </View>
        );
      }
    } else if (fromComponent === 'ADD_MEETUP_BADGES') {
      if (addedMeetupBadges[badge._id]) {
        return (
          <View
            style={{
              top: -5,
              right: 10,
              position: 'absolute',
              color: '#989898',
            }}
          >
            <Foundation name='sheriff-badge' size={20} color='#49CF13' />
          </View>
        );
      }
    } else if (fromComponent === 'ADD_LIBRARY_BADGES') {
      if (addedLibraryBadges[badge._id]) {
        return (
          <View
            style={{
              top: -10,
              right: 10,
              position: 'absolute',
              color: '#989898',
            }}
          >
            <Foundation name='sheriff-badge' size={20} color='#49CF13' />
          </View>
        );
      }
    }
  };

  // return (
  //   <View
  //     style={{
  //       width: '20%',
  //       height: 0,
  //       aspectRatio: 1,
  //       padding: 10, // これは単純に、25%幅に対して
  //       marginBottom: 23,
  //       // backgroundColor: 'red',
  //     }}
  //   >
  //     <TouchableOpacity
  //       style={{
  //         width: '100%',
  //         height: '100%',
  //         alignItems: 'center', // これと
  //         justifyContent: 'center', // これで中のimageを上下左右真ん中にする
  //         borderRadius: 10,
  //         backgroundColor: backgroundColorsTable[props.badge.color],
  //         borderStyle: 'solid',
  //         borderColor: backgroundColorsTable[props.badge.color],
  //         borderWidth: 1,
  //         // backgroundColor: 'red',
  //         marginBottom: 5,
  //       }}
  //       onPress={() => {
  //         props.onBadgePress(props.badge);
  //       }}
  //     >
  //       <FastImage
  //         style={{ width: 50, height: 50 }}
  //         source={{
  //           uri: props.badge.icon,
  //           priority: FastImage.priority.normal,
  //         }}
  //         tintColor={iconColorsTable[props.badge.color]}
  //         resizeMode={FastImage.resizeMode.contain}
  //       />
  //     </TouchableOpacity>
  //     <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 10, textAlign: 'center' }}>
  //       {props.badge.name}
  //     </Text>
  //     {renderBadgeIcon()}
  //   </View>
  // );

  const onBadgePress = async () => {
    // searchBadgeBottomSheetRef.current.close();
    badgeDetailBottomSheetRef.current.snapToIndex(0);
    setTappedBadge(badge);
    const result = await lampostAPI.get(`/badgeanduserrelationships/holders/${badge._id}`);
    const { badgeHolders } = result.data;
    setTappedBadgeHolders(badgeHolders);
    console.log('hey');
  };

  return (
    <View
      key={props.key}
      style={{
        width: oneGridWidth,
        height: oneGridHeight, // これなんだろね。。。
        // aspectRatio: 1,
        // padding: 10, // これは単純に、25%幅に対して
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        // これがbadgeのcontainer, rndefault colorを割り当てるためのもの。
        style={{
          width: badgeContainerWidth,
          aspectRatio: 1,
          alignItems: 'center', // これと
          justifyContent: 'center', // これで中のimageを上下左右真ん中にする
          borderRadius: 15,
          backgroundColor: rnDefaultBackgroundColor,
          borderWidth: 0.3,
          marginBottom: 5,
        }}
        onPress={() => {
          onBadgePress();
          // props.onBadgePress(props.badgeStatus._id);
          // navigation.navigate('BadgeInfo', { badgeId: props.badgeStatus._id });
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: backgroundColorsTable[badge.color],
            borderWidth: 0.3,
            borderColor: backgroundColorsTable[badge.color],
          }}
        >
          <FastImage
            style={{ height: badgeIconWidth, width: badgeIconWidth }}
            source={{
              uri: badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          color: baseTextColor,
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: 12,
          textAlign: 'center',
          // borderWidth: 1,
          // borderRadius: 5,
          // padding: 4,
        }}
      >
        {badge.name}
      </Text>
      {renderIsBadgeSelected()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedBadges: state.selectedItem.badges };
};

export default connect(mapStateToProps, { selectBadge, removeBadge, setIsTappedBadgeBottomSheetOpen })(Badge);
