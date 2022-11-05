import React from 'react';
import { View, Text } from 'react-native';

const WhiteSquares = () => {
  const squares = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  const render = () => {
    const list = squares.map((element, index) => {
      return (
        <View
          key={index}
          style={{ height: 20, width: 20, backgroundColor: 'rgb(231, 231, 231)', marginRight: 10 }}
        ></View>
      );
    });

    return <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{list}</View>;
  };
  return <View style={{ height: 40, backgroundColor: 'rgb(64, 64, 64)', justifyContent: 'center' }}>{render()}</View>;
};

const Roll = (props) => {
  return (
    <View>
      <WhiteSquares />
      <View style={{ height: 100 }}></View>
      <WhiteSquares />
    </View>
  );
};

export default Roll;
