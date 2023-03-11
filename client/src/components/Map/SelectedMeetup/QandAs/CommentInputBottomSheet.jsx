import React, { useMemo, useContext, useState } from 'react';
import GlobalContext from '../../../../GlobalContext';
import QandAsContext from './QandAsContext';
import lampostAPI from '../../../../apis/lampost';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseBackgroundColor,
  inputBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  iconColorsTable,
} from '../../../../utils/colorsTable';

const CommentInputBottomSheet = (props) => {
  const inputAccessoryViewID = 'COMMENT_INPUT';
  const snapPoints = useMemo(() => ['65%'], []);
  const { auth, setLoading } = useContext(GlobalContext);
  const {
    setComments,
    meetup,
    commentInput,
    setCommentInput,
    commentInputBottomSheetRef,
    commentInputRef,
    replyingTo,
    setReplyingTo,
  } = useContext(QandAsContext);

  const sendComment = async () => {
    const payload = {
      launcherId: meetup.launcher._id === auth.data._id ? '' : meetup.launcher._id,
      meetupId: meetup._id,
      user: {
        _id: auth.data._id,
        name: auth.data.name,
        photo: auth.data.photo,
      },
      content: commentInput,
      // 基本、defaultでreplyはなしね。
      replyingTo: replyingTo
        ? {
            _id: replyingTo._id,
            content: replyingTo.content,
            user: replyingTo.user,
            createdAt: replyingTo.createdAt,
          }
        : null,
    };
    const result = await lampostAPI.post('/comments', payload);
    const { comment } = result.data;
    setComments((previous) => [...previous, comment]);
    setCommentInput('');
    Keyboard.dismiss();
    commentInputBottomSheetRef.current.close();
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={commentInputBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'extend'}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        {replyingTo ? (
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: iconColorsTable['blue1'] }}>@{replyingTo.user.name}</Text>
          </View>
        ) : null}
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <BottomSheetTextInput
            multiline={true}
            placeholder={replyingTo ? 'Write your reply to this question.' : 'What is your question?'}
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              borderRadius: 5,
              height: '100%',
              padding: 10,
              // backgroundColor: 'rgb(235, 235, 235)',
              width: '100%', // ここも、下の修正に沿って80 90%に変える。
            }}
            color={'white'}
            ref={commentInputRef}
            value={commentInput}
            onChangeText={setCommentInput}
            autoCapitalize='none'
          />
        </View>
        <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={screenSectionBackgroundColor}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View></View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  Keyboard.dismiss();
                  commentInputBottomSheetRef.current.close();
                  setCommentInput('');
                  if (replyingTo) {
                    setReplyingTo(null);
                  }
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  sendComment();
                }}
                disabled={commentInput ? false : true}
              >
                <Text style={{ color: commentInput ? 'white' : baseTextColor, fontWeight: 'bold' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CommentInputBottomSheet;
