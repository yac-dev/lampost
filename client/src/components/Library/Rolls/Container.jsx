import React, { useContext } from 'react';
import RollsContext from '../RollsContext';
import { View, Text } from 'react-native';

const Container = () => {
  const { rolls } = useContext(RollsContext);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <View style={{ width: 50, height: 50, padding: 10, borderRadius: 10, borderWidth: 0.3, marginRight: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{dateTable['0']}</Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>{dateTable['1']}</Text>
        {/* <Text style={{ textAlign: 'center' }}>{dateTable['2']}</Text> */}
      </View>
    );
  };

  const renderRolls = () => {
    if (rolls.length) {
      const rollsList = rolls.map((roll, index) => {
        return (
          // <View key={index}>
          //   <Text>{roll.description}</Text>
          // </View>
          <View style={{ borderBottomWidth: 0.3, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              {renderDate(roll.createdAt)}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {/* <FastImage
                  style={{
                    height: 35,
                    width: 35,
                    marginRight: 5,
                    backgroundColor: backgroundColorsTable[meetup.badge.color],
                  }}
                  source={{
                    uri: meetup.badge.icon,
                    priority: FastImage.priority.normal,
                  }}
                  tintColor={iconColorsTable[meetup.badge.color]}
                /> */}
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>{roll.name}</Text>
              </View>
            </View>
            <Text>{roll.description}</Text>
            <View style={{ alignSelf: 'flex-end', marginBottom: 15 }}>
              <Text>Launched by&nbsp;{roll.createdBy.name}</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <Text>👍 21</Text>
            <Text>🤔 3</Text>
            <Text>😂 10</Text>
          </View> */}
          </View>
        );
      });

      return <View>{rollsList}</View>;
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  };

  return <View>{renderRolls()}</View>;
};

export default Container;
