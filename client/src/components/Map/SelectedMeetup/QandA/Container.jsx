// main libraries
import React, { useState, useEffect, useRef } from 'react';
import lampostAPI from '../../../../apis/lampost';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// components
import CommentInput from './CommentInput';
import Comments from './Comments';

const Container = (props) => {
  const [comments, setComments] = useState(props.selectedMeetup.comments);
  const inputRef = useRef(null);
  const [reply, setReply] = useState({ pressed: false, comment: null });

  return (
    <View>
      <CommentInput comments={comments} setComments={setComments} inputRef={inputRef} reply={reply} />
      <Comments comments={comments} setComments={setComments} inputRef={inputRef} setReply={setReply} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps)(Container);
