import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';

const MyFriends = (props) => {
  const { auth } = useContext(GlobalContext);
  const [myFriends, setMyFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isFetchedMyFriends, setIsFetchedMyFriends] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={selectedFriends.length ? false : true}>
          <Text
            style={{
              color: selectedFriends.length ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedFriends]);

  const onDonePress = () => {
    props.navigation.navigate('Create new library', {
      selectedFriends,
    });
  };

  const getMyFriends = async () => {
    const result = await lampostAPI.get(`/friendrelationships/${auth.data._id}`);
    const { myFriends } = result.data;
    setMyFriends(myFriends);
    setIsFetchedMyFriends(true);
  };

  useEffect(() => {
    getMyFriends();
  }, []);

  const renderMyFriends = () => {
    if (myFriends.length) {
      const list = myFriends.map((myFriend, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View>
              <FastImage source={{ uri: myFriend.friend.photo }} style={{ width: 50, height: 50, borderRadius: 5 }} />
              <Text style={{ color: 'white' }}>{myFriend.friend.name}</Text>
            </View>
            <View>
              <Text style={{ color: 'white' }}>Check mark here</Text>
            </View>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView>
          <View>{list}</View>
        </ScrollView>
      );
    } else {
      return (
        <Text style={{ textAlign: 'center', color: 'white', marginTop: 50 }}>You don't have any friends yet.</Text>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      {myFriends.length ? <Text style={{ color: 'white' }}>Please choose the friends you want to invite.</Text> : null}

      {isFetchedMyFriends ? renderMyFriends() : <ActivityIndicator />}
    </View>
  );
};

export default MyFriends;
