import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';

const Members = (props) => {
  console.log('opening members', props.route.params.libraryId);
  const { auth } = useContext(GlobalContext);
  const [members, setMembers] = useState([]);
  const [isFetchedMembers, setIsFetchedMembers] = useState(false);

  const getMembersByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/users/${props.route.params.libraryId}`);
    const { users } = result.data;
    setMembers(users);
    setIsFetchedMembers(true);
  };

  useEffect(() => {
    getMembersByLibraryId();
  }, []);

  const onUserNamePress = (user) => {
    if (!auth.data) {
      setSnackBar({
        isVisible: true,
        barType: 'error',
        message: 'You are required to login or signup',
        duration: 2000,
      });
    } else {
      if (auth.data._id !== user._id) {
        console.log('page opening');
      } else {
        console.log('Not gonna navigate to my page');
      }
    }
  };

  const renderItem = (user) => {
    return <UserInfo user={user} onUserNamePress={onUserNamePress} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10 }}>
      {!isFetchedMembers ? (
        <ActivityIndicator textContent={'🧒👨🏽‍🦳👨🏾‍🦱🙋'} />
      ) : (
        <FlatList
          data={members}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      )}
    </View>
  );
};

export default Members;
