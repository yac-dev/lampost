import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibraryAssetContext from './LibraryAssetContext';
import Header from './Header';
import Asset from './Asset';
import ReactionOptions from './ReactionOptions';
import { iconsTable } from '../../../../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;

const LibraryAssetContainer = (props) => {
  const [reactions, setReactions] = useState(props.libraryAsset.reactions);

  return (
    <LibraryAssetContext.Provider
      value={{
        libraryAsset: props.libraryAsset,
        libraryId: props.libraryId,
        reactionOptions: props.reactionOptions,
        reactions,
        setReactions,
      }}
    >
      <View>
        <Header />
        <Asset />
        <ReactionOptions />
      </View>
    </LibraryAssetContext.Provider>
  );
};

export default LibraryAssetContainer;
