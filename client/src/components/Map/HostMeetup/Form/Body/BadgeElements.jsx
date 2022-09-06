// main libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as AllSolid from '@fortawesome/free-solid-svg-icons';
// import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fab, faCheckSquare, faCoffee);
import Images from '../../../../../../assets/images';

// library.add(fas);

// ac
import { getBadgeElements } from '../../../../../redux/actionCreators/badgeElements';

const BadgeElements = (props) => {
  useEffect(() => {
    props.getBadgeElements();
  }, []);

  const renderBadgeElements = () => {
    if (props.badgeElements.length) {
      const badgeElements = props.badgeElements.map((badgeElement, index) => {
        const { value } = badgeElement;
        const fileName = `icons8-${badgeElement.value}-100.png`;
        return (
          <View key={index}>
            {/* <FontAwesomeIcon style={{ color: 'red' }} size={20} icon={AllSolid.faBagel} /> */}
            {/* <FontAwesomeIcon icon={'apple'} /> */}
            {/* <FontAwesomeIcon icon={['fas', 'apple']} /> */}
            <Text>{badgeElement.value}</Text>
            <Image
              source={Images[badgeElement.value]}
              style={{ tintColor: badgeElement.color, width: 25, height: 25 }}
            />
            {/* <Image
              source={require('../../../../../../assets/badgeElements/icons8-javascript-100-1.png')}
              style={{ tintColor: 'rgb(212, 206, 91)', width: 25, height: 25 }}
            />
            <Image
              source={require('../../../../../../assets/badgeElements/icons8-javascript-100.png')}
              style={{ tintColor: 'rgb(212, 206, 91)', width: 25, height: 25 }}
            /> */}
          </View>
        );
      });

      return <>{badgeElements}</>;
    }
  };

  return <ScrollView style={{ maxHeight: 500, addingBottom: 150 }}>{renderBadgeElements()}</ScrollView>;
};

const mapStateToProps = (state) => {
  return { badgeElements: Object.values(state.badgeElements) };
};

export default connect(mapStateToProps, { getBadgeElements })(BadgeElements);
