import React from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

// ac
import { selectBadge } from '../../../redux/actionCreators/selectItem';
import { removeBadge } from '../../../redux/actionCreators/selectItem';
import { setIsTappedBadgeBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  // action button.選択したものの中にこれがなかったら、add buttonを、あったらremove buttonをrenderする。
  // headerとaction button, time lineっていう順番で変わっていくことになるだろう。

  const removeMeetupRequiredBadges = () => {};

  const renderActionButton = () => {
    if (props.fromComponent === 'Select meetup badge') {
      if (props.badge && props.badge._id === props.bottomSheet.badgeDetail.data._id) {
        return (
          <TouchableOpacity onPress={() => props.setBadge(props.bottomSheet.badgeDetail.data)}>
            <Text>Remove</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={() => props.setBadge(props.bottomSheet.badgeDetail.data)}>
            <Text>Add</Text>
          </TouchableOpacity>
        );
      }
    } else if (props.fromComponent === 'Add meetup required badges') {
      // requiredBadges {}
      if (props.requiredBadges[props.bottomSheet.badgeDetail.data._id]) {
        return (
          // deleteする。
          <TouchableOpacity
            onPress={() =>
              props.setRequiredBadges((previous) => {
                const copy = { ...previous };
                delete copy[props.bottomSheet.badgeDetail.data._id];
                return copy;
              })
            }
          >
            <Text>Remove</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() =>
              props.setRequiredBadges((previous) => {
                return {
                  ...previous,
                  [props.bottomSheet.badgeDetail.data._id]: props.bottomSheet.badgeDetail.data,
                };
              })
            }
          >
            <Text>Add</Text>
          </TouchableOpacity>
        );
      }
    }
    // props.setBadge(props.bottomSheet.badgeDetail.data)
    // fromComponent={props.fromComponent}
  };
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
      {/* {props.selectedItem.badges[props.bottomSheet.badgeDetail.data._id] ? (
        <TouchableOpacity onPress={() => props.removeBadge(props.bottomSheet.badgeDetail.data)}>
          <Text>Remove</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => props.selectBadge(props.bottomSheet.badgeDetail.data)}>
          <Text>Add</Text>
        </TouchableOpacity>
      )} */}
      {renderActionButton()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, selectedItem: state.selectedItem };
};

export default connect(mapStateToProps, { selectBadge, removeBadge })(Container);
