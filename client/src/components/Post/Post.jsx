// main libraries
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform } from 'react-native';

const Post = () => {
  console.log('post is rendered');
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
