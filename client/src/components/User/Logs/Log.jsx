import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LogContext from './LogContext';
import FastImage from 'react-native-fast-image';
import ActionButtons from './ActionButtons';
import { FontAwesome } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable, baseTextColor } from '../../../utils/colorsTable';
import ActionButton from '../../Utils/ActionButtonNew';
import BadgeLabel from '../../Utils/BadgeLabel';

const Log = (props) => {
  const { pastMeetup, index, isMyPage } = useContext(LogContext);

  const renderAssets = () => {
    const assetsList = pastMeetup.assets.map((asset, index) => {
      return <Image key={index} style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: asset.data }} />;
    });

    return <View style={{ flexDirection: 'row', marginBottom: 15 }}>{assetsList}</View>;
  };

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: baseTextColor,
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
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

  const renderBadges = () => {
    const badgesList = pastMeetup.badges.map((badge, index) => {
      return (
        <BadgeLabel
          key={index}
          badgeLableBackgroundColor={backgroundColorsTable[badge.color]}
          badgeIcon={badge.icon}
          badgeIconColor={iconColorsTable[badge.color]}
          labelTextColor={iconColorsTable[badge.color]}
          labelText={badge.name}
        />
      );
    });

    return <View>{badgesList}</View>;
  };

  return (
    <View style={{ borderBottomWidth: 0.3, padding: 20, borderBottomColor: baseTextColor }}>
      <View style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          {renderDate(pastMeetup.startDateAndTime)}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white' }}>
              {pastMeetup.title}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>{renderBadges()}</View>
        <View style={{ alignSelf: 'flex-end' }}>
          <Text style={{ color: baseTextColor }}>Launched by&nbsp;{pastMeetup.launcher.name}</Text>
        </View>
        {renderAssets()}
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>No messages added ...</Text>
        <View style={{ alignSelf: 'flex-end' }}>
          <ActionButton
            label='What are your thoughts?'
            backgroundColor={iconColorsTable['blue1']}
            icon={<FontAwesome name='comment' size={20} color={'white'} />}
            onActionButtonPress={() => console.log('comment here!')}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <Text style={{ color: baseTextColor, marginRight: 10 }}>👍 21</Text>
        <Text style={{ color: baseTextColor, marginRight: 10 }}>🤔 3</Text>
        <Text style={{ color: baseTextColor }}>😂 10</Text>
      </View>
    </View>
  );
};

export default Log;
