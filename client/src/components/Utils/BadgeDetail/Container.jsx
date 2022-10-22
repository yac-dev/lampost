import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Container = (props) => {
  // action button.選択したものの中にこれがなかったら、add buttonを、あったらremove buttonをrenderする。
  return (
    <View>
      <Text>{props.badge.label}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps)(Container);
