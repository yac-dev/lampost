import React, { useMemo, useContext, useState } from 'react';
import LoungeContext from './LoungeContext';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, sectionBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';

const SendChatBottomSheet = (props) => {
  const inputAccessoryViewID = 'SEND_CHAT_INPUT';
  const snapPoints = useMemo(() => ['65%'], []);
  const { appMenuBottomSheetRef, sendChatBottomSheetRef, textInputRef } = useContext(LoungeContext);
  const [text, setText] = useState('');

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={sendChatBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      keyboardBehavior={'extend'}
      onClose={() => setText('')}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <BottomSheetTextInput
            multiline={true}
            placeholder='Add a message'
            placeholderTextColor={baseTextColor}
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              borderRadius: 10,
              height: '100%',
              padding: 10,
              // backgroundColor: 'rgb(235, 235, 235)',
              width: '100%', // ここも、下の修正に沿って80 90%に変える。
            }}
            ref={textInputRef}
            value={text}
            onChangeText={setText}
            autoCapitalize='none'
          />
          {/* <View style={{ height: '100%', width: '10%' }}> ここ、後で修正する。
            <TouchableOpacity
              onPress={() =>
                // keybord dismissとともに、snappointを15%にまで下げる。
                console.log('hi')
              }
              style={{
                backgroundColor: iconColorsTable['red1'],
                padding: 5,
                borderRadius: 7,
                width: 25,
                height: 25,
                marginBottom: 10,
              }}
            >
              <FontAwesome5 name='photo-video' size={15} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                // keybord dismissとともに、snappointを15%にまで下げる。
                console.log('hi')
              }
              style={{
                backgroundColor: iconColorsTable['red1'],
                padding: 5,
                borderRadius: 7,
                width: 25,
                height: 25,
              }}
            >
              <FontAwesome name='camera' size={15} />
            </TouchableOpacity>
          </View> */}
        </View>
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  // keybord dismissとともに、snappointを15%にまで下げる。
                  Keyboard.dismiss()
                }
              >
                {/* <MaterialCommunityIcons name='comment-text' />; */}
                <Text>General</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                {/* <Ionicons name='bulb-outline' size={15} color={'white'} />; */}
                <Text>Idea</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                {/* <Ionicons name='bulb-outline' size={15} color={'white'} />; */}
                <Text>Question and Help</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                {/* <FontAwesome5 name='question' size={15} color={'white'} />; */}
                <Text>Announcement</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  Keyboard.dismiss();
                  sendChatBottomSheetRef.current.close();
                  appMenuBottomSheetRef.current.snapToIndex(0);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => onSendPress()}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SendChatBottomSheet;
