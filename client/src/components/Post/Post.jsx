// main libraries
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import React from 'react';

const Post = () => {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    //   <View style={styles.container}>
    //     <Text>Hello World</Text>
    //   </View>
    // </SafeAreaView>
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
