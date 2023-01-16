import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../../../GlobalContext';
import lampostAPI from '../../../../../apis/lampost';
import {
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  rnDefaultBackgroundColor,
} from '../../../../../utils/colorsTable';
import AddNewReactionBottomSheet from './AddNewReactionBottomSheet';
import ActionButton from '../../../../Utils/ActionButton';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PostContainer = (props) => {
  const { auth } = useContext(GlobalContext);
  const { libraryPost } = props.route.params;
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
      <Text style={{ color: baseTextColor }}>
        {dateTable['0']}&nbsp;{dateTable['1']}
      </Text>
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
  // console.log(reactions);

  const upvoteReaction = async (reaction) => {
    const result = lampostAPI.post(`/assetpostandreactionanduserrelationships`);
    setReactions((previous) => {
      const updating = { ...previous };
      updating[reaction._id] = updating[reaction._id] + 1;
      return updating;
    });
  };

  // ここで、reactionを全てfetchしてくる。
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
                  updating[reaction._id].users.push(auth.data._id);
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
      null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image
            style={{ width: 35, height: 35, marginRight: 15, borderRadius: 7 }}
            source={{ uri: libraryPost.user.photo }}
          />
          <Text style={{ color: 'white' }}>{libraryPost.user.name}</Text>
        </View>
        <Text style={{ color: 'white', marginBottom: 10 }}>
          {libraryPost.caption}&nbsp;&nbsp;
          {renderDate(libraryPost.createdAt)}
        </Text>
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
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 10 }}>
          <ActionButton
            label='Add new reaction'
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => addNewReactionBottomSheetRef.current.snapToIndex(0)}
            icon={<MaterialCommunityIcons name='chat-plus' color={'white'} size={20} />}
          />
        </View>

        {renderReactions()}
      </ScrollView>
      <AddNewReactionBottomSheet
        addNewReactionBottomSheetRef={addNewReactionBottomSheetRef}
        setReactions={setReactions}
        libraryPost={libraryPost}
      />
    </View>
  );
};

export default PostContainer;
