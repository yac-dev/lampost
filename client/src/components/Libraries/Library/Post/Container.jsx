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
  const addNewReactionBottomSheetRef = useRef(null);
  const [reactions, setReactions] = useState({});
  const { post } = props.route.params;

  const getReactionsByAssetPostId = async () => {
    const result = await lampostAPI.get(`/assetpostandreactionanduserrelationships/${post._id}`);
    const { reactions } = result.data;
    setReactions(reactions);
  };

  useEffect(() => {
    getReactionsByAssetPostId();
  }, []);

  const onReactionPress = async (reaction) => {
    if (reaction.users.includes(auth.data._id)) {
      const payload = {
        assetPostId: post._id,
        reactionId: reaction._id,
        userId: auth.data._id,
      };
      const result = await lampostAPI.post('/assetpostandreactionanduserrelationships/downvote', payload);
      setReactions((previous) => {
        const updating = { ...previous };
        updating[reaction._id]['totalCounts']--;
        updating[reaction._id]['users'] = updating[reaction._id]['users'].filter((user) => user !== auth.data._id);
        return updating;
      });
    } else {
      const payload = {
        assetPostId: post._id,
        reactionId: reaction._id,
        userId: auth.data._id,
      };
      const result = await lampostAPI.post('/assetpostandreactionanduserrelationships/upvote', payload);
      setReactions((previous) => {
        const updating = { ...previous };
        updating[reaction._id]['totalCounts']++;
        updating[reaction._id]['users'].push(auth.data._id);
        return updating;
      });
    }
  };

  const renderReactions = () => {
    const reactionsArr = Object.values(reactions);
    if (reactionsArr.length) {
      const reactionsList = reactionsArr.map((reaction, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              borderWidth: 0.3,
              borderRadius: 10,
              borderColor: reaction.users.includes(auth.data._id) ? iconColorsTable['blue1'] : 'white',
              padding: 10,
              backgroundColor: reaction.users.includes(auth.data._id) ? 'rgb(122, 125, 131)' : sectionBackgroundColor,
              marginRight: 10,
              marginBottom: 10,
            }}
            onPress={() => onReactionPress(reaction)}
          >
            <Text style={{ color: baseTextColor, marginRight: 5 }}>{reaction.content}</Text>
            <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>{reaction.totalCounts}</Text>
          </TouchableOpacity>
        );
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{reactionsList}</View>;
    } else {
      return null;
    }
  };

  return (
    <PostContext.Provider value={{ navigation: props.navigation, post, addNewReactionBottomSheetRef }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
        <View>
          <Text style={{ color: baseTextColor, fontSize: 17, marginBottom: 20 }}>{post.caption}</Text>
          <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
            {post.assets.map((asset, index) => {
              return (
                <Image key={index} source={{ uri: asset.data }} style={{ width: 150, height: 150, marginRight: 10 }} />
              );
            })}
          </ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 20 }}>
            <View style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: 10, marginRight: 10 }}></View>
            <Text style={{ color: baseTextColor }}>{post.user.name}</Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 25 }}>
            <ActionButton
              label='Add more'
              backgroundColor={iconColorsTable['blue1']}
              icon={<Entypo name='emoji-happy' size={25} color='white' />}
              onActionButtonPress={() => addNewReactionBottomSheetRef.current.snapToIndex(0)}
            />
            {renderReactions()}
            {/* <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 0.3,
                borderRadius: 10,
                borderColor: 'white',
                padding: 10,
                backgroundColor: sectionBackgroundColor,
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: baseTextColor, marginRight: 5 }}>Nice photo 😆</Text>
              <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>150</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 0.3,
                borderRadius: 10,
                borderColor: 'white',
                padding: 10,
                backgroundColor: sectionBackgroundColor,
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: baseTextColor, marginRight: 5 }}>Woooow 😮</Text>
              <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>234</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 0.3,
                borderRadius: 10,
                borderColor: 'white',
                padding: 10,
                backgroundColor: sectionBackgroundColor,
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: baseTextColor, marginRight: 5 }}>Wanna go there 👍</Text>
              <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>67</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <AddNewReaction />
      </View>
    </PostContext.Provider>
  );
};

export default Container;
