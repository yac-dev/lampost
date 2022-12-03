import React, { useState, useEffect, useContext } from 'react';
import LibrariesContext from '../../LibrariesContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import {
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';

const Container = (props) => {
  const { myJoinedLibraries, setMyJoinedLibraries } = useContext(LibrariesContext);

  const getMyJoinedLibraries = async () => {
    const result = await lampostAPI.get(`/libraryanduserrelationships/${props.auth.data._id}`);
    const { myJoinedLibraries } = result.data;
    setMyJoinedLibraries(myJoinedLibraries);
  };
  useEffect(() => {
    getMyJoinedLibraries();
  }, []);

  const renderMyJoinedLibraries = () => {
    if (myJoinedLibraries.length) {
      const myJoinedLibrariesList = myJoinedLibraries.map((library, index) => {
        return (
          <TouchableOpacity key={index} style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: rnDefaultBackgroundColor,
                marginRight: 15,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: backgroundColorsTable['blue1'],
                }}
              >
                <Ionicons name='ios-library' size={30} color={iconColorsTable['blue1']} />
              </View>
            </View>

            <Text style={{ color: baseTextColor }}>{library.name}</Text>
          </TouchableOpacity>
        );
      });

      return <View>{myJoinedLibrariesList}</View>;
    } else {
      return (
        <View>
          <Text>You haven't joined any libraries yet...</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>My libraries</Text>
      <ScrollView>{renderMyJoinedLibraries()}</ScrollView>
    </View>
  );
};

const mapStatToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStatToProps)(Container);
