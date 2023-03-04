import { iconsTable } from './icons';
import { iconColorsTable } from './colorsTable';
const { MaterialCommunityIcons, Entypo, Fontisto, Foundation, AntDesign } = iconsTable;

const socialMediasList = {
  youtube: {
    type: 'Youtube',
    icon: <AntDesign name='youtube' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  discord: {
    type: 'Discord',
    icon: (
      <MaterialCommunityIcons size={25} name='discord' color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />
    ),
  },
  pinterest: {
    type: 'Pinterest',
    icon: <Entypo name='pinterest-with-circle' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  snapchat: {
    type: 'Snapchat',
    icon: <Fontisto name='snapchat' size={25} color={iconColorsTable['yellow1']} style={{ marginRight: 10 }} />,
  },
  flickr: {
    type: 'Flickr',
    icon: <Entypo name='flickr' size={25} color={iconColorsTable['blue1']} style={{ marginRight: 10 }} />,
  },
  stackoverflow: {
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
  patreon: {
    type: 'Patreon',
    icon: (
      <MaterialCommunityIcons name='patreon' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />
    ),
  },

  twitch: {
    type: 'Twitch',
    icon: <Fontisto name='twitch' size={25} color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />,
  },
  spotify: {
    type: 'Spotify',
    icon: <Entypo name='spotify' size={25} color={iconColorsTable['green1']} style={{ marginRight: 10 }} />,
  },

  playstationNetwork: {
    type: 'Playstation Network',
    icon: <Fontisto name='playstation' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  nintendo: {
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
  github: {
    type: 'Github',
    icon: <AntDesign name='github' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />,
  },

  productHunt: {
    type: 'Product Hunt',
    icon: <Fontisto name='product-hunt' size={25} color={iconColorsTable['orange1']} style={{ marginRight: 10 }} />,
  },
  xbox: {
    type: 'Xbox',
    icon: <Fontisto name='xbox' size={25} color={iconColorsTable['lightGreen1']} style={{ marginRight: 10 }} />,
  },

  meetup: {
    type: 'Meetup',
    icon: <Fontisto name='meetup' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  uber: {
    type: 'Uber',
    icon: <Fontisto name='uber' size={25} color={iconColorsTable['lightGreen1']} style={{ marginRight: 10 }} />,
  },
  dribbble: {
    type: 'Dribbble',
    icon: <AntDesign name='dribbble' size={25} color={iconColorsTable['pink1']} style={{ marginRight: 10 }} />,
  },
  instagram: {
    type: 'Instagram',
    icon: <AntDesign name='instagram' size={25} color={iconColorsTable['violet1']} style={{ marginRight: 10 }} />,
  },
  twitter: {
    type: 'Twitter',
    icon: <AntDesign name='twitter' size={25} color={iconColorsTable['lightBlue1']} style={{ marginRight: 10 }} />,
  },
  reddit: {
    type: 'Reddit',
    icon: <Fontisto name='reddit' size={25} color={iconColorsTable['orange1']} style={{ marginRight: 10 }} />,
  },
  quora: {
    type: 'Quora',
    icon: <MaterialCommunityIcons name='quora' size={25} color={iconColorsTable['red1']} style={{ marginRight: 10 }} />,
  },
  facebook: {
    type: 'Facebook',
    icon: <Entypo name='facebook' size={25} color={iconColorsTable['blue1']} style={{ marginRight: 10 }} />,
  },
  medium: {
    type: 'Medium',
    icon: <Fontisto name='medium' size={25} color={iconColorsTable['grey1']} style={{ marginRight: 10 }} />,
  },
  other: {
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
};

export default socialMediasList;
