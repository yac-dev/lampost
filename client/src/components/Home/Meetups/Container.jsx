import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, ActivityIndicator } from 'react-native';
import { baseBackgroundColor, screenSectionBackgroundColor } from '../../../utils/colorsTable';
import Meetups from './Meetups';

const Container = () => {
  const { auth, isFetchedAuthData } = useContext(GlobalContext);

  if (isFetchedAuthData) {
    if (auth.isAuthenticated) {
      return (
        <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
          <Meetups />
        </View>
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
