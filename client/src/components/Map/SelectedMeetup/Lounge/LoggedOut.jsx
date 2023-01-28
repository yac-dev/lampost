import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';

const LoggedOutModal = (props) => {
  const { auth, isLoggedOutModalOpen, setIsLoggedOutModalOpen } = useContext(GlobalContext);
  // const { navigation } = useContext(LoungeContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setIsLoggedOutModalOpen(true);
    }
  }, [auth.isAuthenticated]);

  return (
    <Portal>
      <Dialog visible={isLoggedOutModalOpen} style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>You've logged out.</Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              props.navigation.reset({ index: 0, routes: [{ name: 'Meetups' }] });
              setIsLoggedOutModalOpen(false);
            }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LoggedOutModal;
