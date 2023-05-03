import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import { baseBackgroundColor, iconColorsTable, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { iconsTable } from '../../../utils/icons';
const { Ionicons } = iconsTable;

const MyFriends = (props) => {
  const { auth } = useContext(GlobalContext);
  const [myFriends, setMyFriends] = useState({});
  const [selectedFriends, setSelectedFriends] = useState({});
  const [isFetchedMyFriends, setIsFetchedMyFriends] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={Object.values(selectedFriends).length ? false : true}>
          <Text
            style={{
              color: Object.values(selectedFriends).length ? 'white' : screenSectionBackgroundColor,
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

  useEffect(() => {
    if (props.route.params?.selectedFriendships) {
      setSelectedFriends((previous) => {
        return {
          ...previous,
          ...props.route.params.selectedFriendships,
        };
      });
    }
  }, [props.route.params?.selectedFriendships]);

  const onDonePress = () => {
    props.navigation.navigate('Create new library', {
      selectedFriends,
    });
  };

  const getMyFriends = async () => {
    const result = await lampostAPI.get(`/friendrelationships/${auth.data._id}`);
    const { myFriends } = result.data;
    setMyFriends(() => {
      const table = {};
      myFriends.forEach((myFriend) => {
        table[myFriend._id] = myFriend;
      });
      return table;
    });

    setIsFetchedMyFriends(true);
  };

  useEffect(() => {
    getMyFriends();
  }, []);

  const renderMyFriends = () => {
    if (Object.values(myFriends).length) {
      const list = Object.values(myFriends).map((myFriend, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              if (selectedFriends[myFriend._id]) {
                setSelectedFriends((previous) => {
                  const updating = { ...previous };
                  delete updating[myFriend._id];
                  return updating;
                });
              } else {
                setSelectedFriends((previous) => {
                  return {
                    ...previous,
                    [myFriend._id]: myFriend,
                  };
                });
              }
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={{
                  uri: myFriend.friend.photo
                    ? myFriend.friend.photo
                    : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 10,
                  backgroundColor: iconColorsTable['blue1'],
                }}
                tintColor={'white'}
              />
              <Text style={{ color: 'white', fontSize: 17 }}>{myFriend.friend.name}</Text>
            </View>
            {selectedFriends[myFriend._id] ? (
              <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
            ) : null}
          </TouchableOpacity>
        );
      });
      return (
        <View>
          <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>
            Who do you invite to your library?
          </Text>
          <ScrollView>
            <View>{list}</View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <Text style={{ textAlign: 'center', color: 'white', marginTop: 50 }}>You don't have any friends yet.</Text>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      {isFetchedMyFriends ? renderMyFriends() : <ActivityIndicator />}
    </View>
  );
};

export default MyFriends;
