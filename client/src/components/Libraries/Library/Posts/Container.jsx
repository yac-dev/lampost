import React, { useRef, useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import PostContext from './PostContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import {
  baseTextColor,
  sectionBackgroundColor,
  baseBackgroundColor,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import { Entypo } from '@expo/vector-icons';
import AddNewReaction from './AddNewReactionBottomSheet';
import lampostAPI from '../../../../apis/lampost';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [libraryPosts, setLibraryPosts] = useState([]);

  const getLibraryPostsByLibraryId = async () => {
    const result = await lampostAPI.get(`/assetposts/${props.route.params.libraryId}`);
    const { assetPosts } = result.data;
    setLibraryPosts(assetPosts);
  };

  useEffect(() => {
    getLibraryPostsByLibraryId();
  }, []);

  const renderLibraryPosts = () => {
    if (libraryPosts.length) {
      console.log(libraryPosts);
      const list = libraryPosts.map((libraryPost, index) => {
        return (
          <View key={index}>
            <View style={{ flexDirection: 'row' }}>
              {libraryPost.assets.map((asset, index) => {
                return (
                  <Image
                    key={index}
                    style={{ width: '90%', aspectRatio: 1, marginBottom: 10, marginRight: 5 }}
                    source={{ uri: asset.data }}
                  />
                );
              })}
            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Post', { libraryPost })}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {libraryPost.topEmojis.map((emoji, index) => {
                  return (
                    <Text key={index} style={{ marginRight: 5, fontSize: 25 }}>
                      {emoji}
                    </Text>
                  );
                })}
                {/* <Text style={{ color: baseTextColor }}>and more...</Text> */}
              </View>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>{libraryPost.caption}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                <Image
                  style={{ width: 35, height: 35, marginRight: 10, borderRadius: 10 }}
                  source={{ uri: libraryPost.user.photo }}
                />
                <Text style={{ color: baseTextColor }}>{libraryPost.user.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      });

      return <View>{list}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor, textAlign: 'center' }}>You'll see all the posts of this library.</Text>
        </View>
      );
    }
  };

  return (
    <PostContext.Provider value={{ navigation: props.navigation }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {renderLibraryPosts()}
        </ScrollView>
      </View>
    </PostContext.Provider>
  );
};

export default Container;
