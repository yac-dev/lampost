import React, { useMemo, useContext } from 'react';
import AuthContext from './AuthContext';
import { View, Text, Keyboard } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseBackgroundColor, iconColorsTable, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import LogIn from './LogIn';
import SignUp from './SignUp';

const LoginOrSignupBottomSheet = () => {
  const { loginOrSignupBottomSheetRef, isLoginOrSignup } = useContext(AuthContext);
  const snapPoints = useMemo(() => ['85%'], []);

  const renderLoginOrSignup = () => {
    switch (isLoginOrSignup) {
      case 'LOGIN':
        return <LogIn />;
      case 'SIGNUP':
        return <SignUp />;
      default:
        return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={loginOrSignupBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'extend'}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        {renderLoginOrSignup()}
        {/* <BottomSheetTextInput
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
          color={baseTextColor}
          ref={textInputRef}
          value={text}
          onChangeText={setText}
          autoCapitalize='none'
        />
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View></View>
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
        </InputAccessoryView> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default LoginOrSignupBottomSheet;
