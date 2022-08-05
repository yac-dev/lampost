// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Platform, View, StatusBar, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

// rnelements
// import { Button, ButtonGroup, withTheme } from '@rneui/themed';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Icon } from 'react-native-elements';

// ac
import { countUp } from '../../redux/actionCreators/dummy';

const Map = (props) => {
  const [region, setRegion] = useState(null);
  const [a, d] = useState(null);

  return (
    <>
      {/* <Text style={styles.textStyle}>Here is the map component</Text> */}
      <View style={styles.container}>
        <MapView style={styles.map}>
          {/* <Button
            title='Log in'
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 10,
            }}
            onPress={() => {
              props.navigation.navigate('Post', { name: 'Jane' });
            }}
          /> */}
          {/* <Button icon={<Icon name='mail' size={50} type='entypo' color='white' />} iconRight style={styles.button} /> */}

          {/* <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 85, zIndex: 10 }}
            onPress={() => props.navigation.navigate('SignUp')}
          >
            <Icon color='#f50' name='login' />
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 100, zIndex: 10 }}
            onPress={() => props.navigation.navigate('LogIn')}
            onPress={() => props.countUp()}
          >
            <Text>Log in</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Hello</Text> */}
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    position: 'absolute',
    right: 100,
    top: 400,
  },
  button: {
    position: 'absolute',
    right: 60,
    top: 70,
    size: 50,
  },
  button2: {
    position: 'absolute',
    right: 60,
    top: 90,
    size: 50,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default connect(null, { countUp })(Map);
