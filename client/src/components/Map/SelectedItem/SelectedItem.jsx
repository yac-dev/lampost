// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

// ac

// utils
import { timeSince } from '../../../utils/timeSince';

const SelectedItem = (props) => {
  if (props.selectedItem.post) {
    return (
      <View>
        <Text>{props.selectedItem.post.genre}</Text>
        <Text>{props.selectedItem.post.content}</Text>
        <Text>{props.selectedItem.post.user.name}</Text>
        <Text>{`posted ${timeSince(new Date(props.selectedItem.post.createdAt))} ago`}</Text>
      </View>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { selectedItem: state.selectedItem };
};

export default connect(mapStateToProps)(SelectedItem);
