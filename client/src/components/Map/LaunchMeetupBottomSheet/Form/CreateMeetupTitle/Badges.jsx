import React, { useEffect, useContext } from 'react';
import MapContext from '../../../MeetupContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable, baseTextColor } from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import SelectedBadges from '../CreateMeetupPeople/SelectedBadges/Badges';

const Badge = (props) => {
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  // このcomponentからadd badgeのmodalへscreen移動する。
  // そんで、add badgeのmodalからnavigateでここに戻ってくる時に、paramsがadd badgesのmodalで選んだbadgeがparamsとして渡される。それを、formのstateにそのまま設定しましょう、っていう流れ。
  // useEffect(() => {
  //   if (props.route.params?.badge) {
  //     props.dispatch({ type: 'SET_MEETUP_BADGE', payload: props.route.params.badge });
  //   }
  // }, [props.route.params?.badge]);

  useEffect(() => {
    if (props.route.params?.addedMeetupBadges) {
      console.log('this is the badges...', props.route.params.addedMeetupBadges);
      props.dispatch({ type: 'SET_MEETUP_BADGES', payload: props.route.params.addedMeetupBadges });
    }
  }, [props.route.params?.addedMeetupBadges]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
        Please add some badges (up to 5) so attendees know what your meetup is about.
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          alignSelf: 'flex-end',
        }}
        onPress={() => {
          launchMeetupBottomSheetRef.current.snapToIndex(0);
          props.navigation.navigate('Add badges', {
            fromComponent: 'ADD_MEETUP_BADGES',
            addedMeetupBadges: props.state.badges,
          });
        }}
      >
        <SimpleLineIcons name='magnifier-add' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
        <Text style={{ color: baseTextColor }}>Add</Text>
      </TouchableOpacity>
      <SelectedBadges badges={Object.values(props.state.badges)} />
      {/* {props.state.badge ? (
        <View
          style={{
            width: 80,
            // height: 0,
            aspectRatio: 1,
            padding: 10,
            // backgroundColor: 'red',
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center', // これと
              justifyContent: 'center', // これで中のimageを上下左右真ん中にする
              borderRadius: 10,
              backgroundColor: backgroundColorsTable[props.state.badge.color],
              borderStyle: 'solid',
              borderColor: backgroundColorsTable[props.state.badge.color],
              borderWidth: 1,
              // backgroundColor: 'red',
              marginBottom: 5,
            }}
          >
            <FastImage
              style={{ width: 50, height: 50 }}
              source={{
                uri: props.state.badge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[props.state.badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 10, textAlign: 'center' }}>
            {props.state.badge.name}
          </Text>
        </View>
      ) : (
        <Text style={{ color: baseTextColor }}>No badge selected yet</Text>
      )} */}
    </View>
  );
};

export default Badge;
