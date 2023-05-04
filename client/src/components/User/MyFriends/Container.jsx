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
    const { myFriends } = result.data;
    setMyFriendObjects(myFriends);
    setIsFetchedMyFriends(true);
  };
  useEffect(() => {
    getMyFriendObjects();
  }, []);
  console.log(myFriendObjects);
  const renderItem = useCallback((friendRelationship) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() =>
          props.navigation.navigate('User', {
            userId: friendRelationship.friend._id,
          })
        }
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage
            style={{
              width: 40,
              height: 40,
              borderRadius: 7,
              marginRight: 10,
              backgroundColor: iconColorsTable['blue1'],
            }}
            source={{
              uri: friendRelationship.friend.photo
                ? friendRelationship.friend.photo
                : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
            tintColor={friendRelationship.friend.photo ? null : 'white'}
          />
          <Text style={{ color: 'white' }}>{friendRelationship.friend.name}</Text>
        </View>
      </TouchableOpacity>
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
      return (
        <Text style={{ color: 'white', textAlign: 'center', paddingTop: 30 }}>You'll see all your friends here.</Text>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      {isFetchedMyFriends ? renderList() : <ActivityIndicator />}
    </View>
  );
};

export default MyFriendsContainer;
