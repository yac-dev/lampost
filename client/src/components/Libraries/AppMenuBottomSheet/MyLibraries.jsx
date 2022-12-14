import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import {
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const { myJoinedLibraries, setMyJoinedLibraries, navigation, appMenuBottomSheetRef } = useContext(LibrariesContext);

  const getMyJoinedLibraries = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/${auth.data._id}`);
    const { myJoinedLibraries } = result.data;
    setMyJoinedLibraries(myJoinedLibraries);
  };
  useEffect(() => {
    if (auth.data) {
      getMyJoinedLibraries();
    }
  }, []);

  const renderMyJoinedLibraries = () => {
    if (myJoinedLibraries.length) {
      const myJoinedLibrariesList = myJoinedLibraries.map((library, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              appMenuBottomSheetRef.current.snapToIndex(0);
              navigation.navigate('Library', { libraryId: library._id });
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                // backgroundColor: rnDefaultBackgroundColor,
                marginRight: 15,
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: library.thumbnail.data }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
              />
              {/* <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: backgroundColorsTable[library.color],
                }}
              >
                <Ionicons name='ios-library' size={30} color={iconColorsTable[library.color]} />
              </View> */}
            </View>

            <Text style={{ color: baseTextColor }}>{library.name}</Text>
          </TouchableOpacity>
        );
      });

      return <View>{myJoinedLibrariesList}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }}>You haven't joined any libraries yet.</Text>
        </View>
      );
    }
  };

  if (auth.data) {
    return (
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>My joined libraries</Text>
        <ScrollView>{renderMyJoinedLibraries()}</ScrollView>
      </View>
    );
  } else {
    return null;
  }
};

const mapStatToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStatToProps)(Container);
