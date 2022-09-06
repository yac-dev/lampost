// main libraries
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Menu, Button } from 'react-native-paper';

const meetupGenreOptions = [
  {
    id: '63033746c16e5130852c3745',
    value: '🍺 Bar',
    icon: '🍺',
  },
  {
    id: '63033746c16e5130852c3746',
    value: '☕️ Coffee',
    icon: '☕️',
  },
  {
    id: '63033746c16e5130852c3747',
    value: '🍣 Food',
    icon: '🍣',
  },
  {
    id: '63033746c16e5130852c3748',
    value: '🍰 Sweets',
    icon: '🍰',
  },
  {
    id: '63033746c16e5130852c3749',
    value: '🥕 Vegetarian',
    icon: '🥕',
  },
  {
    id: '63033746c16e5130852c374a',
    value: '🍳 Cooking',
    icon: '🍳',
  },
  {
    id: '63033746c16e5130852c374b',
    value: '🍖 BBQ',
    icon: '🍖',
  },
  {
    id: '63033746c16e5130852c374c',
    value: '⛺️ Camp',
    icon: '⛺️',
  },
  {
    id: '63033746c16e5130852c374d',
    value: '🏀 Basketball',
    icon: '🏀',
  },
  {
    id: '63033746c16e5130852c374e',
    value: '🎾 Tennis',
    icon: '🎾',
  },
  {
    id: '63033746c16e5130852c374f',
    value: '🏓 Ping pong',
    icon: '🏓',
  },
  {
    id: '63033746c16e5130852c3750',
    value: '🏐 Volleyball',
    icon: '🏐',
  },
  {
    id: '63033746c16e5130852c3751',
    value: '🏸 Badminton',
    icon: '🏸',
  },
  {
    id: '63033746c16e5130852c3752',
    value: '🥊 Boxing',
    icon: '🥊',
  },
  {
    id: '63033746c16e5130852c3753',
    value: '⛳️ Golf',
    icon: '⛳️',
  },
  {
    id: '63033746c16e5130852c3754',
    value: '🥋 Martial arts',
    icon: '🥋',
  },
  {
    id: '63033746c16e5130852c3755',
    value: '🏂 Snowboard',
    icon: '🏂',
  },
  {
    id: '63033746c16e5130852c3756',
    value: '⛷ Ski',
    icon: '⛷',
  },
  {
    id: '63033746c16e5130852c3757',
    value: '⛸ Ice skate',
    icon: '⛸',
  },
  {
    id: '63033746c16e5130852c3758',
    value: '🏄‍♂️ Surf',
    icon: '🏄‍♂️',
  },
  {
    id: '63033746c16e5130852c3759',
    value: '💪 Workout',
    icon: '💪',
  },
  {
    id: '63033746c16e5130852c375a',
    value: '🏃‍♀️ Running',
    icon: '🏃‍♀️',
  },
  {
    id: '63033746c16e5130852c375b',
    value: '🧘‍♀️ Yoga',
    icon: '🧘‍♀️',
  },
  {
    id: '63033746c16e5130852c375c',
    value: '💃 Dance',
    icon: '💃',
  },
  {
    id: '63033746c16e5130852c375d',
    value: '🛹 Street',
    icon: '🛹',
  },
  {
    id: '63033746c16e5130852c375e',
    value: '🎣 Fishing',
    icon: '🎣',
  },
  {
    id: '63033746c16e5130852c375f',
    value: '🗻 Hiking',
    icon: '🗻',
  },
  {
    id: '63033746c16e5130852c3760',
    value: '🪂 Adrenaline junkie',
    icon: '🪂',
  },
  {
    id: '63033746c16e5130852c3761',
    value: '🏟 Watching game',
    icon: '🏟',
  },
  {
    id: '63033746c16e5130852c3762',
    value: '🏖 Beach',
    icon: '🏖',
  },
  {
    id: '63033746c16e5130852c3763',
    value: '🚴‍♂️ Cycling',
    icon: '🚴‍♂️',
  },
  {
    id: '63033746c16e5130852c3764',
    value: '🏍 Motorcycle',
    icon: '🏍',
  },
  {
    id: '63033746c16e5130852c3765',
    value: '🚘 Car',
    icon: '🚘',
  },
  {
    id: '63033746c16e5130852c3766',
    value: '🧥 Fashion',
    icon: '🧥',
  },
  {
    id: '63033746c16e5130852c3767',
    value: '🛍 Shopping',
    icon: '🛍',
  },
  {
    id: '63033746c16e5130852c3768',
    value: '✈️ Travel',
    icon: '✈️',
  },
  {
    id: '63033746c16e5130852c3769',
    value: '💻 Tech',
    icon: '💻',
  },
  {
    id: '63033746c16e5130852c376a',
    value: '📷 Photography',
    icon: '📷',
  },
  {
    id: '63033746c16e5130852c376b',
    value: '🎬 YouTube',
    icon: '🎬',
  },
  {
    id: '63033746c16e5130852c376c',
    value: '🖼 Art',
    icon: '🖼',
  },
  {
    id: '63033746c16e5130852c376d',
    value: '🎨 Painting',
    icon: '🎨',
  },
  {
    id: '63033746c16e5130852c376e',
    value: '✍️ Drawing',
    icon: '✍️',
  },
  {
    id: '63033746c16e5130852c376f',
    value: '✍️ Juggling',
    icon: '🤹',
  },
  {
    id: '63033746c16e5130852c3770',
    value: '🥷 Cosplay',
    icon: '🥷',
  },
  {
    id: '63033746c16e5130852c3771',
    value: '🍥 Anime',
    icon: '🍥',
  },
  {
    id: '63033746c16e5130852c3772',
    value: '🍿 Movie',
    icon: '🍿',
  },
  {
    id: '63033746c16e5130852c3773',
    value: '🎮 Video game',
    icon: '🎮',
  },
  {
    id: '63033746c16e5130852c3774',
    value: '🎲 Board game',
    icon: '🎲',
  },
  {
    id: '63033746c16e5130852c3775',
    value: '♟ Chess',
    icon: '♟',
  },
  {
    id: '63033746c16e5130852c3776',
    value: '☖ Shogi',
    icon: '☖',
  },
  {
    id: '63033746c16e5130852c3777',
    value: '🃏 Tramp',
    icon: '🃏',
  },
  {
    id: '63033746c16e5130852c3778',
    value: '🪀 Toy',
    icon: '🪀',
  },
  {
    id: '63033746c16e5130852c3779',
    value: '🎯 Darts',
    icon: '🎯',
  },
  {
    id: '63033746c16e5130852c377a',
    value: '🂠 Trading Card',
    icon: '🂠',
  },
  {
    id: '63033746c16e5130852c377b',
    value: '🎳 Bowling',
    icon: '🎳',
  },
  {
    id: '63033746c16e5130852c377c',
    value: '🏺 Pottery',
    icon: '🏺',
  },
  {
    id: '63033746c16e5130852c377d',
    value: '🎤 Karaoke',
    icon: '🎤',
  },
  {
    id: '63033746c16e5130852c377e',
    value: '🎵 Live',
    icon: '🎵 ',
  },
  {
    id: '63033746c16e5130852c377f',
    value: '🎧 Listening music',
    icon: '🎧',
  },
  {
    id: '63033746c16e5130852c3780',
    value: '🎹 Playing music',
    icon: '🎹',
  },
  {
    id: '63033746c16e5130852c3781',
    value: '🎸 Guitar',
    icon: '🎸',
  },
  {
    id: '63033746c16e5130852c3782',
    value: '🛠 DIY',
    icon: '🛠',
  },
  {
    id: '63033746c16e5130852c3783',
    value: '🪴 Gardening',
    icon: '🪴',
  },
  {
    id: '63033746c16e5130852c3784',
    value: '📚 Reading',
    icon: '📚',
  },
  {
    id: '63033746c16e5130852c3785',
    value: '👨‍👩‍👧‍👦 Family',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: '63033746c16e5130852c3786',
    value: '🎡 Amusement park',
    icon: '🎡',
  },
  {
    id: '63033746c16e5130852c3787',
    value: '🐧 Aquarium',
    icon: '🐧',
  },
  {
    id: '63033746c16e5130852c3788',
    value: '🦒 Zoo',
    icon: '🦒',
  },
  {
    id: '63033746c16e5130852c3789',
    value: '🐶 Pet',
    icon: '🐶',
  },
  {
    id: '63033746c16e5130852c378a',
    value: '🧑‍🏫 Teaching',
    icon: '🧑‍🏫',
  },
  {
    id: '63033746c16e5130852c378b',
    value: '🦄 Start up',
    icon: '🦄',
  },
  {
    id: '63033746c16e5130852c378c',
    value: '📈 Investment',
    icon: '📈',
  },
  {
    id: '63033746c16e5130852c378d',
    value: '🗿 Foreign culture',
    icon: '🗿',
  },
  {
    id: '63033746c16e5130852c378e',
    value: '🌎 Language',
    icon: '🌎',
  },
  {
    id: '63033746c16e5130852c378f',
    value: '🧹 Volunteer',
    icon: '🧹',
  },
];

const MeetupGenreMenu = (props) => {
  const [isMeetupMenuVisible, setIsMeetupMenuVisible] = useState(false);

  const renderMeetupGenreMenu = (meetupGenresIndex) => {
    const options = meetupGenreOptions.map((optionObject, optionIndex) => {
      return (
        <Menu.Item
          key={optionIndex}
          // leadingIcon={meetupType.icon}
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
