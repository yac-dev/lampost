import React, { useContext, useMemo, useEffect, useState } from 'react';
import GlobalContext from '../../../../GlobalContext';
import { View, Text, InputAccessoryView, TouchableOpacity, Keyboard } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  sectionBackgroundColor,
  inputBackgroundColor,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import lampostAPI from '../../../../apis/lampost';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import EmojiSelector, { Categories } from 'react-native-emoji-selector';

const AddNewReactionBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const inputAccessoryViewID = 'ADD_NEW_REACTION_INPUT';
  const snapPoints = useMemo(() => ['100%'], []);
  const [selectedEmoji, setSelectedEmoji] = useState('😄');
  const [text, setText] = useState('');

  const onDonePress = () => {
    Keyboard.dismiss();
  };

  const createNewReaction = async () => {
    const reactionContent = text + ' ' + selectedEmoji;
    const result = await lampostAPI.post(`/assetandreactionanduserrelationships`, {
      text,
      selectedEmoji,
      user: { _id: auth.data._id, name: auth.data.name, photo: auth.data.photo },
      assetId: props.routeParams.asset._id,
      libraryId: props.routeParams.libraryId,
    });
    const { reaction } = result.data;
    props.setReactions((previous) => {
      return {
        ...previous,
        [reaction._id]: reaction,
      };
    });
    props.addNewReactionBottomSheetRef.current.close();
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.addNewReactionBottomSheetRef}
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
          onPress={() => props.addNewReactionBottomSheetRef.current.close()}
        >
          <AntDesign name='close' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
          <Text style={{ color: baseTextColor }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>
          Select an emoji, write a short comment and express your feeling.
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View style={{ backgroundColor: inputBackgroundColor, padding: 10, marginRight: 5, borderRadius: 5 }}>
            <Text style={{ fontSize: 17 }}>{selectedEmoji}</Text>
          </View>
          <BottomSheetTextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColor,
              color: baseTextColor,
              borderRadius: 5,
              fontSize: 17,
            }}
            placeholder='Write a comment in 30 characters.'
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
            <TouchableOpacity onPress={() => onDonePress()}>
              <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
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
        <View style={{ flexDirection: 'row' }}>
          <ActionButton
            label='Send'
            backgroundColor={iconColorsTable['blue1']}
            icon={<Ionicons name='ios-send' size={25} color='white' />}
            onActionButtonPress={() => {
              createNewReaction();
            }}
          />
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AddNewReactionBottomSheet;
