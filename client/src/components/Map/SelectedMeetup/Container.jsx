// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

import Header from './Header';
import ActionButtons from './ActionButtons';
import Menus from './Menus';
import Tab from './Tab';
import About from './About';
import LocationDetail from './LocationDetail';
import QandA from './QandA/Container';
// import QandA from './QandA';

const Container = (props) => {
  const [component, setComponent] = useState('about');
  const snapPoints = ['60%', '85%'];

  const onSelectedItemBottomSheetClose = () => {
    if (props.bottomSheet.selectedItem.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
    }
  };

  const switchComponent = () => {
    switch (component) {
      case 'about':
        return (
          <View>
            <Header component={component} setComponent={setComponent} />
            <ActionButtons navigation={props.navigation} />
            <Menus
              navigation={props.navigation}
              handleselectedMeetupDetailBottomSheetChanges={props.handleselectedMeetupDetailBottomSheetChanges}
            />
            {/* <Tab component={component} setComponent={setComponent} /> */}
            {/* <About navigation={props.navigation} /> */}
            {/* {switchComponent()} */}
          </View>
        );
      // case 'locationDetail':
      //   return <LocationDetail />;
      case 'qAndA':
        return <QandA />;
      default:
        return null;
    }
  };

  const renderSelectedMeetup = () => {
    if (props.selectedMeetup) {
      return (
        // <View>
        //   <Header component={component} setComponent={setComponent} />
        //   <ActionButtons navigation={props.navigation} />
        //   <Tab component={component} setComponent={setComponent} />
        //   <About />
        //   {switchComponent()}
        // </View>
        <>{switchComponent()}</>
      );
    } else {
      return (
        <View>
          <Text>Now Loading...</Text>
        </View>
      );
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.selectedItemBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      keyboardBehavior={'interactive'}
      onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>{renderSelectedMeetup()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsSelectedItemBottomSheetOpen })(Container);
