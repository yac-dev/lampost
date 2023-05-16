import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../../../GlobalContext';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../../../apis/lampost';
import { baseBackgroundColor, iconColorsTable, baseTextColor } from '../../../../../utils/colorsTable';
import BadgeLabel from '../../../../Utils/BadgeLabel';

const TaggedPeople = (props) => {
  const { auth } = useContext(GlobalContext);
  const [users, setUsers] = useState([]);
  const [isFetchedUsers, setIsFetchedUsers] = useState(false);

  const getTaggedPeople = async () => {
    const result = await lampostAPI.post('/assets/taggedpeople', { taggedPeople: props.route.params.taggedPeople });
    const { users } = result.data;
    setUsers(users);
    setIsFetchedUsers(true);
  };

  useEffect(() => {
    getTaggedPeople();
  }, []);

  const renderTopBadges = (user) => {
    const list = user.topBadges.map((userBadge, index) => {
      return <BadgeLabel key={index} badge={userBadge.badge} />;
    });

    return (
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  const renderUser = (user) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        {user ? ( // null 対策
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
            ) : (
              <Text style={{ color: 'white', fontSize: 20 }}>This user doesn't exist</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderUsers = () => {
    if (!users.length) {
      return <Text style={{ color: baseTextColor }}>You'll see all those who joined this meetup.</Text>;
    } else {
      return (
        <FlatList
          data={users}
          renderItem={({ item }) => renderUser(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        {!isFetchedUsers ? <ActivityIndicator textContent={'🧒👨🏽‍🦳👨🏾‍🦱🙋'} /> : renderUsers()}
      </View>
    </SafeAreaView>
  );
};

export default TaggedPeople;
