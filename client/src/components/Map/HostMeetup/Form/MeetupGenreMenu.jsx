// main libraries
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Menu, Button } from 'react-native-paper';

const meetupGenreOptions = [
  { value: '🍺 Bar', id: '62fa40ebd38fd116e2c9045b', iconName: 'glass-mug-variant' },
  { value: '☕️ Coffee', id: '62f718337f3b648f706bed1d', iconName: 'party-popper' },
  { value: '🍣 Food', id: '62f717c67f3b648f706bed1c', iconName: 'shopping-outline' },
  { value: '🥕 Vegetarian', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '✈️ Travel', id: '62f718627f3b648f706bed1e', iconName: 'airplane' },
  { value: '🖼 Art', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '✍️ Drawing', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🏺 Pottery', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🪀 Toy', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🎬 YouTube', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🂠 Trading Card', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '👨‍👩‍👧‍👦 Family', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🏖 Beach', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🎲 Board game', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🪂 Adrenaline junkie', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🎨 Painting', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🪴 Gardening', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🥋 Martial arts', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🏟 Watching game', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
  { value: '🏀 Ball sports', id: '62f718b17f3b648f706bed20', iconName: 'head-lightbulb' },
  { value: '⛳️ Golf', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '💪 Workout', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🏃‍♀️ Running', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
  { value: '🧘‍♀️ Yoga', id: '62f718c77f3b648f706bed21', iconName: 'soccer-field' },
  { value: '💃 Dance', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🏂 Snow sports', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🏄‍♂️ Surf', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🗻 Hiking', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🚴‍♂️ Cycling', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
  { value: '🚘 Cars', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🏍 Motorcycle', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
  { value: '💻 Tech', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '⛺️ Camp', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
  { value: '📚 Reading', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
  { value: '🛍 Shopping', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎮 Video game', id: '62fa40ebd38fd116e2c9045b', iconName: 'glass-mug-variant' },
  { value: '🍳 Cooking', id: '62f717c67f3b648f706bed1c', iconName: 'shopping-outline' },
  { value: '📷 Photography', id: '62f718337f3b648f706bed1d', iconName: 'party-popper' },
  { value: '🦄 Start up', id: '62f718627f3b648f706bed1e', iconName: 'airplane' },
  { value: '🍖 BBQ & Camp', id: '62f718b17f3b648f706bed20', iconName: 'head-lightbulb' },
  { value: '🍿 Movie', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🎤 Karaoke', id: '62f718f87f3b648f706bed23', iconName: 'image-frame' },
  { value: '🧑‍🏫 Teaching', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🛹 Street sports', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🐧 Aquarium', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🎵 Live', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '👩‍🎤 Anime', id: '62f7190e7f3b648f706bed24', iconName: 'account-tie' },
  { value: '🐶 Pet', id: '62f719207f3b648f706bed25', iconName: 'tennis-ball' },
  { value: '🦒 Zoo', id: '62f719347f3b648f706bed26', iconName: 'weather-lightning-rainy' },
  { value: '🛠 DIY', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎯 Darts', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎧 Listening music', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎹 Playing music', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎸 Guitar', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '♟ Chess', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '☖ Shogi', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎳 Bowling', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '📈 Investment', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🍰 Sweets', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🃏 Tramp', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎡 Amusement park', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🗿 Foreign culture', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🌎 Language', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🧥 Fashion', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🎣 Fishing', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🥷 Cosplay', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
  { value: '🧹 Volunteer', id: '62f7194a7f3b648f706bed27', iconName: 'car-multiple' },
];

const MeetupGenreMenu = (props) => {
  const [isMeetupMenuVisible, setIsMeetupMenuVisible] = useState(false);

  const renderMeetupGenreMenu = (meetupGenresIndex) => {
    const options = meetupGenreOptions.map((optionObject, optionIndex) => {
      return (
        <Menu.Item
          key={optionIndex}
          // leadingIcon={meetupType.iconName}
          onPress={() => {
            // props.setSelectedMeetupType(meetupType);
            props.dispatch({ type: 'SET_MEETUP_GENRES', payload: { optionObject, meetupGenresIndex } });
            setIsMeetupMenuVisible(false);
          }}
          title={optionObject.value}
        />
      );
    });

    return <>{options}</>;
  };

  return (
    <View style={styles.bodyInterests.menu}>
      <Menu
        visible={isMeetupMenuVisible}
        onDismiss={() => setIsMeetupMenuVisible(false)}
        anchor={<Button onPress={() => setIsMeetupMenuVisible(true)}>Select</Button>}
      >
        {renderMeetupGenreMenu(props.index)}
      </Menu>
      <Text style={{ fontSize: 17, textAlign: 'center' }}>{props.meetupGenres[props.index].value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyInterests: {
    marginTop: 30,
    // justifyContent: 'space-between',
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menu: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
});

export default MeetupGenreMenu;
