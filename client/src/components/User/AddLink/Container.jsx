import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';
// import LinkBlock from './LinkBlock/Container';
import LinkObject from './LinkObject';

const AddLinksContainer = (props) => {
  const [linkObjects, setLinkObjects] = useState([{ type: '', name: '', url: '' }]);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10 }}>
      <FlatList
        data={linkObjects}
        renderItem={({ item, index }) => {
          return <LinkObject item={item} index={index} linkObjects={linkObjects} setLinkObjects={setLinkObjects} />;
        }}
      />
    </View>
  );
};

export default AddLinksContainer;
