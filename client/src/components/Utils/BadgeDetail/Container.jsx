import React from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';
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
    } else if (props.fromComponent === 'Add meetup badges') {
      // requiredBadges {}
      if (props.meetupBadges[props.bottomSheet.badgeDetail.data._id]) {
        return (
          // deleteする。
          <Button
            icon='minus'
            mode='contained'
            buttonColor={iconColorsTable['red1']}
            onPress={() =>
              props.setMeetupBadges((previous) => {
                const copy = { ...previous };
                delete copy[props.bottomSheet.badgeDetail.data._id];
                return copy;
              })
            }
          >
            Remove
          </Button>
        );
      } else {
        return (
          <Button
            icon='plus'
            mode='contained'
            buttonColor={iconColorsTable['lightGreen1']}
            onPress={() =>
              props.setMeetupBadges((previous) => {
                return {
                  ...previous,
                  [props.bottomSheet.badgeDetail.data._id]: props.bottomSheet.badgeDetail.data,
                };
              })
            }
          >
            Add
          </Button>
        );
      }
    }
    // props.setBadge(props.bottomSheet.badgeDetail.data)
    // fromComponent={props.fromComponent}
  };
  return (
    // <View>
    //   <Text>{props.bottomSheet.badgeDetail.data.name}</Text>
    //   <FastImage
    //     style={{ width: 80, height: 80, marginBottom: 5 }}
    //     source={{
    //       uri: props.bottomSheet.badgeDetail.data.icon,
    //       // headers: { Authorization: 'someAuthToken' },
    //       priority: FastImage.priority.normal,
    //     }}
    //     tintColor={iconColorsTable[props.bottomSheet.badgeDetail.data.color]}
    //     resizeMode={FastImage.resizeMode.contain}
    //   />
    //   {renderActionButton()}
    // </View>
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          width: 100,
          aspectRatio: 1,
          // padding: 10, // これは単純に、25%幅に対して
          // marginBottom: 23,
          // backgroundColor: 'red',
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
            borderRadius: 10,
            backgroundColor: backgroundColorsTable[props.bottomSheet.badgeDetail.data.color],
            borderStyle: 'solid',
            borderColor: backgroundColorsTable[props.bottomSheet.badgeDetail.data.color],
            borderWidth: 1,
            marginBottom: 5,
          }}
        >
          <FastImage
            style={{ width: 80, height: 80 }}
            source={{
              uri: props.bottomSheet.badgeDetail.data.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[props.bottomSheet.badgeDetail.data.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 10, textAlign: 'center' }}>
          {props.bottomSheet.badgeDetail.data.name}
        </Text>
      </View>
      {renderActionButton()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet, selectedItem: state.selectedItem };
};

export default connect(mapStateToProps, { selectBadge, removeBadge })(Container);
