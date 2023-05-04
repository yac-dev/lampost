import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import FastImage from 'react-native-fast-image';
import lampostAPI from '../../../../apis/lampost';
import {
  baseBackgroundColor,
  rnDefaultBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';

const Container = (props) => {
  const { isIpad, auth } = useContext(GlobalContext);
  const [icons, setIcons] = useState({});
  const [isIconsFetched, setIsIconsFetched] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [page, setPage] = useState(1);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 16 : Dimensions.get('window').width / 8;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  // const oneGridHeight = Dimensions.get('window').height / 7;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.7;

  useEffect(() => {
    // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
    // if (props.route.params.fromComponent === 'CREATE_USER_BADGE') {
    // setFromComponent('CREATE_USER_BADGE');
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ name: 'Create reaction', params: { selectedIcon }, merge: true })}
          disabled={selectedIcon ? false : true}
        >
          <Text
            style={{
              color: selectedIcon ? 'white' : screenSectionBackgroundColor,
              fontSize: 20,
              fontWeight: selectedIcon ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
    // }
  }, [selectedIcon]);
  console.log(selectedIcon);

  const getIcons = async () => {
    const result = await lampostAPI.get('/icons');
    const { icons } = result.data;
    setIcons(() => {
      const table = {};
      icons.forEach((icon) => {
        table[icon._id] = icon;
      });
      return table;
    });
    setIsIconsFetched(true);
  };

  useEffect(() => {
    getIcons();
  }, []);

  const renderIcons = () => {
    const list = Object.values(icons).map((icon, index) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: rnDefaultBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setSelectedIcon(icon);
            }}
          >
            <FastImage source={{ uri: icon.url }} style={{ width: 35, height: 35 }} tintColor={'black'} />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{list}</View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {selectedIcon ? (
        <View
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: rnDefaultBackgroundColor,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <FastImage source={{ uri: selectedIcon.url }} style={{ width: 80, height: 80 }} tintColor={'black'} />
        </View>
      ) : null}
      {isIconsFetched ? renderIcons() : <ActivityIndicator />}
    </View>
  );
};

export default Container;
