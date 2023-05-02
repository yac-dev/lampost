import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { baseBackgroundColor, baseTextColor, inputBackgroundColorNew } from '../../utils/colorsTable';
import lampostAPI from '../../apis/lampost';
import { iconsTable } from '../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [notifications, setNotifications] = useState([]);
  const [isFetchedNotifications, setIsFetchedNotifications] = useState(false);

  const getNotifications = async () => {
    const result = await lampostAPI.get(`/notifications/${auth.data._id}`);
    const { notifications } = result.data;
    setNotifications(notifications);
    setIsFetchedNotifications(true);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const Notification = useCallback((notification) => {
    return (
      <TouchableOpacity style={{}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}></View>
          <View>
            <Text>read state</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View></View>
          <Text>message here....</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderNotifications = () => {
    if (notifications.length) {
      return (
        <FlatList
          data={notifications}
          renderItem={({ item }) => Notification(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    } else {
      return (
        <View style={{ marginTop: 80, alignSelf: 'center' }}>
          <View
            style={{
              borderRadius: 10,
              width: 80,
              height: 80,
              marginTop: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: inputBackgroundColorNew,
              alignSelf: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name='mailbox' size={50} color={baseTextColor} style={{}} />
          </View>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
            You'll see all the notifications you've received here.
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      {isFetchedNotifications ? renderNotifications() : <ActivityIndicator />}
    </View>
  );
};

export default Container;
