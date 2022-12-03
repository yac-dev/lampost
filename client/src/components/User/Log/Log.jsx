import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import LogContext from './LogContext';
import FastImage from 'react-native-fast-image';
import ActionButtons from './ActionButtons';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';

const Log = (props) => {
  const { pastMeetup, index, isMyPage } = useContext(LogContext);

  // const renderAssets = () => {
  //   const assetsList = pastMeetup.assets.map((asset, index) => {
  //     return <Image key={index} style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: asset.data }} />;
  //   });

  //   return <View style={{ flexDirection: 'row', marginBottom: 15 }}>{assetsList}</View>;
  // };

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <View style={{ width: 50, height: 50, padding: 10, borderRadius: 10, borderWidth: 0.3, marginRight: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{dateTable['0']}</Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>{dateTable['1']}</Text>
        {/* <Text style={{ textAlign: 'center' }}>{dateTable['2']}</Text> */}
      </View>
    );
  };

  const renderMessages = () => {
    const messagesList = meetup.messages.map((message, index) => {
      return (
        <View>
          <Text>No messages added yet...</Text>
        </View>
      );
    });
  };

  return (
    <View key={index} style={{ borderBottomWidth: 0.3, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        {renderDate(pastMeetup.startDateAndTime)}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* <FastImage
            style={{
              height: 35,
              width: 35,
              marginRight: 5,
              backgroundColor: backgroundColorsTable[pastMeetup.badge.color],
            }}
            source={{
              uri: meetup.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[meetup.badge.color]}
          /> */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>{pastMeetup.title}</Text>
        </View>
      </View>
      <View style={{ alignSelf: 'flex-end', marginBottom: 15 }}>
        <Text>Launched by&nbsp;{pastMeetup.launcher.name}</Text>
      </View>
      {/* {renderAssets()} */}
      <View style={{ marginBottom: 15 }}>
        <Text>No messages added ...</Text>
      </View>
      {/* <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <Text>👍 21</Text>
        <Text>🤔 3</Text>
        <Text>😂 10</Text>
      </View> */}
      <ActionButtons />
    </View>
  );
};

export default Log;
