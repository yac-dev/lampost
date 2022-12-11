import React, { useRef, useState, useEffect, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import LibrariesContext from './LibrariesContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import lampostAPI from '../../apis/lampost';
import {
  baseBackgroundColor,
  baseBorderColor,
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BadgeLabel from '../Utils/BadgeLabel';

import AppMenuBottomSheet from './AppMenuBottomSheet/Container';
import CreateLibraryBottomSheet from './CreateLibraryBottomSheet/Container';
import LibraryOverviewBottomSheet from './LibraryOverviewBottomSheet/Container';

const Container = (props) => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const rollsBottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [myJoinedLibraries, setMyJoinedLibraries] = useState([]);

  const appMenuBottomSheetRef = useRef(null);
  const createLibraryBottomSheetRef = useRef(null);
  const libraryOverviewBottomSheetRef = useRef(null);

  useEffect(() => {
    auth.socket.on('CREATED_LIBRARY', (data) => {
      setLibraries((previous) => [...previous, data]);
      if (data.launcher._id === auth.data._id) {
        setSnackBar({
          isVisible: true,
          message: 'Successfully created my library.',
          barType: 'success',
          duration: 5000,
        });
        setMyJoinedLibraries((previous) => [...previous, data]);
        createLibraryBottomSheetRef.current.close();
      }
    });
  }, []);

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

  // const renderDate = (date) => {
  //   const d = new Date(date).toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //   });
  //   const dateTable = { ...d.split(' ') };
  //   return (
  //     <View
  //       style={{
  //         width: 50,
  //         height: 50,
  //         padding: 10,
  //         borderRadius: 10,
  //         borderWidth: 0.3,
  //         marginRight: 10,
  //         borderColor: baseTextColor,
  //       }}
  //     >
  //       <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
  //         {dateTable['0']}
  //       </Text>
  //       <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
  //         {dateTable['1']}
  //       </Text>
  //     </View>
  //   );
  // };

  const renderBadgeLabels = (badges) => {
    const badgeLabels = badges.map((badge, index) => {
      return (
        <BadgeLabel
          key={index}
          badgeIcon={badge.icon}
          badgeLableBackgroundColor={backgroundColorsTable[badge.color]}
          badgeIconColor={iconColorsTable[badge.color]}
          labelTextColor={iconColorsTable[badge.color]}
          labelText={badge.name}
        />
      );
    });

    return <View style={{ flexDirection: 'row' }}>{badgeLabels}</View>;
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17, color: baseTextColor }}>{library.name}</Text>
              <Text>Launched at Sep 14 2022</Text>
            </View>
            <ScrollView style={{ marginBottom: 15 }} horizontal={true}>
              {renderBadgeLabels(library.badges)}
            </ScrollView>
            <Text style={{ color: baseTextColor, marginBottom: 15 }}>{library.description}</Text>
            <Text style={{ alignSelf: 'flex-end', color: baseTextColor }}>Launched by {library.launcher.name}</Text>
          </TouchableOpacity>
        );
      });

      return <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>{librariesList}</ScrollView>;
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
