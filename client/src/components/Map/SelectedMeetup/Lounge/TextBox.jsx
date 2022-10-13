import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const TextBox = (props) => {
  const snapPoints = ['50%', '70%', '100%'];
  const textInputRef = useRef(null);
  const inputAccessoryViewID = '111111111';
  const [content, setContent] = useState('');

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.bottomSheetTextBoxRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      keyboardBehavior={'interactive'}
      onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <BottomSheetTextInput
          placeholder='Write your message' // ここを、bottom sheetのmax分に広げる。
          inputAccessoryViewID={inputAccessoryViewID}
          style={{ flex: 1, borderRadius: 10 }}
          ref={textInputRef}
          value={content}
          onChangeText={setContent}
        />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default TextBox;
