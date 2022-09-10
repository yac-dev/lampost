// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ac
import { removeSnackBar } from '../../redux/actionCreators/snackBar';

const SnackBar = (props) => {
  if (props.snackBar.isOpen) {
    return (
      <Snackbar
        wrapperStyle={{ top: 0 }}
        style={{ backgroundColor: props.snackBar.barType === 'success' ? 'green' : 'red' }}
        visible={props.snackBar.isOpen}
        onDismiss={() => props.removeSnackBar()}
        action={{
          label: 'Close',
          onPress: () => {
            console.log('snack bar component');
          },
        }}
      >
        {props.snackBar.message}
      </Snackbar>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { snackBar: state.snackBar };
};

export default connect(mapStateToProps, { removeSnackBar })(SnackBar);
