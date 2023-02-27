import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View>
      <Video
        ref={video}
        style={{ width: 100, height: 100 }}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode='contain'
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
        />
      </View>
    </View>
  );
}
