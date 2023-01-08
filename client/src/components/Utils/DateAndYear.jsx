import React from 'react';
import { View, Text } from 'react-native';
import { screenSectionBackgroundColor, baseTextColor } from '../../utils/colorsTable';

const DateAndYear = (props) => {
  const dateString = new Date(props.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const dateElements = dateString.split(',').join('').split(' ');
  return (
    <View
      style={{
        width: 80,
        height: 50,
        borderRadius: 10,
        borderWidth: 0.3,
        marginRight: 15,
        borderColor: screenSectionBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: screenSectionBackgroundColor,
      }}
    >
      <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[2]}</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
        {dateElements[0]}&nbsp;{dateElements[1]}
      </Text>
    </View>
  );
};

export default DateAndYear;
