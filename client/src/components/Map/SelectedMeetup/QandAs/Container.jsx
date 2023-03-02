// main libraries
import React, { useState, useEffect, useRef, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import {
  baseBackgroundColor,
  inputBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  buttonBackgroundColor,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
import QandAsContext from './QandAsContext';
import CommentInputBottomSheet from './CommentInputBottomSheet';
import Comments from './Comments';

const QandAsContainer = (props) => {
  const { MaterialCommunityIcons, MaterialIcons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const [comments, setComments] = useState([]);
  const [isFetchedComments, setIsFetchedComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const commentInputRef = useRef(null);
  const commentInputBottomSheetRef = useRef(null);
  const [replyingTo, setReplyingTo] = useState(null);

  const getComments = async () => {
    const result = await lampostAPI.get(`/comments/${props.route.params.meetup._id}`);
    const { comments } = result.data;
    setComments(comments);
    setIsFetchedComments(true);
  };
  useEffect(() => {
    getComments();
  }, []);

  return (
    <QandAsContext.Provider
      value={{
        meetup: props.route.params.meetup,
        comments,
        setComments,
        isFetchedComments,
        commentInput,
        setCommentInput,
        commentInputRef,
        commentInputBottomSheetRef,
        replyingTo,
        setReplyingTo,
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: buttonBackgroundColor,
            padding: 10,
            alignSelf: 'center',
            borderRadius: 7,
          }}
          onPress={() => {
            commentInputBottomSheetRef.current.snapToIndex(0);
            commentInputRef.current.focus();
          }}
        >
          <MaterialIcons name='edit' size={25} color={'white'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Ask</Text>
        </TouchableOpacity>
        <Comments />
        <CommentInputBottomSheet />
      </View>
    </QandAsContext.Provider>
  );
};

export default QandAsContainer;
