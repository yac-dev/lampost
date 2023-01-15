import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import { baseBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';

const Post = (props) => {
  const { libraryPost } = props.route.params;
  const [reactions, setReactions] = useState({});
  // {reaction: 'Yes good emoji', count: 5}みたいな感じでデータがくることになる。

  // const renderDate = (date) => {
  //   const dateString = new Date(date).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: '2-digit',
  //   });
  // };

  const renderDate = (date) => {
    const dateString = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const dateTable = { ...dateString.split(' ') };
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, textAlign: 'center', color: baseTextColor }}>{dateTable['0']}</Text>
        <Text style={{ fontSize: 15, textAlign: 'center', color: baseTextColor }}>{dateTable['1']}</Text>
      </View>
    );
  };

  const getReactionsByLibraryPostId = async () => {
    const result = await lampostAPI.get(`/assetpostandreactionanduserrelationships/${libraryPost._id}`);
    const { reactions } = result.data;
    console.log('My reactions', reactions);
    setReactions(reactions);
  };
  useEffect(() => {
    getReactionsByLibraryPostId();
  }, []);
  console.log(libraryPost);

  // ここで、reactionを全てfetchしてくる。
  const renderReactions = () => {
    const arr = Object.values(reactions);
    if (arr.length) {
      const list = arr.map((reaction, index) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderWidth: 0.3,
              borderColor: baseTextColor,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: baseTextColor, fontSize: 17, marginRight: 10 }}>{reaction.content}</Text>
            <Text style={{ color: baseTextColor, fontSize: 17 }}>{reaction.totalCounts}</Text>
          </TouchableOpacity>
        );
      });

      return <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>{list}</View>;
    } else {
      null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
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
      {renderReactions()}
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
        <Text style={{ color: 'white' }}>Add reaction</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>{libraryPost.caption}</Text>
        {renderDate(libraryPost.createdAt)}
      </View>
    </View>
  );
};

export default Post;
