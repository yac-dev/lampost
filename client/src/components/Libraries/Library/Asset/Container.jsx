import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import {
  baseBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AddNewReactionBottomSheet from './AddNewReactionBottomSheet';

const Asset = (props) => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const [asset, setAsset] = useState(props.route.params.asset);
  const [badgeLikes, setBadgeLikes] = useState(null);

  // data structure
  //  {
  //    { reaction1: {_id: reaction1, content: 'Nice e', totalCounts: 3,
  //    users: {user1: {_id: user1, name: 'a'}, {user2: {_id: user2, name: 'b'}}} },
  //    { reaction2: {_id: reaction2, content: 'Great e', totalCounts: 5,
  //     users: {user3: {_id: user3, name: 'c'}}
  //    ,}
  //   }

  const getAssetAndBadgeAndUserRelationships = async () => {
    const result = await lampostAPI.get(`/assetandbadgeanduserrelationships/${props.route.params.asset._id}`);
    const { table, asset } = result.data;
    setBadgeLikes(table);
    setAsset(asset);
  };
  useEffect(() => {
    getAssetAndBadgeAndUserRelationships();
  }, []);

  const upvoteBadge = async (badgeId) => {
    const result = await lampostAPI.post('/assetandbadgeanduserrelationships', {
      assetId: asset._id,
      badgeId,
      userId: auth.data._id,
    });
    setBadgeLikes((previous) => {
      const updating = { ...previous };
      updating[badgeId].users.push(auth.data._id);
      return updating;
    });
    setSnackBar({ isVisible: true, message: 'Upvoted', barType: 'success', duration: 5000 });
  };

  // <FastImage
  //       style={{ flex: 1, alignSelf: 'stretch', width: win.width, height: win.height, borderRadius: 10 }}
  //       source={{ uri: selectedAsset.data }}
  //       resizeMode={FastImage.resizeMode.contain}
  //     />

  const renderBadgeLikeButton = () => {
    if (badgeLikes) {
      const arr = Object.values(badgeLikes);
      const list = arr.map((badgeAndUsersRelationship, index) => {
        if (auth.isAuthenticated && badgeAndUsersRelationship.users.includes(auth.data._id)) {
          return (
            <View style={{ alignItems: 'center', flexDirection: 'row', marginRight: 10 }} key={index}>
              <FastImage
                source={{ uri: badgeAndUsersRelationship.data.icon }}
                resizeMode={FastImage.resizeMode.contain}
                style={{ marginRight: 5, width: 30, height: 30 }}
                // tintColor={iconColorsTable[badgeObject.badge.color]}
                tintColor={iconColorsTable[badgeAndUsersRelationship.data.color]}
              />
              <Text style={{ color: baseTextColor }}>{badgeAndUsersRelationship.users.length}</Text>
            </View>
          );
        } else {
          return (
            <TouchableOpacity
              style={{ alignItems: 'center', flexDirection: 'row', marginRight: 10 }}
              key={index}
              onPress={() => {
                // console.log(`badgeid ${badgeObject.badge._id}`, `assetId ${asset._id}`, `userId ${auth.data._id}`);
                upvoteBadge(badgeAndUsersRelationship.data._id);
              }}
            >
              <FastImage
                source={{ uri: badgeAndUsersRelationship.data.icon }}
                resizeMode={FastImage.resizeMode.contain}
                style={{ width: 30, height: 30, marginRight: 5 }}
                // tintColor={iconColorsTable[badgeObject.badge.color]}
                tintColor={baseTextColor}
              />
              <Text style={{ color: baseTextColor }}>{badgeAndUsersRelationship.users.length}</Text>
            </TouchableOpacity>
          );
        }
      });

      return (
        <ScrollView showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  const leftActionButtons = () => {
    return (
      <View style={{ flexDirection: 'column', position: 'absolute', bottom: 0, left: 0 }}>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <MaterialIcons name='groups' size={30} color={baseTextColor} />
          <Text style={{ color: baseTextColor }}>{asset.taggedPeople.length}</Text>
        </View>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <MaterialCommunityIcons name='map-marker-radius' size={30} color={baseTextColor} />
        </View>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <MaterialCommunityIcons name='rocket-launch' size={30} color={baseTextColor} />
        </View>
      </View>
    );
  };

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const dateElements = d.split('/');

    return (
      <Text
        style={{
          fontSize: 17,
          textAlign: 'center',
          color: 'orange',
          fontStyle: 'italic',
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      >
        {dateElements[2]}&nbsp;&nbsp;{dateElements[0]}&nbsp;&nbsp;{dateElements[1]}
      </Text>
    );
  };

  return (
    // <AssetContext.Provider value={{ appMenuBottomSheetRef, isMyPage, asset }}>
    <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingRight: 10, paddingLeft: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <FastImage
            style={{ width: '100%', aspectRatio: 1, borderRadius: 10 }}
            source={{ uri: asset.data }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {renderDate(asset.createdAt)}
        </View>
        {asset.createdBy.photo ? (
          <View style={{ alignItems: 'center', flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Image
              source={{ uri: asset.createdBy.photo }}
              style={{ width: 35, height: 35, borderRadius: 7, marginRight: 10 }}
            />
            <Text style={{ color: 'white' }}>{asset.createdBy.name}</Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center', flexDirection: 'row', alignSelf: 'flex-end' }}>
            <FontAwesome5 name='user-astronaut' size={25} style={{ width: 35, height: 35, borderRadius: 7 }} />
            <Text style={{ color: 'white' }}>{asset.createdBy.name}</Text>
          </View>
        )}

        {renderBadgeLikeButton()}

        {/* {leftActionButtons()} */}
      </View>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>Comments</Text>
      <Text style={{ color: baseTextColor, textAlign: 'center' }}>You'll see all the comments of this asset.</Text>

      {/* {renderReactions()} */}
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
        <ActionButton
          label='Add new reaction'
          backgroundColor={iconColorsTable['blue1']}
          icon={<Entypo name='emoji-happy' color={'white'} size={20} />}
          onActionButtonPress={() => addNewReactionBottomSheetRef.current.snapToIndex(0)}
        />
      </View> */}

      {/* <AddNewReactionBottomSheet
        routeParams={props.route.params}
        addNewReactionBottomSheetRef={addNewReactionBottomSheetRef}
        setReactions={setReactions}
      /> */}
    </ScrollView>
  );
};

export default Asset;
