import React, { useRef, useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { baseTextColor, baseBackgroundColor, iconColorsTable } from '../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';
import lampostAPI from '../../../../apis/lampost';

const PostsContainer = (props) => {
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

  const renderDate = (date) => {
    const dateString = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const dateTable = { ...dateString.split(' ') };
    return (
      <Text style={{ color: baseTextColor }}>
        {dateTable['0']}&nbsp;{dateTable['1']}
      </Text>
    );
  };

  const renderLibraryPosts = () => {
    if (libraryPosts.length) {
      console.log(libraryPosts);
      const list = libraryPosts.map((libraryPost, index) => {
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Post', { libraryPost })}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                {libraryPost.user.photo ? (
                  <Image
                    style={{ width: 35, height: 35, marginRight: 15, borderRadius: 7 }}
                    source={{ uri: libraryPost.user.photo }}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: iconColorsTable['blue1'],
                      width: 35,
                      height: 35,
                      borderRadius: 7,
                      marginRight: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FontAwesome5 name='user-astronaut' size={20} color={'white'} />
                  </View>
                )}
                <Text style={{ color: 'white', fontSize: 17 }}>{libraryPost.user.name}</Text>
              </View>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>
                {libraryPost.caption}&nbsp;&nbsp;{renderDate(libraryPost.createdAt)}
              </Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={{ flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap' }}
              onPress={() => props.navigation.navigate('Post', { libraryPost })}
            >
              {libraryPost.topEmojis.map((emoji, index) => {
                return (
                  <Text key={index} style={{ marginRight: 5, fontSize: 25 }}>
                    {emoji}
                  </Text>
                );
              })}
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
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {renderLibraryPosts()}
      </ScrollView>
    </View>
  );
};

export default PostsContainer;
