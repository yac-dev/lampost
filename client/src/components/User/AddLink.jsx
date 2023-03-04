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
    platform: 'youtube',
    label: 'Youtube',
    icon: <AntDesign name='youtube' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'discord',
    label: 'Discord',
    icon: (
      <MaterialCommunityIcons size={25} name='discord' color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />
    ),
  },

  {
    platform: 'pinterest',
    label: 'pinterest',
    icon: <Entypo name='pinterest-with-circle' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'snapchat',
    label: 'Snapchat',
    icon: <Fontisto name='snapchat' size={25} color={iconColorsTable['yellow1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'flickr',
    label: 'Flickr',
    icon: <Entypo name='flickr' size={25} color={iconColorsTable['blue1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'stackoverflow',
    label: 'Stackoverflow',
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
    platform: 'patreon',
    label: 'Patreon',
    icon: (
      <MaterialCommunityIcons name='patreon' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />
    ),
  },

  {
    platform: 'twitch',
    label: 'Twitch',
    icon: <Fontisto name='twitch' size={25} color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'spotify',
    label: 'Spotify',
    icon: <Entypo name='spotify' size={25} color={iconColorsTable['green1']} style={{ marginRight: 10 }} />,
  },

  {
    platform: 'playstationNetwork',
    label: 'Playstation Network',
    icon: <Fontisto name='playstation' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'nintendo',
    label: 'Nintendo',
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
    platform: 'github',
    label: 'Github',
    icon: <AntDesign name='github' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />,
  },

  {
    platform: 'productHunt',
    label: 'Product Hunt',
    icon: <Fontisto name='product-hunt' size={25} color={iconColorsTable['orange1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'xbox',
    label: 'Xbox',
    icon: <Fontisto name='xbox' size={25} color={iconColorsTable['lightGreen1']} style={{ marginRight: 10 }} />,
  },

  {
    platform: 'meetup',
    label: 'Meetup',
    icon: <Fontisto name='meetup' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'uber',
    label: 'Uber',
    icon: <Fontisto name='uber' size={25} color={iconColorsTable['lightGreen1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'dribbble',
    label: 'Dribbble',
    icon: <AntDesign name='dribbble' size={25} color={iconColorsTable['pink1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    icon: <AntDesign name='instagram' size={25} color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'twitter',
    label: 'Twitter',
    icon: <AntDesign name='twitter' size={25} color={iconColorsTable['lightBlue1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'reddit',
    label: 'Reddit',
    icon: <Fontisto name='reddit' size={25} color={iconColorsTable['orange1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'quora',
    label: 'Quora',
    icon: <MaterialCommunityIcons name='quora' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    icon: <Entypo name='facebook' size={25} color={iconColorsTable['blue1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'medium',
    label: 'Medium',
    icon: <Fontisto name='medium' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />,
  },
  {
    platform: 'other',
    label: 'other',
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
  const [linkObject, setLinkObject] = useState({ platform: '', name: '', url: '' });

  const onDonePress = async () => {
    setLoading(true);
    const result = await lampostAPI.patch(
      `/badgeanduserrelationships/link/${props.route.params.badgeId}/${auth.data._id}`,
      { linkObject }
    );
    // const { linkObject } = result.data;
    setLoading(false);
    props.navigation.navigate('Profile', { badgeId: props.route.params.badgeId, linkObject });
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={!linkObject.platform || !linkObject.name || !linkObject.url ? true : false}
        >
          <Text
            style={{
              color: !linkObject.platform || !linkObject.name || !linkObject.url ? disabledTextColor : 'white',
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
        Select a link platform, give it a link name and the URL.
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Platform</Text>
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
                    updating['platform'] = item.platform;
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
                  <Text style={{ color: 'white' }}>{item.label}</Text>
                </View>
                {item.platform === linkObject.platform ? (
                  <View style={{ position: 'absolute', top: 5, right: -5 }}>
                    <Ionicons name='checkmark-circle' size={20} color={iconColorsTable['green1']} />
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          }}
          horizontal={true}
          keyExtractor={(item, index) => `${item.platform}-${index}`}
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
