import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor, backgroundColorsTable, iconColorsTable } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import { iconsTable } from '../../../utils/icons';

const MyFriendsContainer = (props) => {
  const { Ionicons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const [myFriends, setMyFriends] = useState([]);
  const [isFetchedMyFriends, setIsFetchedMyFriends] = useState(false);

  const getMyFriends = async () => {
    const result = await lampostAPI.get(`/friendrelationships/${auth.data._id}`);
    const { friends } = result.data;
    setMyFriends(friends);
    setIsFetchedMyFriends(true);
  };
  useEffect(() => {
    getMyFriends();
  }, []);

  const renderItem = useCallback((user) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage
            style={{ width: 40, height: 40, borderRadius: 7, marginRight: 10 }}
            source={{
              uri: user.photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <Text style={{ color: 'white' }}>{user.name}</Text>
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
          onPress={() => props.navigation.navigate('Chat room', { userId: user._id })}
        >
          <Ionicons name='ios-chatbubbles' size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const renderList = () => {
    if (myFriends.length) {
      return (
        <FlatList
          data={myFriends}
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
