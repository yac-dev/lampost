import React, { useRef, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import lampostAPI from '../../apis/lampost';

import Roll from './Roll';
import BadgeFolders from './BadgeFolders/Container';
import BadgeFolderBottomSheet from './Rolls/RollsBottomSheet';

const Container = () => {
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [rolls, setRolls] = useState([]);

  const onSelectBadgeFolder = (badge) => {
    setSelected(badge);
    rollsBottomSheetRef.current?.snapToIndex(0);
  };

  const getRollsOfSelectedBadge = async () => {
    const result = await lampostAPI.get(`/badges/${selected._id}/rolls`);
    const { badgeRolls } = result.data;
    setRolls(badgeRolls);
  };

  useEffect(() => {
    if (selected) {
      getRollsOfSelectedBadge();
    }
  }, [selected]);

  return (
    <View>
      {/* <Roll /> */}
      {/* <Text>Rolls here</Text> */}
      <BadgeFolders onSelectBadgeFolder={onSelectBadgeFolder} />
      <BadgeFolderBottomSheet rollsBottomSheetRef={rollsBottomSheetRef} selected={selected} rolls={rolls} />
    </View>
  );
};

export default Container;
