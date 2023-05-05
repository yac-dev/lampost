import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import {
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  inputBackgroundColorNew,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { iconsTable } from '../../../utils/icons';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import SnackBar from '../../Utils/SnackBar';
const { Ionicons } = iconsTable;

const InviteMyFriends = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [myFriends, setMyFriends] = useState({});
  const [selectedFriends, setSelectedFriends] = useState({});
  const [isFetchedMyFriends, setIsFetchedMyFriends] = useState(false);
  const [invitationMessageTextInput, setInvitationMessageTextInput] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={invitationMessageTextInput && Object.values(selectedFriends).length ? false : true}
        >
          <Text
            style={{
              color:
                invitationMessageTextInput && Object.values(selectedFriends).length
                  ? 'white'
                  : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedFriends, invitationMessageTextInput]);

  const onDonePress = async () => {
    setLoading(true);
    const payload = {
      friendIds: Object.values(selectedFriends).map((relationship) => relationship.friend._id),
      invitationMessage: invitationMessageTextInput,
      user: {
        _id: auth.data._id,
        name: auth.data.name,
      },
    };
    const result = await lampostAPI.post(`/notifications/invitation/library/${props.route.params.libraryId}`, payload);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Your invitations have been sent to your friends.',
      duration: 5000,
    });
    props.navigation.goBack();
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
      <Text style={{ color: 'white', marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>
        Who do you invite to this library?
      </Text>
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>
        Write the invitation message and then choose friends who you want to invite.
      </Text>
      <TextInput
        placeholder='Type message here...'
        placeholderTextColor={baseTextColor}
        style={{
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          backgroundColor: inputBackgroundColorNew,
          color: 'white',
        }}
        value={invitationMessageTextInput}
        onChangeText={(text) => setInvitationMessageTextInput(text)}
      />
      {isFetchedMyFriends ? renderMyFriends() : <ActivityIndicator />}
      <LoadingSpinner />
      <SnackBar />
    </View>
  );
};

export default InviteMyFriends;
