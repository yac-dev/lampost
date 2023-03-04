import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import GlobalContext from '../../GlobalContext';
import lampostAPI from '../../apis/lampost';
import {
  screenSectionBackgroundColor,
  iconColorsTable,
  baseBackgroundColor,
  baseTextColor,
  inputBackgroundColor,
  backgroundColorsTable,
  disabledTextColor,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
import LoadingSpinner from '../Utils/LoadingSpinner';

const { MaterialCommunityIcons, Ionicons, AntDesign, Fontisto, Entypo, Foundation } = iconsTable;

const socialMediasList = [
  {
    type: 'Youtube',
    icon: <AntDesign name='youtube' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Discord',
    icon: (
      <MaterialCommunityIcons size={25} name='discord' color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />
    ),
  },

  {
    type: 'Pinterest',
    icon: <Entypo name='pinterest-with-circle' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Snapchat',
    icon: <Fontisto name='snapchat' size={25} color={iconColorsTable['yellow1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Flickr',
    icon: <Entypo name='flickr' size={25} color={iconColorsTable['blue1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Stackoverflow',
    icon: (
      <Foundation
        name='social-stack-overflow'
        size={25}
        color={iconColorsTable['orange1']}
        style={{ marginRight: 10 }}
      />
    ),
  },
  {
    type: 'Patreon',
    icon: (
      <MaterialCommunityIcons name='patreon' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />
    ),
  },

  {
    type: 'Twitch',
    icon: <Fontisto name='twitch' size={25} color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Spotify',
    icon: <Entypo name='spotify' size={25} color={iconColorsTable['green1']} style={{ marginRight: 10 }} />,
  },

  {
    type: 'Playstation Network',
    icon: <Fontisto name='playstation' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Nintendo',
    icon: (
      <MaterialCommunityIcons
        name='nintendo-switch'
        size={25}
        color={iconColorsTable['red1']}
        style={{ marginRight: 10 }}
      />
    ),
  },
  {
    type: 'Github',
    icon: <AntDesign name='github' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />,
  },

  {
    type: 'Product Hunt',
    icon: <Fontisto name='product-hunt' size={25} color={iconColorsTable['orange1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Xbox',
    icon: <Fontisto name='xbox' size={25} color={iconColorsTable['lightGreen1']} style={{ marginRight: 10 }} />,
  },

  {
    type: 'Meetup',
    icon: <Fontisto name='meetup' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Uber',
    icon: <Fontisto name='uber' size={25} color={iconColorsTable['lightGreen1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Dribbble',
    icon: <AntDesign name='dribbble' size={25} color={iconColorsTable['pink1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Instagram',
    icon: <AntDesign name='instagram' size={25} color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Twitter',
    icon: <AntDesign name='twitter' size={25} color={iconColorsTable['lightBlue1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Reddit',
    icon: <Fontisto name='reddit' size={25} color={iconColorsTable['orange1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Quora',
    icon: <MaterialCommunityIcons name='quora' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Facebook',
    icon: <Entypo name='facebook' size={25} color={iconColorsTable['blue1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Medium',
    icon: <Fontisto name='medium' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />,
  },
  {
    type: 'Other',
    icon: (
      <MaterialCommunityIcons
        name='link-variant'
        size={25}
        color={iconColorsTable['grey1']}
        style={{ marginRight: 10 }}
      />
    ),
  },
];

const AddLink = (props) => {
  const { auth, setLoading } = useContext(GlobalContext);
  const [linkObject, setLinkObject] = useState({ type: '', name: '', url: '' });

  const onDonePress = async () => {
    setLoading(true);
    const result = await lampostAPI.post(`/badgeanduserrelationships/${props.route.params.badgeId}/${auth.data._id}`);
    const { linkObject } = result.data;
    setLoading(false);
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    // setMyBadges(props.route.params.myBadges);
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={!linkObject.type || !linkObject.name || !linkObject.url ? true : false}
        >
          <Text
            style={{
              color: !linkObject.type || !linkObject.name || !linkObject.url ? disabledTextColor : 'white',
              fontSize: 20,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [linkObject]);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['grey1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='link-variant' color={iconColorsTable['grey1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Link</Text>
        </View>
      </View>
      <Text style={{ color: baseTextColor, marginBottom: 15 }}>
        Select a link type, give it a link name and the URL.
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Link type</Text>
        <FlatList
          // 気をつけような。viewで囲わなきゃいけないの。scrollviewもそうだったが。
          // contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          data={socialMediasList}
          // numColumns={3}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ paddingTop: 10, marginRight: 15, paddingBottom: 10 }}
                onPress={() => {
                  setLinkObject((previous) => {
                    const updating = { ...previous };
                    updating['type'] = item.type;
                    return updating;
                  });
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: screenSectionBackgroundColor,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}
                >
                  {item.icon}
                  <Text style={{ color: 'white' }}>{item.type}</Text>
                </View>
                {item.type === linkObject.type ? (
                  <View style={{ position: 'absolute', top: 5, right: -5 }}>
                    <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          }}
          horizontal={true}
          keyExtractor={(item, index) => `${item.type}-${index}`}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>Link name</Text>
        <TextInput
          placeholder='e.g.) My youtube channel'
          placeholderTextColor={baseTextColor}
          style={{ borderRadius: 5, padding: 10, backgroundColor: inputBackgroundColor, color: 'white' }}
          value={linkObject.name}
          autoCapitalize='none'
          onChangeText={(text) =>
            setLinkObject((previous) => {
              return {
                ...previous,
                name: text,
              };
            })
          }
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold' }}>URL</Text>
        <TextInput
          placeholder='e.g.) https://youtube/@mychannel'
          placeholderTextColor={baseTextColor}
          style={{ borderRadius: 5, padding: 10, backgroundColor: inputBackgroundColor, color: 'white' }}
          value={linkObject.url}
          autoCapitalize='none'
          onChangeText={(text) =>
            setLinkObject((previous) => {
              return {
                ...previous,
                url: text,
              };
            })
          }
        />
      </View>
    </View>
  );
};

export default AddLink;
