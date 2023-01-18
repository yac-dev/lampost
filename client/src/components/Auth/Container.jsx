// main libraries
import React, { useRef, useState } from 'react';
import AuthContext from './AuthContext';
import { View, Text } from 'react-native';
import { baseBackgroundColor, iconColorsTable } from '../../utils/colorsTable';
import ActionButton from '../Utils/ActionButton';
import LoginOrSignupBottomSheet from './LoginOrSignupBottomSheet';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// react native elements
import { Button as RNEButton } from '@rneui/themed';

const Container = (props) => {
  const loginOrSignupBottomSheetRef = useRef(null);
  const [isLoginOrSignup, setIsLoginOrSignup] = useState('');

  return (
    <AuthContext.Provider value={{ loginOrSignupBottomSheetRef, isLoginOrSignup, setIsLoginOrSignup }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150, paddingLeft: 20, paddingRight: 20 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30, marginBottom: 30 }}>Lampost</Text>
          <Text style={{ color: 'white', marginBottom: 30 }}>On we go meetup and share your special moment!</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActionButton
              label='Login'
              icon={<MaterialIcons name='login' size={25} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => {
                setIsLoginOrSignup('LOGIN');
                loginOrSignupBottomSheetRef.current.snapToIndex(0);
              }}
            />
            <Text style={{ color: 'white', marginRight: 10 }}>Or</Text>
            <ActionButton
              label='Signup'
              icon={<AntDesign name='plus' size={25} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => {
                setIsLoginOrSignup('SIGNUP');
                loginOrSignupBottomSheetRef.current.snapToIndex(0);
              }}
            />
          </View>
          {/* <Text style={{ color: 'white' }}>Founded by Yosuke Kojima</Text> */}
        </View>
        <LoginOrSignupBottomSheet />
      </View>
    </AuthContext.Provider>
  );
};

export default Container;
