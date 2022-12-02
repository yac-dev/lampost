import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import BadgeStatus from './BadgeStatus';

const Container = (props) => {
  const renderBadgeStatuses = () => {
    const badgeStatusesList = props.badgeStatuses.map((badgeStatus, index) => {
      return <BadgeStatus user={props.user} key={index} badgeStatus={badgeStatus} onBadgePress={props.onBadgePress} />;
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgeStatusesList}</View>
      </ScrollView>
    );
  };

  if (props.badgeStatuses.length) {
    return <View>{renderBadgeStatuses()}</View>;
  } else {
    return <Text>Now loadinggggg...</Text>;
  }
};

export default Container;
