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
import AddNewReactionBottomSheet from './AddNewReactionBottomSheet';

const Asset = (props) => {
  // まあ、assetでまずrelationshipsをとってくるのは前提として、
  // {badge1: {data: badge1Data, users: [user1, user2]}, badge2: {data: badge2Data, users: []}}
  const { auth } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const [asset, setAsset] = useState(props.route.params.asset);
  const [badgeLikes, setBadgeLikes] = useState(() => {
    const table = {};
    for (let i = 0; i < props.route.params.asset.badges.length; i++) {
      table[props.route.params.asset.badges[i].badge._id] = {};
      table[props.route.params.asset.badges[i].badge._id]['data'] = props.route.params.asset.badges[i].badge;
      table[props.route.params.asset.badges[i].badge._id]['users'] = [];
    }
    return table;
  });
  const addNewReactionBottomSheetRef = useRef(null);
  console.log(badgeLikes);

  // data structure
  //  {
  //    { reaction1: {_id: reaction1, content: 'Nice e', totalCounts: 3,
  //    users: {user1: {_id: user1, name: 'a'}, {user2: {_id: user2, name: 'b'}}} },
  //    { reaction2: {_id: reaction2, content: 'Great e', totalCounts: 5,
  //     users: {user3: {_id: user3, name: 'c'}}
  //    ,}
  //   }

  const getBadgeLiked = async () => {
    const result = await lampostAPI.get(`/assetandbadgeanduserrelationships/${props.route.params.asset._id}`);
    const { table } = result.data;
    setBadgeLikes((previous) => {
      const updating = { ...previous };
      for (const i in table) {
        updating[i]['users'] = table[i];
      }
      return updating;
    });
  };
  useEffect(() => {
    getBadgeLiked();
  }, []);

  // badgeIdだけはとているからね。
  // const getBadgeLiked = async () => {
  //   const result = await lampostAPI.post();
  // };

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
  };

  // const getReactionsByAssetId = async () => {
  //   const result = await lampostAPI.get(`/assetandreactionanduserrelationships/${asset._id}`);
  //   const { reactions } = result.data;
  //   setReactions(reactions);
  // };
  // useEffect(() => {
  //   getReactionsByAssetId();
  // }, []);

  // const renderReactions = () => {
  //   const reactionsArray = Object.values(reactions);
  //   if (reactionsArray.length) {
  //     const list = reactionsArray.map((reaction, index) => {
  //       if (reaction.users[auth.data._id]) {
  //         return (
  //           // <View style={{ backgroundColor: rnDefaultBackgroundColor, borderRadius: 10 }} key={index}>
  //           <View
  //             key={index}
  //             style={{
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               padding: 10,
  //               borderWidth: 0.3,
  //               borderColor: iconColorsTable['lightGreen1'],
  //               borderRadius: 10,
  //               backgroundColor: iconColorsTable['lightGreen1'],
  //               marginRight: 10,
  //               marginBottom: 10,
  //             }}
  //             // downvoteというか、取り消しはできなくする。めんどいし。
  //           >
  //             <Text style={{ color: 'white', marginRight: 10 }}>{reaction.content}</Text>
  //             <Text style={{ color: 'white' }}>{reaction.totalCounts}</Text>
  //           </View>
  //           // </View>
  //         );
  //       } else {
  //         return (
  //           <TouchableOpacity
  //             key={index}
  //             style={{
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               padding: 10,
  //               borderWidth: 0.3,
  //               borderColor: 'white',
  //               borderRadius: 10,
  //               marginRight: 10,
  //               marginBottom: 10,
  //             }}
  //             onPress={() => {
  //               setReactions((previous) => {
  //                 const updating = { ...previous };
  //                 updating[reaction._id].totalCounts = updating[reaction._id].totalCounts + 1;
  //                 updating[reaction._id].users[auth.data._id] = {
  //                   _id: auth.data._id,
  //                   name: auth.data.name,
  //                   photo: auth.data.photo,
  //                 };
  //                 return updating;
  //               });
  //             }}
  //           >
  //             <Text style={{ color: 'white', marginRight: 10 }}>{reaction.content}</Text>
  //             <Text style={{ color: 'white' }}>{reaction.totalCounts}</Text>
  //           </TouchableOpacity>
  //         );
  //       }
  //     });

  //     return <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>{list}</View>;
  //   } else {
  //     return null;
  //   }
  // };

  const renderBadgeLikeButton = () => {
    const arr = Object.values(badgeLikes);
    const list = arr.map((badgeTable, index) => {
      if (badgeTable.users.includes(auth.data._id)) {
        return (
          <View style={{ padding: 10, alignItems: 'center' }} key={index}>
            <FastImage
              source={{ uri: badgeTable.data.icon }}
              resizeMode={FastImage.resizeMode.contain}
              style={{ marginBottom: 10, width: 30, height: 30 }}
              // tintColor={iconColorsTable[badgeObject.badge.color]}
              tintColor={iconColorsTable[badgeTable.data.color]}
            />
            <Text style={{ color: baseTextColor }}>{badgeTable.users.length}</Text>
          </View>
        );
      } else {
        return (
          <TouchableOpacity
            style={{ padding: 10, alignItems: 'center' }}
            key={index}
            onPress={() => {
              // console.log(`badgeid ${badgeObject.badge._id}`, `assetId ${asset._id}`, `userId ${auth.data._id}`);
              upvoteBadge(badgeTable.data._id);
            }}
          >
            <FastImage
              source={{ uri: badgeTable.data.icon }}
              resizeMode={FastImage.resizeMode.contain}
              style={{ marginBottom: 10, width: 30, height: 30 }}
              // tintColor={iconColorsTable[badgeObject.badge.color]}
              tintColor={baseTextColor}
            />
            <Text style={{ color: baseTextColor }}>{badgeTable.users.length}</Text>
          </TouchableOpacity>
        );
      }
    });

    return <View style={{ flexDirection: 'column', position: 'absolute', bottom: 0, right: 0 }}>{list}</View>;
  };

  const leftActionButtons = () => {
    return (
      <View style={{ flexDirection: 'column', position: 'absolute', bottom: 0, left: 0 }}>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <MaterialIcons name='groups' size={30} color={baseTextColor} />
          <Text style={{ color: baseTextColor }}>0</Text>
        </View>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <MaterialCommunityIcons name='map-marker-radius' size={30} color={baseTextColor} />
        </View>
        <View style={{ alignItems: 'center', padding: 10 }}>
          <MaterialCommunityIcons name='rocket-launch' size={30} color={baseTextColor} />
        </View>
        {asset.createdBy ? (
          <View style={{ alignItems: 'center', padding: 10 }}>
            <Image source={{ uri: asset.createdBy.photo }} style={{ width: 35, height: 35, borderRadius: 7 }} />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    // <AssetContext.Provider value={{ appMenuBottomSheetRef, isMyPage, asset }}>
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingRight: 10, paddingLeft: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <FastImage
          style={{ width: '100%', aspectRatio: 1, borderRadius: 10 }}
          source={{ uri: asset.data }}
          resizeMode={FastImage.resizeMode.contain}
        />
        {renderBadgeLikeButton()}
        {leftActionButtons()}
      </View>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>Comments</Text>
      <ScrollView>
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>You'll see all the comments of this asset.</Text>
      </ScrollView>

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
    </View>
  );
};

export default Asset;
