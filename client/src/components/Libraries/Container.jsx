import React, { useRef, useState, useEffect } from 'react';
import LibrariesContext from './LibrariesContext';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// import Roll from './Roll';
// import BadgeFolders from './BadgeFolders/Container';
// import BadgeFolderBottomSheet from './Rolls/RollsBottomSheet';
import LibrariesList from './LibrariesList/Container';
import AppMenuBottomSheet from './AppMenuBottomSheet';
import CreateLibraryBottomSheet from './CreateLibraryBottomSheet/Container';
import LibraryOverviewBottomSheet from './LibraryOverviewBottomSheet/Container';

const Container = (props) => {
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const appMenuBottomSheetRef = useRef(null);
  const createLibraryBottomSheetRef = useRef(null);
  const libraryOverviewBottomSheetRef = useRef(null);

  const handleCreateLibraryBottomSheet = () => {
    appMenuBottomSheetRef.current.snapToIndex(0);
    createLibraryBottomSheetRef.current.snapToIndex(0);
  };

  const selectLibrary = async (id) => {
    libraryOverviewBottomSheetRef.current.snapToIndex(0);
    const result = await lampostAPI.get(`/libraries/${id}`);
    const { library } = result.data;
    setSelectedLibrary(library);
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

  const getLibraries = async () => {
    const result = await lampostAPI.get('/libraries');
    const { libraries } = result.data;
    setLibraries(libraries);
  };
  useEffect(() => {
    getLibraries();
  }, []);

  return (
    <LibrariesContext.Provider
      value={{
        appMenuBottomSheetRef,
        createLibraryBottomSheetRef,
        libraryOverviewBottomSheetRef,
        handleCreateLibraryBottomSheet,
        libraries,
        setLibraries,
        navigation: props.navigation,
        selectedLibrary,
        setSelectedLibrary,
        selectLibrary,
      }}
    >
      <View style={{ flex: 1 }}>
        <LibrariesList />
        <AppMenuBottomSheet />
        <CreateLibraryBottomSheet />
        <LibraryOverviewBottomSheet />
      </View>
    </LibrariesContext.Provider>
  );
};

export default Container;
