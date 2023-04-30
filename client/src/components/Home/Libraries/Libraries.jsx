import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { baseTextColor, inputBackgroundColorNew } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { Ionicons, MaterialCommunityIcons, MaterialIcons } = iconsTable;

const Libraries = () => {
  const { auth, myJoinedLibraries } = useContext(GlobalContext);

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
              myLibrariesBottomSheetRef.current.close();
              navigation.navigate('Library', { libraryId: library._id, libraryAssetType: library.assetType });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 70,
                  height: 70,
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
              <Text style={{ color: 'white', fontSize: 20 }}>{library.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>{renderAssetType(library)}</View>
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
              myLibrariesBottomSheetRef.current.close();
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
            backgroundColor: inputBackgroundColorNew,
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
