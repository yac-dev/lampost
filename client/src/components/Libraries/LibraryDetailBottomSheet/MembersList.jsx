import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../../../GlobalContext';
import DiscoverNavigatorContext from '../../Navigator/Discover/DiscoverNavigatorContext';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import {
  sectionBackgroundColor,
  baseTextColor,
  baseBackgroundColor,
  iconColorsTable,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const MembersList = (props) => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const [isFetchedMembers, setIsFetchedMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const { topLevelNavigation } = useContext(DiscoverNavigatorContext);

  const getUsersByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/users/${props.route.params.libraryId}`);
    const { users } = result.data;
    setMembers(users);
    setIsFetchedMembers(true);
  };
  useEffect(() => {
    getUsersByLibraryId();
  }, []);

  const renderUser = (user) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        {user ? ( // null 対策
          <TouchableOpacity
            style={{ flex: 0.15 }}
            onPress={() => {
              if (!auth.isAuthenticated || auth.data._id !== user._id) {
                topLevelNavigation.navigate('Library member', { userId: user._id });
              } else {
                return null;
              }
            }}
          >
            <FastImage
              source={{
                uri: user.photo ? user.photo : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
                // marginRight: 10,
                backgroundColor: iconColorsTable['blue1'],
              }}
              tintColor={user.photo ? null : 'white'}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 0.15,
              borderRadius: 5,
              backgroundColor: iconColorsTable['blue1'],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons name='ghost' size={20} color='white' />
          </View>
        )}

        <View
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: baseTextColor,
            flex: 0.85,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              // alignItems: 'center',
              marginBottom: 10,
              width: '100%',
            }}
          >
            {user ? (
              <View>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17, marginBottom: 10 }}>{user.name}</Text>
              </View>
            ) : (
              <Text style={{ color: 'white', fontSize: 20 }}>This user doesn't exist</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderMembers = () => {
    if (!members.length) {
      return <Text style={{ color: baseTextColor }}>You'll see all those who joined this meetup.</Text>;
    } else {
      return (
        <FlatList
          data={members}
          renderItem={({ item }) => renderUser(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      {!isFetchedMembers ? <ActivityIndicator /> : renderMembers()}
    </View>
  );
};

export default MembersList;
