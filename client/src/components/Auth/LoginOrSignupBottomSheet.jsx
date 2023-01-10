import React, { useMemo, useContext } from 'react';
import AuthContext from './AuthContext';
import { View, Text, Keyboard } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseBackgroundColor, iconColorsTable, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import LogIn from './LogIn';
import SignUp from './SignUp';

const LoginOrSignupBottomSheet = () => {
  const { loginOrSignupBottomSheetRef, isLoginOrSignup, setIsLoginOrSignup } = useContext(AuthContext);
  const snapPoints = useMemo(() => ['100%'], []);

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
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'extend'}
      onClose={() => setIsLoginOrSignup('')}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>{renderLoginOrSignup()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default LoginOrSignupBottomSheet;
