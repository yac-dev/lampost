import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import GlobalContext from '../../GlobalContext';
import InboxContext from './InboxContext';
import lampostAPI from '../../apis/lampost';
import FastImage from 'react-native-fast-image';
import {
  appBottomSheetBackgroundColor,
  backgroundColorsTable,
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  inputBackgroundColorNew,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
import LibraryDetailBottomSheet from './LibraryDetailBottomSheet/Container';
const { MaterialCommunityIcons, Ionicons } = iconsTable;

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [notifications, setNotifications] = useState([]);
  const [isFetchedNotifications, setIsFetchedNotifications] = useState(false);
  const libraryDetailBottomSheetRef = useRef(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  // console.log(selectedLibrary);

  const getNotifications = async () => {
    const result = await lampostAPI.get(`/notifications/${auth.data._id}`);
    const { notifications } = result.data;
    setNotifications(notifications);
    setIsFetchedNotifications(true);
  };

  const readNotification = async (notification) => {
    const result = await lampostAPI.post(`/notifications/read/${notification._id}`);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      getNotifications();
    }
  }, [auth.isAuthenticated]);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
    const dateElements = d.split('/');

    return (
      <Text style={{ color: baseTextColor }}>
        {dateElements[2]}&nbsp;&nbsp;{dateElements[0]}&nbsp;&nbsp;{dateElements[1]}
      </Text>
    );
  };

  const getSelectedLibrary = async (libraryId) => {
    const result = await lampostAPI.get(`/libraries/${libraryId}`);
    const { library } = result.data;
    setSelectedLibrary(library);
  };

  const Notification = useCallback((notification) => {
    return (
      <TouchableOpacity
        style={{ width: '100%', padding: 5, marginBottom: 15 }}
        onPress={() => {
          libraryDetailBottomSheetRef.current.snapToIndex(0);
          getSelectedLibrary(notification.library);
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 10 }}>
          <View
            style={{
              width: 45,
              height: 45,
              backgroundColor: backgroundColorsTable['brown1'],
              borderRadius: 7,
              marginRight: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name='library' size={30} color={iconColorsTable['brown1']} />
            {notification.isRead ? null : (
              <View
                style={{
                  position: 'absolute',
                  right: -3,
                  top: -3,
                  backgroundColor: 'red',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                }}
              ></View>
            )}
          </View>
          <View style={{ width: '100%', flex: 1 }}>
            <Text style={{ color: baseTextColor, marginBottom: 10, fontSize: 17 }}>{notification.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                backgroundColor: appBottomSheetBackgroundColor,
                borderRadius: 5,
                flexWrap: 'wrap',
              }}
            >
              <FastImage
                source={{
                  uri: notification.from.photo
                    ? notification.from.photo
                    : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                }}
                tintColor={notification.from.photo ? null : 'white'}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  backgroundColor: iconColorsTable['blue1'],
                  marginRight: 10,
                }}
              />

              <Text style={{ color: 'white', flex: 1, fontSize: 13 }}>{notification.message}</Text>
            </View>
          </View>
        </View>
        <Text style={{ color: baseTextColor, alignSelf: 'flex-end' }}>{renderDate(notification.createdAt)}</Text>
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

  if (auth.isAuthenticated) {
    return (
      <InboxContext.Provider
        value={{ libraryDetailBottomSheetRef, selectedLibrary, setSelectedLibrary, navigation: props.navigation }}
      >
        <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
          {isFetchedNotifications ? renderNotifications() : <ActivityIndicator />}
          <LibraryDetailBottomSheet />
        </View>
      </InboxContext.Provider>
    );
  } else {
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginTop: 80, textAlign: 'center' }}>
          Please login or signup to experience complete functions
        </Text>
      </View>
    );
  }
};

export default Container;
