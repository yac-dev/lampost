// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
  Button,
} from 'react-native';
import { BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const QandA = (props) => {
  // ここで、commentsを全てrenderする。replyも含めてね。
  const inputAccessoryViewID = 'uniqueID';
  const [comments, setComments] = useState(props.selectedMeetup.comments);

  // なんで、これでcpuのusageが爆発する？？？
  // useEffect(() => {
  //   setComments((previous) => [...previous, ...props.selectedMeetup.comments]);
  // });

  const renderComments = () => {
    if (!comments.length) {
      return (
        <View>
          <Text>No comments added yet.</Text>
        </View>
      );
    } else {
      const commentsList = comments.map((comment, index) => {
        return (
          <View key={index}>
            <Text>{comment.content}</Text>
          </View>
        );
      });

      return <View>{commentsList}</View>;
    }
  };

  return (
    <View>
      <TouchableOpacity>
        <Text>Add comment</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <BottomSheetTextInput placeholder='add commenty' inputAccessoryViewID={inputAccessoryViewID} />
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text>完了</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </View>
      </TouchableWithoutFeedback>
      {renderComments()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(QandA);
