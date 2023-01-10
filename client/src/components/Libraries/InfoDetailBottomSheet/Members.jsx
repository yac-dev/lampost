import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { sectionBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';
import UserInfo from '../../Utils/UserInfo';

const Members = () => {
  const { auth } = useContext(GlobalContext);
  const { selectedLibrary, selectedLibraryDetailComponent, navigation } = useContext(LibrariesContext);
  const [members, setMembers] = useState([]);

  const getUsersByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/users/${selectedLibrary._id}`);
    const { users } = result.data;
    setMembers(users);
  };
  useEffect(() => {
    if (selectedLibraryDetailComponent === 'Members') {
      getUsersByLibraryId();
    }
  }, []);

  const renderMembers = () => {
    if (members.length) {
      const membersList = members.map((user, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              // borderBottomWidth: 0.3,
              // borderBottomColor: '#ABABAB',
            }}
            onPress={() => {
              if (!auth.data || auth.data._id !== user._id) {
                navigation.navigate('User', { userId: user._id });
              }
            }}
          >
            <UserInfo user={user} />
            {/* <View
              style={{
                backgroundColor: 'blue',
                marginRight: 20,
                padding: 5,
                borderRadius: 7,
                width: 35,
                height: 35,
                alignItems: 'center',
              }}
            >
              <FontAwesome5 name='user-astronaut' color='white' size={20} />
            </View>
            <View>
              <Text style={{ color: 'rgb(160,160,160)' }}>{user.name}</Text>
            </View> */}
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ backgroundColor: sectionBackgroundColor, padding: 5, borderRadius: 10 }}>{membersList}</View>
      );
    } else if (members.length === 0) {
      return <Text style={{ color: 'white' }}>No users now...</Text>;
    } else {
      return <Text style={{ color: 'white' }}>Now loading the data...</Text>;
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5, color: 'white' }}>Members</Text>
        <Text style={{ color: baseTextColor }}>These people are joining this library.</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {renderMembers()}
      </ScrollView>
    </View>
  );
};

export default Members;
