import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';
import BadgeLabel from '../../Utils/BadgeLabel';
import FastImage from 'react-native-fast-image';

const Members = (props) => {
  const { auth } = useContext(GlobalContext);
  const [members, setMembers] = useState([]);
  const [isFetchedMembers, setIsFetchedMembers] = useState(false);
  // const { navigation } = useContext(LibraryContext);

  const getMembersByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/users/${props.route.params.libraryId}`);
    const { users } = result.data;
    setMembers(users);
    setIsFetchedMembers(true);
  };

  useEffect(() => {
    getMembersByLibraryId();
  }, []);

  const renderTopBadges = (user) => {
    const list = user.topBadges.map((userBadge, index) => {
      if (userBadge.badge) {
        return <BadgeLabel key={index} badge={userBadge.badge} />;
      } else {
        return null;
      }
    });

    return (
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  const renderUser = (user) => {
    if (user) {
      return (
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <TouchableOpacity
            style={{ flex: 0.15 }}
            onPress={() => {
              if (auth.data._id !== user._id) {
                props.navigation.navigate('Home library member', { userId: user._id });
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
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (auth.data._id !== user._id) {
                      props.navigation.navigate('Home library member', { userId: user._id });
                    } else {
                      return null;
                    }
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17, marginBottom: 10 }}>
                    {user.name}
                  </Text>
                </TouchableOpacity>
                {renderTopBadges(user)}
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
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
    <SafeAreaView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        {!isFetchedMembers ? <ActivityIndicator textContent={'🧒👨🏽‍🦳👨🏾‍🦱🙋'} /> : renderMembers()}
      </View>
    </SafeAreaView>
  );
};

export default Members;
