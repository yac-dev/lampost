import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { sectionBackgroundColor, baseTextColor, baseBackgroundColor } from '../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';
import UserInfo from '../../Utils/UserInfo';

const Members = (props) => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const [isFetchedMembers, setIsFetchedMembers] = useState(false);
  const [members, setMembers] = useState([]);

  const getUsersByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/users/${props.route.params.libraryId}`);
    const { users } = result.data;
    setMembers(users);
    setIsFetchedMembers(true);
  };
  useEffect(() => {
    getUsersByLibraryId();
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
        props.navigation.navigate('User', { userId: user._id });
      } else {
        console.log('Not gonna navigate to my page');
      }
    }
  };

  // const renderMembers = () => {
  //   if (members.length) {
  //     const membersList = members.map((user, index) => {
  //       return (
  //         <TouchableOpacity
  //           key={index}
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             // padding: 10,
  //           }}
  //           onPress={() => {
  //             if (!auth.data || auth.data._id !== user._id) {
  //               navigation.navigate('User', { userId: user._id });
  //             }
  //           }}
  //         >
  //           <UserInfo user={user} />
  //         </TouchableOpacity>
  //       );
  //     });

  //     return (
  //       <View style={{ backgroundColor: sectionBackgroundColor, padding: 5, borderRadius: 10 }}>{membersList}</View>
  //     );
  //   } else {
  //     return <Text style={{ color: 'white' }}>You'll see all those joined this library.</Text>;
  //   }
  // };

  const renderItem = (user) => {
    return <UserInfo user={user} onUserNamePress={onUserNamePress} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10 }}>
      {!isFetchedMembers ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={members} renderItem={({ item }) => renderItem(item)} keyExtractor={(item) => item._id} />
      )}
    </View>
  );
};

export default Members;
