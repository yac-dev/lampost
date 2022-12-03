import React, { useContext, useRef, useEffect, useState } from 'react';
import LibraryContext from './LibraryContext';
import lampostAPI from '../../../apis/lampost';
import { View, Text, TouchableOpacity } from 'react-native';
import RollsContext from '../LibrariesContext';

import AppMenuBottomSheet from './AppMenuBottomSheet';

const Container = (props) => {
  const appMenuBottomSheetRef = useRef(null);
  const [library, setLibrary] = useState(null);
  const [selectedRoll, setSelectedRoll] = useState(null); // defaultでlibraryの一番目のrollとする。
  const [assets, setAssets] = useState([]);

  const getLibrary = async () => {
    // console.log(props.route.params.libraryId);
    const result = await lampostAPI.get(`/libraries/${props.route.params.libraryId}`);
    const { library } = result.data;
    setLibrary(library);
    setSelectedRoll(library.rolls[0]._id);
  };
  useEffect(() => {
    getLibrary();
  }, []);

  // const getAssets = async() => {
  //   const result = await lampostAPI.get(`/rollAndAssetRelationships/${selectedRoll._id}`);
  //   const {assets} = result.data;
  //   setAssets(assets)
  // }
  // useEffect(() => {
  //   if(selectedRoll){
  //     getAssets()
  //   }
  // },[selectedRoll])
  // selectedRollのid使ってassetを取ってくるようにする。

  return (
    <LibraryContext.Provider value={{ appMenuBottomSheetRef, selectedRoll, setSelectedRoll, library }}>
      <View style={{ flex: 1 }}>
        <Text>{props.route.params.libraryId}</Text>
        <AppMenuBottomSheet />
      </View>
    </LibraryContext.Provider>
  );
};

export default Container;
