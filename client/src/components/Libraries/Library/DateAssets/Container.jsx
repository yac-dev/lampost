import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import { baseBackgroundColor } from '../../../../utils/colorsTable';
import LibraryAssetContext from './LibraryAsset/LibraryAssetContext';
import LibraryAsset from './LibraryAsset/Container';

const DateAssetsContainer = (props) => {
  const [libraryAssets, setLibraryAssets] = useState([]);
  const [isFetchedLibraryAssets, setIsFetchedLibraryAssets] = useState(false);

  const getLibraryAssetsByDate = async () => {
    const result = await lampostAPI.get(
      `/libraryandassetrelationships/${props.route.params.libraryId}/dateassets?datestring=${props.route.params.date.dateString}`
    );
    const { libraryAndAssets } = result.data;
    setLibraryAssets(libraryAndAssets);
    setIsFetchedLibraryAssets(true);
  };
  useEffect(() => {
    getLibraryAssetsByDate();
  }, []);

  console.log(libraryAssets);

  const renderLibraryAsset = useCallback((libraryAsset) => {
    return (
      <LibraryAssetContext.Provider value={{ libraryAsset }}>
        <LibraryAsset />
      </LibraryAssetContext.Provider>
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      {isFetchedLibraryAssets ? (
        <FlatList
          data={libraryAssets}
          renderItem={({ item }) => renderLibraryAsset(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default DateAssetsContainer;
