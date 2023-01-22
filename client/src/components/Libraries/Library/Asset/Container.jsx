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
  const { auth } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const [asset, setAsset] = useState({
    _id: props.route.params.asset._id,
    data: props.route.params.asset.data,
    badges: [],
    createdBy: null,
  });
  const [reactions, setReactions] = useState({});
  const addNewReactionBottomSheetRef = useRef(null);

  // data structure
  //  {
  //    { reaction1: {_id: reaction1, content: 'Nice e', totalCounts: 3,
  //    users: {user1: {_id: user1, name: 'a'}, {user2: {_id: user2, name: 'b'}}} },
  //    { reaction2: {_id: reaction2, content: 'Great e', totalCounts: 5,
  //     users: {user3: {_id: user3, name: 'c'}}
  //    ,}
  //   }
  const getAssetById = async () => {
    const result = await lampostAPI.get(`/assets/${props.route.params.asset._id}`);
    const { asset } = result.data;
    setAsset(asset);
  };
  useEffect(() => {
    getAssetById();
  }, []);

  console.log(asset);

  const getReactionsByAssetId = async () => {
    const result = await lampostAPI.get(`/assetandreactionanduserrelationships/${asset._id}`);
    const { reactions } = result.data;
    setReactions(reactions);
  };
  useEffect(() => {
    getReactionsByAssetId();
  }, []);

  const renderReactions = () => {
    const reactionsArray = Object.values(reactions);
    if (reactionsArray.length) {
      const list = reactionsArray.map((reaction, index) => {
        if (reaction.users[auth.data._id]) {
          return (
            // <View style={{ backgroundColor: rnDefaultBackgroundColor, borderRadius: 10 }} key={index}>
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderWidth: 0.3,
                borderColor: iconColorsTable['lightGreen1'],
                borderRadius: 10,
                backgroundColor: iconColorsTable['lightGreen1'],
                marginRight: 10,
                marginBottom: 10,
              }}
              // downvoteというか、取り消しはできなくする。めんどいし。
            >
              <Text style={{ color: 'white', marginRight: 10 }}>{reaction.content}</Text>
              <Text style={{ color: 'white' }}>{reaction.totalCounts}</Text>
            </View>
            // </View>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderWidth: 0.3,
                borderColor: 'white',
                borderRadius: 10,
                marginRight: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                setReactions((previous) => {
                  const updating = { ...previous };
                  updating[reaction._id].totalCounts = updating[reaction._id].totalCounts + 1;
                  updating[reaction._id].users[auth.data._id] = {
                    _id: auth.data._id,
                    name: auth.data.name,
                    photo: auth.data.photo,
                  };
                  return updating;
                });
              }}
            >
              <Text style={{ color: 'white', marginRight: 10 }}>{reaction.content}</Text>
              <Text style={{ color: 'white' }}>{reaction.totalCounts}</Text>
            </TouchableOpacity>
          );
        }
      });

      return <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>{list}</View>;
    } else {
      return null;
    }
  };

  const renderBadgeLikeButton = (badges) => {
    if (asset.badges.length) {
      const list = badges.map((badgeObject, index) => {
        return (
          <TouchableOpacity style={{ padding: 10, alignItems: 'center' }} key={index}>
            <FastImage
              source={{ uri: badgeObject.badge.icon }}
              resizeMode={FastImage.resizeMode.contain}
              style={{ marginBottom: 10, width: 35, height: 35 }}
              // tintColor={iconColorsTable[badgeObject.badge.color]}
              tintColor={baseTextColor}
            />
            <Text style={{ color: baseTextColor }}>{badgeObject.totalCounts}</Text>
          </TouchableOpacity>
        );
      });

      return <View style={{ flexDirection: 'column', position: 'absolute', bottom: 0, right: 0 }}>{list}</View>;
    } else {
      return null;
    }
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
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View>
        <FastImage
          style={{ width: '100%', aspectRatio: 1, borderRadius: 10 }}
          source={{ uri: asset.data }}
          resizeMode={FastImage.resizeMode.contain}
        />
        {renderBadgeLikeButton(asset.badges)}
        {leftActionButtons()}
      </View>

      {/* {renderReactions()} */}
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
        <ActionButton
          label='Add new reaction'
          backgroundColor={iconColorsTable['blue1']}
          icon={<Entypo name='emoji-happy' color={'white'} size={20} />}
          onActionButtonPress={() => addNewReactionBottomSheetRef.current.snapToIndex(0)}
        />
      </View> */}

      <AddNewReactionBottomSheet
        routeParams={props.route.params}
        addNewReactionBottomSheetRef={addNewReactionBottomSheetRef}
        setReactions={setReactions}
      />
    </View>
  );
};

export default Asset;
