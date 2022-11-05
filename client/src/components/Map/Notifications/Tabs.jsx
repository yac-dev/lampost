import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Messages from './Messages';
import Launchers from './Launchers';

const renderScene = SceneMap({
  first: Messages,
  second: Launchers,
});

const Tabs = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // initialLayout={{ width: layout.width }}
    />
  );
};

export default Tabs;
