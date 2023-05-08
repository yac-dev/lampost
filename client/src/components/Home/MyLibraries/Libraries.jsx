import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { baseTextColor, iconColorsTable, inputBackgroundColorNew } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { Ionicons, MaterialCommunityIcons, MaterialIcons } = iconsTable;

const Libraries = (props) => {
  const { auth, myJoinedLibraries } = useContext(GlobalContext);
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  const renderAssetType = (library) => {
    if (library.assetType === 'photo') {
      return <Ionicons name='image' size={20} color={'white'} />;
    } else if (library.assetType === 'video') {
      return <Ionicons name='videocam' size={20} color={'white'} />;
    } else if (library.assetType === 'photoAndVideo') {
      return (
        <View style={{ flexDirection: 'column', alignContent: 'center' }}>
          <Ionicons name='image' size={20} color={'white'} style={{ marginRight: 5 }} />
          <Ionicons name='videocam' size={20} color={'white'} />
        </View>
      );
    }
  };

  console.log(myJoinedLibraries);

  if (myJoinedLibraries.length) {
    const myJoinedLibrariesList = myJoinedLibraries.map((library, index) => {
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
              // myLibrariesBottomSheetRef.current.close();
              // navigation.navigate('Library', { libraryId: library._id, libraryAssetType: library.assetType });
              props.navigation.navigate('LibraryNavigator', {
                screen: 'Library',
                params: { libraryId: library._id, libraryAssetType: library.assetType, libraryTitle: library.title },
              });
              // screen: 'expeFormOneScreen',
              //   params: {
              //     currentItem: someValue
              //   },
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 80,
                  height: 80,
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
                <View style={{ position: 'absolute', bottom: 0, right: 0 }}>{renderAssetType(library)}</View>
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{library.title}</Text>
                {library.isPublic ? null : (
                  <Text style={{ color: baseTextColor, fontSize: 15, marginTop: 5 }}>Private</Text>
                )}
              </View>
            </View>
            <Text style={{ color: 'white', marginRight: 10 }}>{library.totalAssets}</Text>
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
              // myLibrariesBottomSheetRef.current.close();
              props.navigation.navigate('LibraryNavigator', {
                screen: 'Library',
                params: { libraryId: library._id, libraryAssetType: library.assetType, libraryTitle: library.title },
              });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 80,
                  height: 80,
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
                <View style={{ position: 'absolute', bottom: 0, right: 0 }}>{renderAssetType(library)}</View>
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{library.title}</Text>
                {library.isPublic ? null : (
                  <Text style={{ color: baseTextColor, fontSize: 15, marginTop: 5 }}>Private</Text>
                )}
              </View>
            </View>
            <Text style={{ color: 'white', marginRight: 10 }}>{library.totalAssets}</Text>
          </TouchableOpacity>
        );
      }
    });

    return (
      <ScrollView>
        <View>{myJoinedLibrariesList}</View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <View
          style={{
            borderRadius: 10,
            width: 80,
            height: 80,
            marginTop: 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: iconColorsTable['blue1'],
            alignSelf: 'center',
            marginBottom: 10,
          }}
        >
          <Ionicons name='ios-library-sharp' size={50} color={baseTextColor} />
        </View>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          You'll see all the libraries you've created or joined.
        </Text>
      </View>
    );
  }
};

export default Libraries;
