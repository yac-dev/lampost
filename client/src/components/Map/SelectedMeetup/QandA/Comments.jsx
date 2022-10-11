import React, { useState, useEffect } from 'react';
import lampostAPI from '../../../../apis/lampost';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const Comments = (props) => {
  const replyComment = async () => {
    const result = await lampostAPI.post('/comments/reply');
    const { comment } = result.data;
  };

  const onReplyPress = (comment) => {
    props.inputRef.focus();
    props.setReply((previous) => {
      return {
        ...previous,
        pressed: true,
        comment,
      };
    });
  };

  const renderComments = () => {
    if (!props.comments.length) {
      return (
        <View style={{ marginTop: 10 }}>
          <Text>No comments added yet.</Text>
        </View>
      );
    } else {
      const commentsList = props.comments.map((comment, index) => {
        return (
          <View key={index}>
            <Text>{comment.content}</Text>
            {comment.replyTo ? <Text>{comment.replyTo.content}</Text> : null}
            <TouchableOpacity
              onPress={() => {
                onReplyPress(comment);
              }}
            >
              <Text>Reply</Text>
            </TouchableOpacity>
          </View>
        );
      });

      return <View style={{ marginTop: 10 }}>{commentsList}</View>;
    }
  };

  return <>{renderComments()}</>;
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect()(Comments);
