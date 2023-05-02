import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { baseBackgroundColor, baseTextColor } from '../../utils/colorsTable';
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
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View></View>
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
          <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name='mailbox' size={40} color={baseTextColor} style={{ marginBottom: 10 }} />
          </View>
          <Text style={{ color: 'white', textAlign: 'center' }}>You'll see all the notifications to you.</Text>
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
