import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import { baseBackgroundColor } from '../../../../utils/colorsTable';
import LibraryAssetContext from './LibraryAsset/LibraryAssetContext';
import LibraryAsset from './LibraryAsset/Container';

const videoTypesTable = {
  normal: 'none',
  olive: 'green1',
  ocean: 'blue1',
  camel: 'red1',
  sepia: 'yellow1',
};

const cameraTypesTable = {
  normal: '',
};

const DateAssetsContainer = (props) => {
  const [libraryAssets, setLibraryAssets] = useState([]);
  const [isFetchedLibraryAssets, setIsFetchedLibraryAssets] = useState(false);
  const reactionOptionsBottomSheetRef = useRef(null);
  // console.log(props.route.params);

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

  const renderLibraryAsset = (libraryAsset) => {
    return (
      <LibraryAsset
        navigation={props.navigation}
        libraryAsset={libraryAsset}
        libraryId={props.route.params.libraryId}
        reactionOptions={props.route.params.reactionOptions}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      {isFetchedLibraryAssets ? (
        <>
          <FlatList
            data={libraryAssets}
            renderItem={({ item }) => renderLibraryAsset(item)}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export default DateAssetsContainer;
