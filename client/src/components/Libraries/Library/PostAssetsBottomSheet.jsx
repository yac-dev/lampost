import React, { useState, useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  sectionBackgroundColor,
  inputBackgroundColor,
  iconColorsTable,
} from '../../../utils/colorsTable';
import { AntDesign } from '@expo/vector-icons';
import ActionButton from '../../Utils/ActionButton';
import lampostAPI from '../../../apis/lampost';

const PostAssetsBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const { postAssetsBottomSheetRef, route, setAssets, library } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const [addedAssets, setAddedAssets] = useState([]); // これ、多分library側に持っといた方がいいかも。
  const [caption, setCaption] = useState('');

  const onPostAssetPress = async () => {
    const payload = {
      caption,
      userId: auth.data._id,
      libraryId: library._id,
      assets: addedAssets,
    };
    const result = await lampostAPI.post(`/assetposts`, payload);
    const { assets } = result.data;
    setAssets((prev) => [...prev, ...assets]);
    postAssetsBottomSheetRef.current.close();
  };

  useEffect(() => {
    if (route.params?.addedAssets) {
      // console.log('this is the badges...', props.route.params.addedMeetupBadges);
      // props.dispatch({ type: 'SET_MEETUP_BADGES', payload: props.route.params.addedMeetupBadges });
      // まあ、単純に写真を表示するだけだから。。。
      console.log(route.params?.addedAssets);
      postAssetsBottomSheetRef.current.snapToIndex(0);
      setAddedAssets(route.params?.addedAssets);
      // ここであとはassetsをsetするだけと。
    }
  }, [route.params?.addedAssets]);

  const renderAddedAssets = () => {
    if (addedAssets.length) {
      const addedAssetsList = addedAssets.map((asset, index) => {
        return (
          <View key={index}>
            <Image source={{ uri: asset.data }} style={{ width: 150, height: 150, marginRight: 10 }} />
          </View>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{addedAssetsList}</View>;
    } else {
      return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={postAssetsBottomSheetRef}
      snapPoints={snapPoints}
      keyboardBehavior={'extend'}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
      )}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => setLibraryMembers([])}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <View style={{ marginBottom: 25 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Post</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}
              onPress={() => {
                setAddedAssets([]);
                postAssetsBottomSheetRef.current.close();
              }}
            >
              <AntDesign name='close' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
              <Text style={{ color: baseTextColor }}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true}>{renderAddedAssets()}</ScrollView>
        </View>
        <Text style={{ color: baseTextColor, marginBottom: 5 }}>Add caption or comment</Text>
        <BottomSheetTextInput
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: inputBackgroundColor,
            marginBottom: 25,
            color: baseTextColor,
          }}
          placeholder={'Caption in 40 words'}
          placeholderTextColor={baseTextColor}
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />
        <View style={{ flexDirection: 'row' }}>
          <ActionButton
            label='Post'
            icon={<AntDesign name='plus' size={25} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => {
              onPostAssetPress();
            }}
          />
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default PostAssetsBottomSheet;
