import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import AssetContext from './AssetContext';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import {
  baseBackgroundColor,
  inputBackgroundColorNew,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AssetMenuBottomSheet from './AssetMenuBottomSheet';
import { iconsTable } from '../../../../utils/icons';
import AddReactionBottomSheet from './AddReactionBottomSheet';

const Asset = (props) => {
  const { MaterialCommunityIcons, Ionicons, Entypo, Feather } = iconsTable;
  const { auth, setSnackBar } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const assetMenuBottomSheetRef = useRef(null);
  const addReactionBottomSheetRef = useRef(null);
  // const [asset, setAsset] = useState(null);
  const [libraryAndAssetRelationship, setLibraryAndAssetRelationship] = useState(null);
  const [reactions, setReactions] = useState([]);

  console.log(libraryAndAssetRelationship);
  const getAsset = async () => {
    const result = await lampostAPI.get(
      `/libraryandassetrelationships/${props.route.params.libraryId}/${props.route.params.asset._id}`
    );
    const { libraryAndAssetRelationship } = result.data;
    setLibraryAndAssetRelationship(libraryAndAssetRelationship);
    setReactions(libraryAndAssetRelationship.reactions);
  };
  useEffect(() => {
    getAsset();
  }, []);
  // console.log(asset);

  const creatReaction = async (reactionId) => {
    const result = await lampostAPI.post(
      `/libraryandassetrelationships/${props.route.params.libraryId}/${props.route.params.asset._id}`,
      { userId: auth.data._id, reactionId }
    );
    setReactions((previous) => {
      const updating = [...previous];
      updating.forEach((reactionObject) => {
        if (reactionObject.reaction._id === reactionId) {
          reactionObject.upvoted++;
          reactionObject.users.push(auth.data._id);
        }
      });

      return updating;
    });
  };

  // const renderTaggedPeople = () => {
  //   if (asset.taggedPeople.length) {
  //     const list = asset.taggedPeople.map((user, index) => {
  //       return (
  //         <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
  //           <FastImage
  //             style={{ width: 40, height: 40, borderRadius: 5, marginRight: 10 }}
  //             source={{ uri: user.photo }}
  //           />
  //           <Ionicons name='pricetag' size={15} color={'white'} style={{ position: 'absolute', top: -8, right: 3 }} />
  //           {/* <Text style={{ color: 'white' }}>{user.name}</Text> */}
  //         </View>
  //       );
  //     });

  //     return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>;
  //   } else {
  //     return null;
  //   }
  // };

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
          color: 'orange',
          // color: 'white',
          fontStyle: 'italic',
        }}
      >
        {dateElements[2]}&nbsp;&nbsp;{dateElements[0]}&nbsp;&nbsp;{dateElements[1]}
      </Text>
    );
  };

  const renderReactions = () => {
    if (reactions.length) {
      const list = reactions.map((reactionObject, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              // width: 75,
              // height: 75,
              // backgroundColor: inputBackgroundColorNew,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 15,
            }}
          >
            <TouchableOpacity
              key={index}
              style={{
                width: 40,
                height: 40,
                backgroundColor: reactionObject.users.includes(auth.data._id)
                  ? rnDefaultBackgroundColor
                  : // : backgroundColorsTable[reactionObject.reaction.color],
                    inputBackgroundColorNew,
                borderRadius: 7,
                // marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
                borderWidth: reactionObject.users.includes(auth.data._id) ? 0.7 : null,
                borderColor: reactionObject.users.includes(auth.data._id)
                  ? iconColorsTable[reactionObject.reaction.color]
                  : null,
              }}
              disabled={reactionObject.users.includes(auth.data._id) ? true : false}
              onPress={() => {
                creatReaction(reactionObject.reaction._id);
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  backgroundColor: reactionObject.users.includes(auth.data._id)
                    ? backgroundColorsTable[reactionObject.reaction.color]
                    : inputBackgroundColorNew,
                }}
              >
                <FastImage
                  source={{ uri: reactionObject.reaction.icon }}
                  style={{ width: 30, height: 30 }}
                  tintColor={
                    reactionObject.users.includes(auth.data._id)
                      ? iconColorsTable[reactionObject.reaction.color]
                      : 'white'
                  }
                />
              </View>
              <View
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  top: -9,
                  right: -9,
                  backgroundColor: reactionObject.users.includes(auth.data._id)
                    ? iconColorsTable[reactionObject.reaction.color]
                    : inputBackgroundColorNew,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>{reactionObject.users.length}</Text>
              </View>
              {/* <Text style={{ color: 'white', marginRight: 10 }}>{reactionObject.reaction.comment}</Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{reactionObject.users.length}</Text> */}
            </TouchableOpacity>
            <Text numberOfLines={2} style={{ color: 'white', fontSize: 15 }}>
              {reactionObject.reaction.comment}
            </Text>
          </View>
        );
      });

      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // marginBottom: 5,
            marginLeft: 10,
            // paddingBottom: 10,
            position: 'absolute',
            bottom: 5,
          }}
        >
          {list}
        </View>
      );
    } else {
      return null;
    }
  };

  // dateは、写真の右下に入れる。
  const renderAsset = () => {
    if (props.route.params.assetType === 'photo') {
      return (
        <View style={{ width: '100%', aspectRatio: 1, marginBottom: 5 }}>
          <FastImage style={{ width: '100%', height: '100%' }} source={{ uri: props.route.params.asset.data }} />
          {libraryAndAssetRelationship
            ? // <View style={{ position: 'absolute', bottom: 5, right: 15 }}>
              //   <Text
              //     style={{
              //       color: 'orange',
              //       fontWeight: 'bold',
              //       fontSize: 20,
              //       fontStyle: 'italic',
              //     }}
              //   >
              //     {libraryAndAssetRelationship.asset.meetup.title}
              //   </Text>
              //   <Text style={{ color: 'orange', fontStyle: 'italic', alignSelf: 'center' }}>
              //     {renderDate(libraryAndAssetRelationship.asset.createdAt)}
              //   </Text>
              // </View>
              renderReactions()
            : null}
        </View>
      );
    } else if (props.route.params.assetType === 'video') {
      return (
        <View>
          <Video
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: props.route.params.asset.data,
            }}
            useNativeControls={true}
            resizeMode='stretch'
            isLooping={true}
          />
          {/* {asset ? (
            <View style={{ position: 'absolute', bottom: 90, alignSelf: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginBottom: 5,
                  fontStyle: 'italic',
                }}
              >
                {asset.meetup.title}
              </Text>
              <Text style={{ color: 'orange', fontStyle: 'italic', alignSelf: 'center' }}>
                {renderDate(asset.createdAt)}
              </Text>
            </View>
          ) : null}
          {asset ? (
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 25,
                alignSelf: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <ScrollView
                horizontal={true}
                style={{ paddingTop: 10 }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              >
                <View>
                  <FastImage
                    style={{ width: 40, height: 40, borderRadius: 5, marginRight: 13 }}
                    source={{ uri: asset.createdBy.photo }}
                  />
                  <MaterialCommunityIcons
                    name='camera'
                    size={20}
                    color={'white'}
                    style={{ position: 'absolute', top: -8, right: 3 }}
                  />
                </View>
                {renderTaggedPeople()}
              </ScrollView>
            </View>
          ) : null} */}
        </View>
      );
    }
  };

  return (
    <AssetContext.Provider
      value={{
        assetMenuBottomSheetRef,
        navigation: props.navigation,
        addReactionBottomSheetRef,
        reactions,
        setReactions,
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {libraryAndAssetRelationship ? (
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 10 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <FastImage
                  source={{
                    uri: libraryAndAssetRelationship.asset.createdBy.photo
                      ? libraryAndAssetRelationship.asset.createdBy.photo
                      : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                  }}
                  style={{ width: '100%', height: '100%' }}
                  tintColor='white'
                />
              </View>
              <Text style={{ color: 'white', fontSize: 17 }}>{libraryAndAssetRelationship.asset.createdBy.name}</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
              {libraryAndAssetRelationship.asset.meetup.title}
            </Text>
          </View>
        ) : null}
        {renderAsset()}
        <View style={{ padding: 10 }}>
          <TouchableOpacity style={{ backgroundColor: iconColorsTable['blue1'], padding: 10, borderRadius: 5 }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{ color: 'white' }}>Comments</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* {renderReactions()} */}
        {/* <AddReactionBottomSheet /> */}
      </SafeAreaView>
    </AssetContext.Provider>
  );
};

export default Asset;

{
  /* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: inputBackgroundColorNew,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <MaterialCommunityIcons name='comment' color={'white'} size={20} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white' }}>15</Text>
            </TouchableOpacity>
          </View> */
}
{
  /* {asset ? (
            <View style={{ position: 'absolute', bottom: 90, alignSelf: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginBottom: 5,
                  fontStyle: 'italic',
                }}
              >
                {asset.meetup.title}
              </Text>
              <Text style={{ color: 'orange', fontStyle: 'italic', alignSelf: 'center' }}>
                {renderDate(asset.createdAt)}
              </Text>
            </View>
          ) : null}
          {asset ? (
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 25,
                alignSelf: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <ScrollView
                horizontal={true}
                style={{ paddingTop: 10 }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              >
                <View>
                  <FastImage
                    style={{ width: 40, height: 40, borderRadius: 5, marginRight: 13 }}
                    source={{ uri: asset.createdBy.photo }}
                  />
                  <MaterialCommunityIcons
                    name='camera'
                    size={20}
                    color={'white'}
                    style={{ position: 'absolute', top: -8, right: 3 }}
                  />
                </View>
                {renderTaggedPeople()}
              </ScrollView>
            </View>
          ) : null} */
}
