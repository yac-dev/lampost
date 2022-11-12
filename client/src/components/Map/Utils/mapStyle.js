export const mapStyle = [
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },

  {
    featureType: 'administrative.country',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },

  {
    featureType: 'administrative.province',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },

  {
    featureType: 'administrative.locality',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },

  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [
      {
        color: '#172F51',
      },
    ],
  },

  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 30,
      },
      {
        saturation: '9',
      },
      {
        color: '#29446b',
        // color: '641860',
      },
    ],
  },

  // 海の色
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        lightness: -20,
        color: '#0B1673',
      },
    ],
  },
];
