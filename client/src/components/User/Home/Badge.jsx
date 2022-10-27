import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

const Badge = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          // flexDirection: 'row',
          // alignSelf: 'flex-start',
          alignItems: 'center',
          borderRadius: 7,
          // backgroundColor,
          borderStyle: 'solid',
          borderColor: props.badge.color,
          borderWidth: 1,
          padding: 15,
          // marginLeft: 5,
          marginRight: 10,
          marginBottom: 10,
          maxWidth: 150,
          height: 100,
          backgroundColor: props.badge.color,
          // marginTop: 5,
        }}
        // onPress={() => {
        //   // onPressBadge();
        //   removeBadge();
        // }}
      >
        <FastImage
          style={{ width: 35, height: 35, marginBottom: 5 }}
          source={{
            uri: props.badge.icon,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          tintColor={'white'}
          // resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.badge.name}</Text>

        {/* <Foundation
              name='sheriff-badge'
              size={24}
              color={'#25C213'}
              style={{ top: -10, right: -10, position: 'absolute' }}
            /> */}
        <View style={{ border: 5, top: 0, right: 0, position: 'absolute', color: '#989898' }}>
          <Text>10k</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Badge;
