import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { screenSectionBackgroundColor, baseBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';
import Libraries from './Libraries';

const Container = (props) => {
  const { auth, setMyJoinedLibraries, isFetchedMyJoinedLibraries, setIsFetchedMyJoinedLibraries } =
    useContext(GlobalContext);
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  const getMyJoinedLibraries = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/${auth.data._id}`);
    const { myJoinedLibraries } = result.data;
    setMyJoinedLibraries(myJoinedLibraries);
    setIsFetchedMyJoinedLibraries(true);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      getMyJoinedLibraries();
    }
  }, [auth.isAuthenticated]);

  if (auth.isAuthenticated) {
    if (isFetchedMyJoinedLibraries) {
      return (
        <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
          <Libraries navigation={props.navigation} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
          <ActivityIndicator />
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginTop: 50, textAlign: 'center' }}>
          Please login or signup to experience complete functions
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30 }}>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: iconColorsTable['blue1'], borderRadius: 5, marginRight: 10 }}
            onPress={() => topLevelHomeNavigation.navigate('Home login')}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: iconColorsTable['blue1'], borderRadius: 5 }}
            onPress={() => topLevelHomeNavigation.navigate('Home signup')}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default Container;
