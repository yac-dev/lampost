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

const PostAssetsBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const { postAssetsBottomSheetRef, route, setAssets } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const [addedAssets, setAddedAssets] = useState([]); // これ、多分library側に持っといた方がいいかも。
  const [caption, setCaption] = useState('');

  const renderReactions = () => {};

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
          <ScrollView horizontal={true}>{renderAddedAssets()}</ScrollView>
        </View>
        <Text style={{ color: baseTextColor, marginBottom: 5 }}>Add caption or comment</Text>
        <BottomSheetTextInput
          style={{ padding: 10, borderRadius: 10, backgroundColor: inputBackgroundColor, marginBottom: 25 }}
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
              console.log('Hello');
              postAssetsBottomSheetRef.current.close();
            }}
          />
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default PostAssetsBottomSheet;
