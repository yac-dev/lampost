import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Roll from './Roll';
import BadgeFolders from './BadgeFolders/Container';
import BadgeFolderBottomSheet from './Rolls/RollsBottomSheet';

const Container = (props) => {
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [rolls, setRolls] = useState([]);

  useEffect(() => {
    // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => onPressNotification()}>
          <MaterialCommunityIcons name='mailbox' size={30} color={'blue'} />
        </TouchableOpacity>
        // ここ、iconの色を後で直す。上のbarの色自体後で直すからね。
      ),
    });
  }, []);

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
      <BadgeFolderBottomSheet
        rollsBottomSheetRef={rollsBottomSheetRef}
        selected={selected}
        rolls={rolls}
        navigation={props.navigation}
      />
    </View>
  );
};

export default Container;
