import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  sectionBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import ActionButton from '../../Utils/ActionButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const PostsBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const { library, postsBottomSheetRef, libraryPosts, setLibraryPosts, navigation } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['90%'], []);

  const renderPosts = () => {
    if (libraryPosts.length) {
      const libraryPostsList = libraryPosts.map((post, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}
            onPress={() => {
              navigation.navigate('Post', { post, library });
            }}
          >
            <Text style={{ color: baseTextColor, fontSize: 17, marginBottom: 20 }}>{post.caption}</Text>
            <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
              {post.assets.map((asset, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: asset.data }}
                    style={{ width: 150, height: 150, marginRight: 10 }}
                  />
                );
              })}
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 20 }}>
              <View style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: 10, marginRight: 10 }}></View>
              <Text style={{ color: baseTextColor }}>{post.user.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 25 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.3,
                  borderRadius: 10,
                  borderColor: 'white',
                  padding: 10,
                  backgroundColor: sectionBackgroundColor,
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: baseTextColor, marginRight: 5 }}>Nice photo 😆</Text>
                <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>150</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.3,
                  borderRadius: 10,
                  borderColor: 'white',
                  padding: 10,
                  backgroundColor: sectionBackgroundColor,
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: baseTextColor, marginRight: 5 }}>Woooow 😮</Text>
                <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>234</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.3,
                  borderRadius: 10,
                  borderColor: 'white',
                  padding: 10,
                  backgroundColor: sectionBackgroundColor,
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: baseTextColor, marginRight: 5 }}>Wanna go there 👍</Text>
                <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>67</Text>
              </TouchableOpacity>
              <Text style={{ color: baseTextColor }}>And more...</Text>
            </View>
          </TouchableOpacity>
        );
      });

      return <View>{libraryPostsList}</View>;
    } else {
      return null; // loadingかなここは。
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={postsBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1, paddingTop: 20 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderPosts()}</ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default PostsBottomSheet;
