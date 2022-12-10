import React, { useRef, useState, useEffect } from 'react';
import LibrariesContext from './LibrariesContext';
import { View, Text, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { baseBackgroundColor, baseBorderColor, baseTextColor } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import CreateLibraryBottomSheet from './CreateLibraryBottomSheet/Container';
import LibraryOverviewBottomSheet from './LibraryOverviewBottomSheet/Container';

const Container = (props) => {
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [myJoinedLibraries, setMyJoinedLibraries] = useState([]);

  const appMenuBottomSheetRef = useRef(null);
  const createLibraryBottomSheetRef = useRef(null);
  const libraryOverviewBottomSheetRef = useRef(null);

  const selectLibrary = async (libraryId) => {
    libraryOverviewBottomSheetRef.current.snapToIndex(0);
    const result = await lampostAPI.get(`/libraries/${libraryId}`);
    const { library } = result.data;
    setSelectedLibrary(library);
  };

  const getLibraries = async () => {
    const result = await lampostAPI.get('/libraries');
    const { libraries } = result.data;
    setLibraries(libraries);
  };
  useEffect(() => {
    getLibraries();
  }, []);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <View
        style={{
          width: 50,
          height: 50,
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 10,
          borderColor: baseTextColor,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateTable['0']}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateTable['1']}
        </Text>
      </View>
    );
  };

  const renderLibraries = () => {
    if (libraries.length) {
      const librariesList = libraries.map((library, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ borderBottomWidth: 0.6, padding: 20, borderBottomColor: baseBorderColor }}
            onPress={() => selectLibrary(library._id)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              {renderDate(library.createdAt)}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: baseTextColor }}>
                  {library.name}
                </Text>
              </View>
            </View>
            <Text style={{ color: baseTextColor }}>{library.description}</Text>
          </TouchableOpacity>
        );
      });

      return <View>{librariesList}</View>;
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  };

  return (
    <LibrariesContext.Provider
      value={{
        appMenuBottomSheetRef,
        createLibraryBottomSheetRef,
        libraryOverviewBottomSheetRef,
        libraries,
        setLibraries,
        navigation: props.navigation,
        route: props.route,
        selectedLibrary,
        setSelectedLibrary,
        selectLibrary,
        myJoinedLibraries,
        setMyJoinedLibraries,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {renderLibraries()}
        <AppMenuBottomSheet />
        <CreateLibraryBottomSheet />
        <LibraryOverviewBottomSheet />
      </View>
    </LibrariesContext.Provider>
  );
};

export default Container;
