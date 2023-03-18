import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import GlobalContext from '../../../../../GlobalContext';
import lampostAPI from '../../../../../apis/lampost';
import {
  baseBackgroundColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  disabledTextColor,
} from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import { iconsTable } from '../../../../../utils/icons';
import LoadingSpinner from '../../../../Utils/LoadingSpinner';

const ClapFriendContainer = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { auth, isIpad, setLoading, setSnackBar } = useContext(GlobalContext);
  const [badgeDatas, setBadgeDatas] = useState({});
  const [isFetchedBadgeDatas, setIsFetchedBadgeDatas] = useState(false);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;
  const [clappingTable, setClappingTable] = useState({});

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => clapBadge()} disabled={Object.keys(clappingTable).length ? false : true}>
          <Text
            style={{
              color: Object.keys(clappingTable).length ? 'white' : disabledTextColor,
              fontSize: 20,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [clappingTable]);

  const clapBadge = async () => {
    const payload = {
      clappingTable,
      launcherId: props.route.params.launcherId,
    };
    setLoading(true);
    console.log(payload);
    const result = await lampostAPI.patch(`/badgeanduserrelationships/${props.route.params.userId}/clap`, payload);
    setLoading(false);
    props.navigation.goBack();
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your claps was sent.',
      duration: 5000,
    });
  };

  const getBadgeDatasByUserId = async () => {
    const result = await lampostAPI.get(`/badgeanduserrelationships/${props.route.params.userId}/clap`);
    const { userBadgeDatas } = result.data;
    if (userBadgeDatas.length) {
      setBadgeDatas(() => {
        const userBadgeDatasTable = {};
        userBadgeDatas.forEach((badgeData) => {
          userBadgeDatasTable[badgeData.relationshipId] = {
            relationshipId: badgeData.relationshipId,
            badge: badgeData.badge,
            totalClaps: 0,
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
          onPress={() => {
            setClappingTable((previous) => {
              const updating = { ...previous };
              if (!updating[badgeData.relationshipId]) {
                updating[badgeData.relationshipId] = { relationshipId: badgeData.relationshipId, totalClaps: 1 };
              } else {
                if (updating[badgeData.relationshipId]['totalClaps'] === 10) {
                  delete updating[badgeData.relationshipId];
                } else {
                  updating[badgeData.relationshipId]['totalClaps'] =
                    updating[badgeData.relationshipId]['totalClaps'] + 1;
                }
              }
              return updating;
            });
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
        {clappingTable[badgeData.relationshipId]?.totalClaps ? (
          <View
            style={{
              backgroundColor: iconColorsTable['yellow1'],
              borderRadius: 5,
              padding: 5,
              top: isIpad ? -7 : 0,
              right: isIpad ? -7 : 0,
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='hand-clap' size={12} color={'white'} />
            <Text style={{ color: 'white' }}>+{clappingTable[badgeData.relationshipId]?.totalClaps}</Text>
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

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingTop: 10 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        👏 Let's praise your friend's features or skills{'\n'}by tapping badges.
      </Text>
      {isFetchedBadgeDatas ? renderBadges() : <ActivityIndicator />}
      <LoadingSpinner />
    </View>
  );
};

export default ClapFriendContainer;
