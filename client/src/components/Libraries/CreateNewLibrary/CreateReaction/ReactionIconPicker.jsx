import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import { baseBackgroundColor, inputBackgroundColorNew, disabledTextColor } from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';

const ReactionIconPicker = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 6;
  const [selectedReactionIcon, setSelectedReactionIcon] = useState(null);
  const [reactionIcons, setReactionIcons] = useState([]);
  const [isFetchedReactionIcons, setIsFetchedReactionIcons] = useState(false);

  const getReactionIcons = async () => {
    const result = await lampostAPI.get('/reactionicons');
    const { reactionIcons } = result.data;
    setReactionIcons(reactionIcons);
    setIsFetchedReactionIcons(true);
  };

  useEffect(() => {
    getReactionIcons();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() =>
            props.navigation.navigate({ name: 'Create new library', params: { selectedReactionIcon }, merge: true })
          }
          disabled={selectedReactionIcon ? false : true}
        >
          <Text
            style={{
              color: selectedReactionIcon ? 'white' : disabledTextColor,
              fontSize: 20,
              fontWeight: selectedReactionIcon ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedReactionIcon]);

  const renderReactionIcons = () => {
    const list = reactionIcons.map((reactionIcon, index) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setSelectedReactionIcon(reactionIcon);
            }}
          >
            <FastImage source={{ uri: reactionIcon.url }} style={{ width: 35, height: 35 }} />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {isFetchedReactionIcons ? (
        <View>
          {selectedReactionIcon ? (
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: inputBackgroundColorNew,
                borderRadius: 8,
                marginTop: 10,
                marginBottom: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FastImage source={{ uri: selectedReactionIcon.url }} style={{ width: 35, height: 35 }} />
            </View>
          ) : null}
          {renderReactionIcons()}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default ReactionIconPicker;
