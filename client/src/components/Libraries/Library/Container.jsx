import React, { useContext, useRef } from 'react';
import LibraryContext from './LibraryContext';
import { View, Text, TouchableOpacity } from 'react-native';
import RollsContext from '../RollsContext';

import AppMenuBottomSheet from './AppMenuBottomSheet';

const Container = (props) => {
  const appMenuBottomSheetRef = useRef(null);

  return (
    // <LibraryContext.Provider>
    <View style={{ flex: 1 }}>
      <Text>{props.route.params.libraryId}</Text>
      <TouchableOpacity>
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Join</Text>
      </TouchableOpacity>
      {/* <AppMenuBottomSheet appMenuBottomSheetRef={appMenuBottomSheetRef}/> */}
    </View>

    // {/* </LibraryContext.Provider> */}
  );
};

export default Container;
