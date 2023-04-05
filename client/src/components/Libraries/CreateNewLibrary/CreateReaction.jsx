import React, { useContext, useMemo, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import FormContext from './FormContext';
import lampostAPI from '../../../apis/lampost';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  inputBackgroundColorNew,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import FastImage from 'react-native-fast-image';

const CreateUpvoteOptionBottomSheet = (props) => {
  const { Fontisto, Ionicons } = iconsTable;
  // const snapPoints = useMemo(() => ['80%'], []);
  // const { createReactionBottomSheetRef, creatingReaction, setCreatingReaction, navigation, setFormData } =
  //   useContext(FormContext);
  const [isDoneDisabled, setIsDoneDisabled] = useState(true);

  // useEffect(() => {
  //   if (creatingReaction.icon && creatingReaction.comment && creatingReaction.color) {
  //     setIsDoneDisabled(false);
  //   } else {
  //     setIsDoneDisabled(true);
  //   }
  // }, [creatingReaction]);

  const palette = () => {};

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Icons')}>
          <Text style={{ color: 'white', marginRight: 10 }}>Please select an icon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: inputBackgroundColorNew,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('Icons')}
        >
          {/* {creatingReaction.icon ? (
            <TouchableOpacity
              style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => navigation.navigate('Icons')}
            >
              <FastImage source={{ uri: creatingReaction.icon }} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          ) : (
            <Fontisto name='smiley' color={baseTextColor} size={25} />
          )} */}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10, color: 'white' }}>Short comment</Text>
        <TextInput
          placeholder='In 12 characters'
          placeholderTextColor={baseTextColor}
          style={{
            padding: 10,
            color: baseTextColor,
            backgroundColor: inputBackgroundColorNew,
            borderRadius: 5,
          }}
          // value={creatingReaction.comment}
          // onChangeText={(text) => {
          //   setCreatingReaction((previous) => {
          //     return {
          //       ...previous,
          //       comment: text,
          //     };
          //   });
          // }}
        />
      </View>
      <View>
        <Text style={{ color: 'white' }}>Color when upvoted</Text>
      </View>
    </View>
  );
};

export default CreateUpvoteOptionBottomSheet;
