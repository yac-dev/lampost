import React, { useEffect, useContext } from 'react';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import MapContext from '../../MeetupContext';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
// import SelectedBadges from '../CreateMeetupPeople/SelectedBadges/Badges';

const Badge = (props) => {
  const { navigation, formData, setFormData, route } = useContext(LaunchMeetupContext);
  const { launchMeetupBottomSheetRef } = useContext(MapContext);

  useEffect(() => {
    if (route.params?.addedMeetupBadges) {
      setFormData((previous) => {
        return {
          ...previous,
          badges: route.params.addedMeetupBadges,
        };
      });
    }
  }, [route.params?.addedMeetupBadges]);

  const renderItem = (badge) => {
    return (
      <View
        style={{
          width: 90, // さらにbadgeを覆う必要がある。textも含めた守備範囲が必要だ。
          height: 110,
          // backgroundColor: 'red',
          alignItems: 'center',
          // justifyContent: 'center', // これで、verticallyにもcenterにする。
        }}
      >
        <View
          style={{
            backgroundColor: rnDefaultBackgroundColor,
            width: 65,
            height: 65,
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center', // これと
              justifyContent: 'center', // これで中のimageを上下左右真ん中にする
              borderRadius: 10,
              backgroundColor: backgroundColorsTable[badge.color],
              borderColor: backgroundColorsTable[badge.color],
              borderWidth: 0.3,
            }}
          >
            <FastImage
              style={{ width: 45, height: 45 }}
              source={{
                uri: badge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            // alignSelf: 'center',
            fontSize: 12,
            textAlign: 'center',
            color: baseTextColor,
          }}
        >
          {badge.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
        Add up to 5 badges so attendees know what your meetup is about. The first one will be appear on the map.
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
          navigation.navigate('Add badges', {
            fromComponent: 'ADD_MEETUP_BADGES',
            addedMeetupBadges: formData.badges,
          });
        }}
      >
        <SimpleLineIcons name='magnifier-add' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
        <Text style={{ color: baseTextColor }}>Add</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          horizontal={true}
          data={Object.values(formData.badges)}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      </View>
      {/* <ScrollView horizontal={true}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {selectedBadgesList}
        </View>
      </ScrollView> */}
      {/* <SelectedBadges badges={Object.values(props.state.badges)} /> */}
    </View>
  );
};

export default Badge;
