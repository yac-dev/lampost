import React, { useContext, useMemo } from 'react';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity, Platform, FlatList } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import { appBottomSheetBackgroundColor, baseTextColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

const InboxBottomSheet = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { auth, isIpad, unreadFriendChats, setUnreadFriendChats, setFriendChatsNotificationCount } =
    useContext(GlobalContext);
  const { inboxBottomSheetRef, navigation } = useContext(UserContext);
  const snapPoints = useMemo(() => ['60%'], []);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(118, 120, 124)' }}>{d}</Text>;
  };

  const renderUnreadMessages = () => {
    const l = Object.values(unreadFriendChats);
    if (l.length) {
      return (
        <FlatList
          data={l}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  marginBottom: 10,
                  backgroundColor: screenSectionBackgroundColor,
                  padding: 10,
                }}
                onPress={() =>
                  navigation.navigate('Chat room', {
                    fromInbox: true,
                    friendChatRoomId: item.friendChatRoomId,
                    friendId: item.friend._id,
                    chatIds: item.chats.map((chat) => chat._id),
                  })
                }
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <FastImage
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: iconColorsTable['blue1'],
                        marginRight: 20,
                        borderRadius: 5,
                      }}
                      source={{
                        uri: item.friend.photo
                          ? item.friend.photo
                          : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
                      }}
                      tintColor={item.friend.photo ? null : 'white'}
                    />
                    <Text style={{ color: 'white', fontSize: 17 }}>{item.friend.name}</Text>
                  </View>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: iconColorsTable['blue1'],
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ color: 'white' }}>{item.chats.length}</Text>
                  </View>
                </View>
                {item.chats.map((chat, index) => {
                  return (
                    <View key={index} style={{ marginBottom: 10 }}>
                      <View style={{ marginBottom: 7 }}>{renderDate(chat.createdAt)}</View>
                      <Text style={{ color: 'white' }}>{chat.content}</Text>
                    </View>
                  );
                })}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => `${item}-${index}`}
          showsVerticalScrollIndicator={false}
        />
      );
    } else {
      return (
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>
          You'll see all the unread messages from your friends.
        </Text>
      );
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={inboxBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: backgroundColorsTable['pink1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='email-multiple' color={iconColorsTable['pink1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Inbox</Text>
        </View>
        {renderUnreadMessages()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default InboxBottomSheet;
