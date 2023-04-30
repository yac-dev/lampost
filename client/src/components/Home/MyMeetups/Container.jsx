import React, { useContext, useState, useRef } from 'react';
import GlobalContext from '../../../GlobalContext';
import MyMeetupsContext from './MyMeetupsContext';
import { View, Text, ActivityIndicator } from 'react-native';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import Meetups from './Meetups';
import MoreMenuBottomSheet from './MoreMenuBottomSheet';

const Container = (props) => {
  const { auth, isFetchedAuthData } = useContext(GlobalContext);
  const moreMenuBottomSheetRef = useRef(null);
  const [moreMenu, setMenuMenu] = useState(null);

  console.log(moreMenu);
  if (isFetchedAuthData) {
    if (auth.isAuthenticated) {
      return (
        <MyMeetupsContext.Provider
          value={{ navigation: props.navigation, moreMenuBottomSheetRef, moreMenu, setMenuMenu }}
        >
          <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
            <Meetups />
            <MoreMenuBottomSheet />
          </View>
        </MyMeetupsContext.Provider>
      );
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }}>Please login</Text>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default Container;
