import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { iconsTable } from '../../../utils/icons';

const Container = (props) => {
  const { Ionicons, MaterialCommunityIcons, MaterialIcons } = iconsTable;
  const { auth } = useContext(GlobalContext);
  const { myJoinedLibraries, setMyJoinedLibraries, navigation, appMenuBottomSheetRef } = useContext(LibrariesContext);

  const getMyJoinedLibraries = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/${auth.data._id}`);
    const { myJoinedLibraries } = result.data;
    setMyJoinedLibraries(myJoinedLibraries);
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      getMyJoinedLibraries();
    }
  }, [auth.isAuthenticated]);

  const renderAssetType = (library) => {
    if (library.assetType === 'photo') {
      return <Ionicons name='camera' size={20} color={'white'} style={{ marginRight: 10 }} />;
    } else if (library.assetType === 'video') {
      return <Ionicons name='videocam' size={20} color={'white'} style={{ marginRight: 10 }} />;
    } else if (library.assetType === 'photoAndVideo') {
      return (
        <View style={{ flexDirection: 'row', alignContent: 'center', marginRight: 10 }}>
          <Ionicons name='image' size={20} color={'white'} style={{ marginRight: 5 }} />
          <Ionicons name='videocam' size={20} color={'white'} />
        </View>
      );
    }
  };

  const renderMyJoinedLibraries = () => {
    if (myJoinedLibraries.length) {
      const myJoinedLibrariesList = myJoinedLibraries.map((library, index) => {
        // return (
        //   <TouchableOpacity
        //     key={index}
        //     style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}
        //     onPress={() => {
        //       appMenuBottomSheetRef.current.close();
        //       navigation.navigate('Library', { libraryId: library._id });
        //     }}
        //   >
        //     <View
        //       style={{
        //         width: 40,
        //         height: 40,
        //         marginRight: 15,
        //         borderRadius: 10,
        //       }}
        //     >
        //       <FastImage
        //         style={{ width: '100%', height: '100%', borderRadius: 5 }}
        //         source={{
        //           uri: library.thumbnail.data,
        //           // priority: FastImage.priority.normal,
        //         }}
        //         resizeMode={FastImage.resizeMode.stretch}
        //       />
        //     </View>

        //     <Text style={{ color: baseTextColor }}>{library.name}</Text>
        //   </TouchableOpacity>
        // );
        if (library.thumbnail.type === 'photo') {
          return (
            <TouchableOpacity
              key={index}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                appMenuBottomSheetRef.current.close();
                navigation.navigate('Library', { libraryId: library._id, libraryAssetType: library.assetType });
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 15,
                    borderRadius: 7,
                  }}
                >
                  <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 7 }}
                    source={{
                      uri: library.thumbnail.data,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                </View>
                <Text style={{ color: baseTextColor, fontSize: 17 }}>{library.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {renderAssetType(library)}
                <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
              </View>
            </TouchableOpacity>
          );
        } else if (library.thumbnail.type === 'video') {
          return (
            <TouchableOpacity
              key={index}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                appMenuBottomSheetRef.current.close();
                navigation.navigate('Library', { libraryId: library._id, libraryAssetType: library.assetType });
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 15,
                    borderRadius: 7,
                  }}
                >
                  <Video
                    style={{ width: '100%', height: '100%', borderRadius: 7 }}
                    source={{
                      uri: library.thumbnail.data,
                    }}
                    useNativeControls={false}
                    resizeMode='stretch'
                    isLooping={false}
                  />
                </View>
                <Text style={{ color: baseTextColor }}>{library.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {renderAssetType(library)}
                <MaterialCommunityIcons name='chevron-right' size={20} color={baseTextColor} />
              </View>
            </TouchableOpacity>
          );
        }
      });

      return <View>{myJoinedLibrariesList}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }}>You haven't joined any libraries yet.</Text>
        </View>
      );
    }
  };

  if (auth.data) {
    return (
      // <View>
      //   <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>My joined libraries</Text>

      // </View>
      // このbottomsheetのscrollviewって、viewで囲うとダメみたい。
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>{renderMyJoinedLibraries()}</BottomSheetScrollView>
    );
  } else {
    return null;
  }
};

export default Container;
