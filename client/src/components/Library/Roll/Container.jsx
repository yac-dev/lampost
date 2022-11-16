import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

const dummy = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

const Container = (props) => {
  const renderDummy = () => {
    const list = dummy.map((el, index) => {
      return (
        <View key={index} style={{ width: '50%', aspectRatio: 1, backgroundColor: 'red', padding: 5 }}>
          <View style={{ backgroundColor: 'blue', width: '100%', height: '100%' }} />
        </View>
      );
    });

    return (
      <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'green' }}>{list}</View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* <View style={{ width: '33%' }}></View> */}
      {/* <FlatList
        data={dummy}
        // renderItem={this.renderItem}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: 'blue', marginRight: 10, aspectRatio: 1 }}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
      /> */}
      <ScrollView>{renderDummy()}</ScrollView>
    </View>
  );
};

export default Container;
