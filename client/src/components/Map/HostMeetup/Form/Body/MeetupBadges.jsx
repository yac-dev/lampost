import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// import { all } from '../../../../../../assets/images';
import foodAndBeverage from '../../../../../../assets/badgeObjects/foodAndBeverage';
import appsAndProducts from '../../../../../../assets/badgeObjects/appsAndProducts';
// for each badge
const MeetupBadge = (props) => {
  const [selected, setSelected] = useState(false);

  const renderBadge = (tintColor, backgroundColor, textColor = 'black', borderColor = 'rgba(148, 148, 148, 0.85)') => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          borderRadius: 20,
          backgroundColor,
          borderStyle: 'solid',
          borderColor,
          borderWidth: 1,
          padding: 10,
          marginLeft: 5,
          marginTop: 5,
        }}
        onPress={() =>
          setSelected((previousState) => {
            return !previousState;
          })
        }
      >
        <Image source={props.badge.source} style={{ height: 20, width: 20, tintColor: tintColor }} />
        <Text style={{ color: textColor, fontWeight: 'bold', marginLeft: 10 }}>{props.badge.value}</Text>
      </TouchableOpacity>
    );
  };

  if (!selected) {
    return <>{renderBadge(props.badge.color, 'white')}</>;
  } else {
    return <>{renderBadge('white', props.badge.color, 'white', props.badge.color)}</>;
  }
};

const MeetupBadges = () => {
  const renderBadges = (badgeObjects, title) => {
    const badgeObjs = badgeObjects.map((badge) => {
      return <MeetupBadge badge={badge} />;
    });

    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{badgeObjs}</View>
      </View>
    );
  };

  return (
    <View>
      {renderBadges(foodAndBeverage, 'Food & Beverage')}
      {renderBadges(appsAndProducts, 'Apps & Products')}
    </View>
  );
};

export default MeetupBadges;
