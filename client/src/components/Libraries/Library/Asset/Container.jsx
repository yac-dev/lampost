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

const Asset = (props) => {
  const { MaterialCommunityIcons, Ionicons, Entypo } = iconsTable;
  const { auth, setSnackBar } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const assetMenuBottomSheetRef = useRef(null);
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
      const list = libraryAndAssetRelationship.reactions.map((reactionObject, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              backgroundColor: inputBackgroundColorNew,
              borderRadius: 5,
              marginRight: 10,
            }}
            onPress={() =>
              setReactions((previous) => {
                const updating = [...previous];
                updating[index].upvoted++;
                return updating;
              })
            }
          >
            <FastImage
              source={{ uri: reactionObject.reaction.icon }}
              style={{ width: 30, height: 30, marginRight: 5 }}
              tintColor='white'
            />
            <Text style={{ color: 'white', marginRight: 10 }}>{reactionObject.reaction.comment}</Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{reactionObject.upvoted}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginLeft: 10 }}>{list}</View>
      );
    } else {
      return null;
    }
  };

  // dateは、写真の右下に入れる。
  const renderAsset = () => {
    if (props.route.params.assetType === 'photo') {
      return (
        <View style={{ width: '100%', aspectRatio: 1, marginBottom: 20 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            source={{ uri: props.route.params.asset.data }}
          />
          {libraryAndAssetRelationship ? (
            <View style={{ position: 'absolute', bottom: 5, right: 15 }}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: 'bold',
                  fontSize: 20,
                  fontStyle: 'italic',
                }}
              >
                {libraryAndAssetRelationship.asset.meetup.title}
              </Text>
              <Text style={{ color: 'orange', fontStyle: 'italic', alignSelf: 'center' }}>
                {renderDate(libraryAndAssetRelationship.asset.createdAt)}
              </Text>
            </View>
          ) : null}
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
    <AssetContext.Provider value={{ assetMenuBottomSheetRef, navigation: props.navigation }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 10, marginRight: 10 }}>
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

        {renderAsset()}
        {renderReactions()}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: inputBackgroundColorNew,
            padding: 5,
            alignSelf: 'flex-start',
            marginLeft: 10,
          }}
        >
          <MaterialCommunityIcons name='comment' color={'white'} size={20} style={{ marginRight: 5 }} />
          <Text style={{ color: 'white', marginRight: 10 }}>Comments</Text>
          <Text style={{ color: 'white' }}>10</Text>
        </TouchableOpacity>
        {/* <Text style={{ color: 'white' }}>Hello</Text> */}
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
