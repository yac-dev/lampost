import React from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';
import { removeBadge } from '../../../redux/actionCreators/selectItem';

const Container = (props) => {
  // action button.選択したものの中にこれがなかったら、add buttonを、あったらremove buttonをrenderする。
  // headerとaction button, time lineっていう順番で変わっていくことになるだろう。
  return (
    <View>
      <Text>{props.bottomSheet.badgeDetail.data.name}</Text>
      <FastImage
        style={{ width: props.bottomSheet.badgeDetail.data.landscape ? 105 : 80, height: 80, marginBottom: 5 }}
        source={{
          uri: props.bottomSheet.badgeDetail.data.icon,
          // headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        tintColor={'red'}
        // resizeMode={FastImage.resizeMode.contain}
      />
      {props.selectedItem.badges[props.bottomSheet.badgeDetail.data._id] ? (
        <TouchableOpacity onPress={() => props.removeBadge(props.bottomSheet.badgeDetail.data)}>
          <Text>Remove</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => props.selectBadge(props.bottomSheet.badgeDetail.data)}>
          <Text>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, selectedItem: state.selectedItem };
};

export default connect(mapStateToProps, { selectBadge, removeBadge })(Container);
