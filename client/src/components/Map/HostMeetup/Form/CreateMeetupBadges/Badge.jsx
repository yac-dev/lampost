import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable } from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const Badge = (props) => {
  // 要は、add badgeのfull screen modalからここに帰ってきた時にpropsでadd badgeのselected されたbadgeを渡すわけよ。これがあるなら
  // ここでstateを持つ必要はないわけ。state.badgeを渡せばいいわけ。
  useEffect(() => {
    if (props.route.params?.badge) {
      console.log('this is the badge...', props.route.params.badge);
      props.dispatch({ type: 'SET_MEETUP_BADGE', payload: props.route.params.badge });
    }
  }, [props.route.params?.badge]);

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['green1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Foundation name='sheriff-badge' size={25} color='white' />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 5 }}>Badge</Text>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}
                onPress={() =>
                  props.navigation.navigate('Add badges', {
                    fromComponent: 'Select meetup badge',
                    selectedBadge: props.state.badge,
                  })
                }
              >
                <SimpleLineIcons name='magnifier-add' size={20} color={'black'} style={{ marginRight: 5 }} />
                <Text>Select</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
              Please describe your meetup in one badge. It'll be displayed on the map.
            </Text>
          </View>
        </View>
      </View>

      {props.state.badge ? (
        <View
          style={{
            width: '20%',
            // height: 0,
            aspectRatio: 1,
            padding: 10,
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
          {/* <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: 10, textAlign: 'center' }}>
            {props.state.badge.name}
          </Text> */}
        </View>
      ) : (
        // <FastImage
        //   style={{ width: 50, height: 50 }}
        //   source={{
        //     uri: props.state.badge.icon,
        //     priority: FastImage.priority.normal,
        //   }}
        //   tintColor={iconColorsTable[props.state.badge.color]}
        //   resizeMode={FastImage.resizeMode.contain}
        // />
        <Text>No badge selected yet</Text>
      )}
    </View>
  );
};

export default Badge;
