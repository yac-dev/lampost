import React, { useContext, useMemo, useEffect, useState } from 'react';
import GlobalContext from '../../../../GlobalContext';
import PostContext from './PostContext';
import { View, Text, InputAccessoryView, TouchableOpacity, ScrollView, Image, Keyboard } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  sectionBackgroundColor,
  inputBackgroundColor,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';

import { AntDesign } from '@expo/vector-icons';

import EmojiSelector, { Categories } from 'react-native-emoji-selector';

const AddNewReaction = (props) => {
  const { auth } = useContext(GlobalContext);
  const inputAccessoryViewID = 'ADD_NEW_REACTION_INPUT';
  const { addNewReactionBottomSheetRef, post, setReactions } = useContext(PostContext);
  const snapPoints = useMemo(() => ['70%', '90%'], []);
  const [selectedEmoji, setSelectedEmoji] = useState('😄');
  const [text, setText] = useState('');

  const onDoneAddNewReactionDone = () => {
    Keyboard.dismiss();
  };

  const onAddNewReactionDone = () => {
    const payload = {
      userId: auth.data._id,
      assetPostId: post._id,
      content: text + '' + selectedEmoji,
    };
    console.log(payload);
    // const {reaction} = result.data;
    // setReactions((previous) => [...previous, reaction]);
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={addNewReactionBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 10 }}
          onPress={() => addNewReactionBottomSheetRef.current.close()}
        >
          <AntDesign name='close' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
          <Text style={{ color: baseTextColor }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>
          Select a emoji, write a short comment and express your feeling.
        </Text>
        <EmojiSelector
          // showTabs={false}
          columns={8}
          showSectionTitles={false}
          showSearchBar={false}
          category={Categories.symbols}
          onEmojiSelected={(emoji) => setSelectedEmoji(emoji)}
          style={{ height: 250, marginBottom: 15 }}
        />
        {/* <View style={{  marginBottom: 15 }}> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View style={{ backgroundColor: inputBackgroundColor, padding: 10, marginRight: 5, borderRadius: 5 }}>
            <Text>{selectedEmoji}</Text>
          </View>
          <BottomSheetTextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColor,
              color: baseTextColor,
              borderRadius: 5,
            }}
            placeholder='Write a comment in 30 words.'
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            value={text}
            onChangeText={(text) => setText(text)}
            autoCapitalize='none'
          />
        </View>
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => onDoneAddNewReactionDone()}>
              <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
        <View style={{ flexDirection: 'row' }}>
          <ActionButton
            label='Done'
            backgroundColor={iconColorsTable['blue1']}
            icon={<AntDesign name='check' size={25} color='white' />}
            onActionButtonPress={() => onAddNewReactionDone()}
          />
        </View>
        {/* </View> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AddNewReaction;
