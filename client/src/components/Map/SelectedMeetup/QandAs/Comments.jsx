import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import QandAsContext from './QandAsContext';
import lampostAPI from '../../../../apis/lampost';
import { iconColorsTable, baseTextColor, screenSectionBackgroundColor } from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const Comments = (props) => {
  const { MaterialCommunityIcons, FontAwesome5, MaterialIcons } = iconsTable;
  const { comments, setComments, isFetchedComments, commentInputBottomSheetRef, setReplyingTo, commentInputRef } =
    useContext(QandAsContext);

  const renderChatSenderName = (chat) => {
    if (chat.user) {
      return chat.user.name;
    } else {
      return "This user doesn't exist.";
    }
  };

  // 'rgb(118, 120, 124)'
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor }}>{d}</Text>;
  };

  const renderUserAvatar = (comment) => {
    if (comment.user) {
      if (comment.user.photo) {
        return (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              marginRight: 20,
            }}
          >
            <Image source={{ uri: comment.user.photo }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          </View>
        );
      } else {
        return (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              marginRight: 20,
              backgroundColor: iconColorsTable['blue1'],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesome5 name='user-astronaut' size={20} color='white' />
          </View>
        );
      }
    } else {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            marginRight: 20,
            backgroundColor: iconColorsTable['blue1'],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialCommunityIcons name='ghost' size={20} color='white' />
        </View>
      );
    }
  };

  const renderItem = (comment) => {
    return (
      <TouchableOpacity style={{ padding: 10 }} onLongPress={() => console.log('hello')}>
        <View style={{ flexDirection: 'row' }}>
          {renderUserAvatar(comment)}
          <View style={{ flexDirection: 'column', flexShrink: 1 }}>
            <View style={{ flexDirection: 'row', marginBottom: 5, flexShrink: 1 }}>
              <Text
                style={{
                  color: 'white',
                  marginRight: 10,
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}
              >
                {renderChatSenderName(comment)}
              </Text>
              {renderDate(comment.createdAt)}
            </View>
            <Text style={{ fontSize: 15, marginBottom: 10, color: baseTextColor }}>{comment.content}</Text>
            {comment.replyTo ? (
              <View
                style={{
                  marginBottom: 10,
                  borderTopWidth: 0.3,
                  paddingTop: 10,
                  borderTopColor: 'white',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name='reply' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                      <Text style={{ color: iconColorsTable['blue1'], marginRight: 5 }}>
                        @{comment.replyTo.user.name}
                      </Text>
                      {renderDate(comment.replyTo.createdAt)}
                    </View>
                    <Text style={{ color: baseTextColor, fontStyle: 'italic' }}>{comment.replyTo.content}</Text>
                  </View>
                </View>
              </View>
            ) : null}
            {comment.user ? (
              // userがdeleteされているものに対しては、できないようにする。めんどいから。
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: screenSectionBackgroundColor,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 7,
                    paddingRight: 7,
                    borderRadius: 7,
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setReplyingTo(comment);
                    commentInputBottomSheetRef.current.snapToIndex(0);
                    commentInputRef.current.focus();
                  }}
                >
                  <MaterialCommunityIcons name='reply' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
                  <Text style={{ color: baseTextColor }}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: screenSectionBackgroundColor,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 7,
                    paddingRight: 7,
                    borderRadius: 7,
                  }}
                  onPress={() => {
                    // navigation.navigate('Report meetup member', {
                    //   userId: chat.user._id,
                    //   userName: chat.user.name,
                    //   meetupId: meetup._id,
                    // });
                  }}
                >
                  <MaterialIcons name='report-problem' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
                  <Text style={{ color: baseTextColor }}>Report</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderComments = () => {
    if (!comments.length) {
      return <Text style={{ color: 'white', textAlign: 'center' }}>You'll see all the Q&As here.</Text>;
    } else {
      return (
        <FlatList
          data={comments}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    }
  };

  return <View>{!isFetchedComments ? <ActivityIndicator /> : renderComments()}</View>;
};

export default Comments;
