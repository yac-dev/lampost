import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const Tabs = () => {
  return (
    <ScrollView horizontal={true} style={{ flexDirection: 'row', marginBottom: 10 }}>
      <TouchableOpacity>
        <Text>Food & Beverage</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Gamings</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Tech</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sports</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Music</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Tabs;
