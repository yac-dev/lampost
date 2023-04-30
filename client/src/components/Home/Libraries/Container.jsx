import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { screenSectionBackgroundColor, baseBackgroundColor } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import Libraries from './Libraries';

const Container = () => {
  const { auth, setMyJoinedLibraries, isFetchedAuthData } = useContext(GlobalContext);

  const getMyJoinedLibraries = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/${auth.data._id}`);
    const { myJoinedLibraries } = result.data;
    setMyJoinedLibraries(myJoinedLibraries);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      getMyJoinedLibraries();
    }
  }, [auth.isAuthenticated]);

  if (isFetchedAuthData) {
    if (auth.isAuthenticated) {
      return (
        <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
          <Libraries />
        </View>
      );
    } else {
      <View>
        <Text style={{ marginBottom: 30 }}>Once you login, .....</Text>
        <TouchableOpacity style={{ backgroundColor: 'red', padding: 10 }}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'red', padding: 10 }}>
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>;
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
