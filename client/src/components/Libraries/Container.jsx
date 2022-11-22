import React, { useRef, useState, useEffect } from 'react';
import RollsContext from './RollsContext';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// import Roll from './Roll';
// import BadgeFolders from './BadgeFolders/Container';
// import BadgeFolderBottomSheet from './Rolls/RollsBottomSheet';
import LibrariesList from './LibrariesList/Container';
import AppMenuBottomSheet from './AppMenuBottomSheet';
import CreateLibrary from './CreateLibrary/Container';

const Container = (props) => {
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [libraries, setLibraries] = useState([]);

  const appMenuBottomSheetRef = useRef(null);
  const createLibraryBottomSheetRef = useRef(null);

  const handleCreateLibraryBottomSheet = () => {
    appMenuBottomSheetRef.current.snapToIndex(0);
    createLibraryBottomSheetRef.current.snapToIndex(0);
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

  // const getRolls = async () => {
  //   const result = await lampostAPI.get('rolls');
  //   const { rolls } = result.data;
  //   setRolls(rolls);
  // };
  // useEffect(() => {
  //   getRolls();
  // }, []);

  return (
    <RollsContext.Provider
      value={{
        appMenuBottomSheetRef,
        createLibraryBottomSheetRef,
        handleCreateLibraryBottomSheet,
        libraries,
        setLibraries,
        navigation: props.navigation,
      }}
    >
      <View style={{ flex: 1 }}>
        <LibrariesList />
        <AppMenuBottomSheet />
        <CreateLibrary />
      </View>
    </RollsContext.Provider>
  );
};

export default Container;
