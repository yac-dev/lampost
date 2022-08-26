// main libraries
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform, ImageBackground, Image } from 'react-native';
// import ExpoPixi, { PIXI } from 'expo-pixi';

// const SOURCE = { uri: 'http://quran.ksu.edu.sa/warsh/77.png' };

// const colorMatrix = [
//   { name: 'reset' },
//   {
//     name: 'brightness',
//     tools: [{ type: 'number', min: 0, max: 1, standard: 0.3 }],
//   },
//   {
//     name: 'greyscale',
//     tools: [{ type: 'number', min: 0, max: 1, standard: 0.6 }],
//   },
//   { name: 'blackAndWhite' },
//   { name: 'hue', tools: [{ type: 'number', min: 0, max: 360, standard: 180 }] },
//   {
//     name: 'contrast',
//     tools: [{ type: 'number', min: 0, max: 1, standard: 0.8 }],
//   },
//   {
//     name: 'saturate',
//     tools: [{ type: 'number', min: 0, max: 1, standard: 0.8 }],
//   },
//   { name: 'desaturate' },
//   { name: 'negative' },
//   { name: 'sepia' },
//   { name: 'technicolor', tools: [{ type: 'boolean', standard: true }] },
//   { name: 'polaroid' },
//   { name: 'toBGR' },
//   { name: 'kodachrome', tools: [{ type: 'boolean', standard: true }] },
//   { name: 'browni', tools: [{ type: 'boolean', standard: true }] },
//   { name: 'vintage', tools: [{ type: 'boolean', standard: true }] },
//   {
//     name: 'colorTone',
//     tools: [
//       { type: 'number', min: 0, max: 1, standard: 0.5 },
//       { type: 'number', min: 0, max: 1, standard: 0.5 },
//       { type: 'color', standard: 0xff0000 },
//       { type: 'color', standard: 0x000011 },
//     ],
//   },
//   { name: 'night', tools: [{ type: 'number', min: 0, max: 1, standard: 0.5 }] },
//   {
//     name: 'predator',
//     tools: [{ type: 'number', min: 0, max: 1, standard: 0.5 }],
//   },
//   { name: 'lsd' },
// ];

// const filters = [
//   new PIXI.filters.ColorReplaceFilter(0x000000, 0xff0000),
//   new PIXI.filters.DotFilter(0.5),
//   new PIXI.filters.EmbossFilter(),
//   new PIXI.filters.PixelateFilter(),
//   new PIXI.filters.CrossHatchFilter(),
//   new PIXI.filters.NoiseFilter(),
//   new PIXI.filters.OldFilmFilter(),
//   new PIXI.filters.RGBSplitFilter(),

//   new PIXI.filters.GlowFilter(30, 2, 0.5, 0xff0000),
//   new PIXI.filters.BulgePinchFilter([0.5, 0.2], 300, 1),
//   new PIXI.filters.MotionBlurFilter([54, 40], 15, 0),
//   new PIXI.filters.DropShadowFilter(),
//   new PIXI.filters.RadialBlurFilter(45, [(width * scale) / 2, (height * scale) / 2], 8, width),
//   new PIXI.filters.AdvancedBloomFilter(),
//   new PIXI.filters.BlurFilter(),
//   new PIXI.filters.TwistFilter(400, 4, 20),
//   new PIXI.filters.BloomFilter(),
//   new PIXI.filters.OutlineFilter(20, 0x00fc00, 1),
//   new PIXI.filters.ZoomBlurFilter(),

//   // new PIXI.filters.AlphaFilter(),
//   // new PIXI.filters.AsciiFilter(),
//   // new PIXI.filters.ConvolutionFilter(),
//   // new PIXI.filters.DisplacementFilter(),
//   // new PIXI.filters.TiltShiftFilter(),
//   // new PIXI.filters.GodrayFilter(),
//   // new PIXI.filters.SimpleLightmapFilter(),
//   // new PIXI.filters.MultiColorReplaceFilter(),
//   // new PIXI.filters.ShockwaveFilter(),

//   ...parsedColorMatrix,
// ];

const Post = () => {
  // useEffect(() => {
  //   const filter = (filters) => {
  //     const output = new PIXI.filters.ColorMatrixFilter();
  //     if (Array.isArray(filters)) {
  //       filters.map((item) => {
  //         if (typeof item === 'string') {
  //           output[item]();
  //         } else {
  //           const { name, props } = item;
  //           output[name](...props);
  //         }
  //       });
  //     } else {
  //       return filter([filters]);
  //     }
  //     return output;
  //   };

  //   const parsedColorMatrix = colorMatrix.map(({ name, tools }) => {
  //     return filter({
  //       name: name,
  //       props: (tools || []).map((tool) => tool.standard),
  //     });
  //   });
  // }, []);

  console.log('post is rendered');
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    //   <View style={styles.container}>
    //     <Text>Hello World</Text>
    //   </View>
    // </SafeAreaView>
    <View style={styles.container}>
      <Text>Hello Worlddddddddd</Text>
      <Text>Hello Worlddddddddd</Text>
      <Text>Hello Worlddddddddd</Text>
      <Text>Hello Worlddddddddd</Text>
      <View style={{ position: 'relative' }}>
        {/* <Image style={{ width: 400, height: 300 }} source={require('../../../assets/personalities/result.jpg')} /> */}
        <Text style={{ position: 'absolute', bottom: 20, right: 20, color: 'rgb(242, 72, 5)' }}>'98 12 24</Text>
        {/* <ImageBackground
          source={require('../../../assets/personalities/fam-blurred.jpg')}
          style={{ width: 300, Height: 200 }}
          blurRadius={2}
        > */}
        {/* 'https://i.ibb.co/vJt5HSh/noisy-texture-300x300-o10-d10-c-a82851-t1.png' */}

        {/* <ImageBackground
            source={{ uri: 'https://i.ibb.co/vJt5HSh/noisy-texture-300x300-o10-d10-c-a82851-t1.png' }}
            style={{ width: 350, height: 350 }}
          /> */}
        {/* </ImageBackground> */}
      </View>
      {/* <ExpoPixi.FilterImage source={SOURCE} resizeMode={'cover'} style={styles.image} filters={filters[1]} /> */}
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
