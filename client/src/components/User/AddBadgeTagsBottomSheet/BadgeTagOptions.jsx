import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import AddBadgeTagsContext from './AddBadgeTagsContext';
import lampostAPI from '../../../apis/lampost';

const BadgeTagOptions = () => {
  const { badgeTagOptions, setBadgeTagOptions } = useContext(AddBadgeTagsContext);

  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};

export default BadgeTagOptions;
