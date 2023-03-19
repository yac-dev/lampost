import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor, backgroundColorsTable, iconColorsTable } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import { iconsTable } from '../../../utils/icons';

const MyFriendsContainer = (props) => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const [myFriendObjects, setMyFriendObjects] = useState([]);
  const [isFetchedMyFriends, setIsFetchedMyFriends] = useState(false);

  const getMyFriendObjects = async () => {
    const result = await lampostAPI.get(`/friendrelationships/${auth.data._id}`);
    const { friendObjects } = result.data;
    setMyFriendObjects(friendObjects);
    setIsFetchedMyFriends(true);
  };
  useEffect(() => {
    getMyFriendObjects();
  }, []);

  const renderItem = useCallback((friendObject) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage
            style={{ width: 40, height: 40, borderRadius: 7, marginRight: 10 }}
            source={{
              uri: friendObject.user.photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <Text style={{ color: 'white' }}>{friendObject.user.name}</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            backgroundColor: iconColorsTable['blue1'],
            borderRadius: 7,
          }}
          onPress={() => props.navigation.navigate('Chat room', { friendObject })}
        >
          <Ionicons name='ios-chatbubbles' size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const renderList = () => {
    if (myFriendObjects.length) {
      return (
        <FlatList
          data={myFriendObjects}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    } else {
      return <Text style={{ color: 'white' }}>You'll see all the friends you added.</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      {isFetchedMyFriends ? renderList() : <ActivityIndicator />}
    </View>
  );
};

export default MyFriendsContainer;
