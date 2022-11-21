import React, { useRef, useState, useEffect } from 'react';
import RollsContext from './RollsContext';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// import Roll from './Roll';
// import BadgeFolders from './BadgeFolders/Container';
// import BadgeFolderBottomSheet from './Rolls/RollsBottomSheet';
import Rolls from './Rolls/Container';
import AppMenuBottomSheet from './AppMenuBottomSheet';
import CreateRoll from './CreateRoll/Container';

const Container = (props) => {
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [rolls, setRolls] = useState([]);

  const appMenuBottomSheetRef = useRef(null);
  const createRollBottomSheetRef = useRef(null);

  const handleCreateRollBottomSheet = () => {
    appMenuBottomSheetRef.current.snapToIndex(0);
    createRollBottomSheetRef.current.snapToIndex(0);
  };

  // const closeCreateRollBottomSheet = () => {
  //   createRollBottomSheetRef.current.close();
  // };

  // const onCloseCreateRollBottomSheet = () => {
  //   appMenuBottomSheetRef.current.snapToIndex(0);
  // };

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

  // useEffect(() => {
  //   if (selected) {
  //     getRollsOfSelectedBadge();
  //   }
  // }, [selected]);

  return (
    <RollsContext.Provider
      value={{
        appMenuBottomSheetRef,
        createRollBottomSheetRef,
        handleCreateRollBottomSheet,
        // closeCreateRollBottomSheet,
        rolls,
        setRolls,
      }}
    >
      <View style={{ flex: 1 }}>
        <Rolls />
        <AppMenuBottomSheet />
        <CreateRoll />
      </View>
    </RollsContext.Provider>
  );
};

export default Container;
