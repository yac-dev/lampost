import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import {
  baseBackgroundColor,
  iconColorsTable,
  disabledTextColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
  baseTextColor,
} from '../../../utils/colorsTable';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import EmojisPickerBottomSheet from './EmojisPickerBottomSheet';
import FastImage from 'react-native-fast-image';
import { iconsTable } from '../../../utils/icons';

const BoostBadgesContainer = (props) => {
  const { MaterialCommunityIcons, FontAwesome5 } = iconsTable;
  const { auth, setAuth, isIpad, setLoading, setSnackBar } = useContext(GlobalContext);
  const defaultRest = auth.data.experience;
  const [restExperience, setRestExxperience] = useState(defaultRest);
  const [badgeDatas, setBadgeDatas] = useState({});
  const [isFetchedBadgeDatas, setIsFetchedBadgeDatas] = useState(false);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;
  const [growingTable, setGrowingTable] = useState({});
  const emojisPickerBottomSheetRef = useRef(null);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => growBadges()} disabled={Object.keys(growingTable).length ? false : true}>
          <Text
            style={{
              color: Object.keys(growingTable).length ? 'white' : disabledTextColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [growingTable]);

  const growBadges = async () => {
    const payload = {
      growingTable,
    };
    console.log(payload);
    // props.navigation.navigate('Auth', { growedBadges: payload });
    setLoading(true);
    console.log(payload);
    const result = await lampostAPI.patch(`/badgeanduserrelationships/${auth.data._id}/grow`, payload);
    setLoading(false);
    // props.navigation.navigate('Auth', { growingTable });
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your claps was sent.',
      duration: 5000,
    });
  };

  // const clapBadge = async () => {
  //   const payload = {
  //     growingTable,
  //     launcherId: props.route.params.launcherId,
  //   };
  //   setLoading(true);
  //   console.log(payload);
  //   const result = await lampostAPI.patch(`/badgeanduserrelationships/${props.route.params.userId}//grow`, payload);
  //   setLoading(false);
  //   props.navigation.goBack();
  //   setSnackBar({
  //     isVisible: true,
  //     barType: 'success',
  //     message: 'Your claps was sent.',
  //     duration: 5000,
  //   });
  // };

  const getBadgeDatasByUserId = async () => {
    const result = await lampostAPI.get(`/badgeanduserrelationships/${auth.data._id}/clap`);
    const { userBadgeDatas } = result.data;
    if (userBadgeDatas.length) {
      setBadgeDatas(() => {
        const userBadgeDatasTable = {};
        userBadgeDatas.forEach((badgeData) => {
          userBadgeDatasTable[badgeData.relationshipId] = {
            relationshipId: badgeData.relationshipId,
            badge: badgeData.badge,
            growed: 0,
          };
        });
        return userBadgeDatasTable;
      });
    }
    setIsFetchedBadgeDatas(true);
  };
  useEffect(() => {
    getBadgeDatasByUserId();
  }, []);

  const renderBadge = (badgeData, index) => {
    return (
      <View
        style={{
          width: oneGridWidth,
          height: oneGridHeight,
          paddingTop: 10,
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
        key={index}
      >
        <TouchableOpacity
          style={{
            width: badgeContainerWidth,
            aspectRatio: 1,
            // height: '100%',
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
            borderRadius: 15,
            backgroundColor: rnDefaultBackgroundColor,
            borderWidth: 0.3,
            marginBottom: 5,
          }}
          disabled={!restExperience ? true : false}
          onPress={() => {
            setGrowingTable((previous) => {
              const updating = { ...previous };
              if (!updating[badgeData.relationshipId]) {
                updating[badgeData.relationshipId] = { relationshipId: badgeData.relationshipId, growed: 1 };
              } else {
                updating[badgeData.relationshipId]['growed'] = updating[badgeData.relationshipId]['growed'] + 1;
              }
              return updating;
            });
            setRestExxperience((previous) => previous - 1);
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: backgroundColorsTable[badgeData.badge.color],
              borderWidth: 0.3,
              borderColor: backgroundColorsTable[badgeData.badge.color],
            }}
          >
            <FastImage
              style={{ height: badgeIconWidth, width: badgeIconWidth }}
              source={{
                uri: badgeData.badge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[badgeData.badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </TouchableOpacity>
        {growingTable[badgeData.relationshipId]?.growed ? (
          <View
            style={{
              backgroundColor: rnDefaultBackgroundColor,
              borderRadius: 5,

              top: isIpad ? -7 : 0,
              right: isIpad ? -7 : 0,
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            // onPress={() => emojisPickerBottomSheetRef.current.snapToIndex(0)}
          >
            <View style={{ backgroundColor: backgroundColorsTable[badgeData.badge.color], padding: 5 }}>
              <Text style={{ color: iconColorsTable[badgeData.badge.color] }}>
                🔥+{growingTable[badgeData.relationshipId]?.growed}
              </Text>
            </View>
          </View>
        ) : null}
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
          }}
        >
          {badgeData.badge.name}
        </Text>
      </View>
    );
  };

  const renderBadges = () => {
    const badgeDatasList = Object.values(badgeDatas);
    if (badgeDatasList.length) {
      const badgesList = badgeDatasList.map((badgeData, index) => {
        return renderBadge(badgeData, index);
      });
      return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>{badgesList}</View>
        </ScrollView>
      );
    } else {
      return <Text>This user hasn't register any badges yet...</Text>;
    }
  };

  // experienceをどうやって稼げるかを、どこかに書かないといけない。
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingTop: 10 }}>
      <Text style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'center', color: 'white', marginBottom: 20 }}>
        How passionate are you about your things?{'\n'}Let's boost your badges using your experience.
      </Text>
      <View
        style={{
          width: '100%',
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: iconColorsTable['blue1'],
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 5,
            width: '100%',
          }}
        >
          <View style={{ flex: 0.7, borderRightWidth: 0.3, borderRightColor: 'white' }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Experience: {restExperience}</Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.3,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}
            onPress={() => {
              setGrowingTable({});
              setRestExxperience(defaultRest);
            }}
          >
            <FontAwesome5 name='fire-extinguisher' size={20} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Undo</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isFetchedBadgeDatas ? renderBadges() : <ActivityIndicator />}
      {/* <EmojisPickerBottomSheet emojisPickerBottomSheetRef={emojisPickerBottomSheetRef} /> */}
      <LoadingSpinner />
    </View>
  );
};

export default BoostBadgesContainer;
