// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';

const ModalContainer = (props) => {
  if (!props.auth.isAuthenticated) {
    return (
      <Portal>
        <Dialog visible={props.modalOpen} style={{ backgroundColor: 'white' }}>
          <Dialog.Content>
            <Text>Please login or signup from top left corner before using.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor='rgb(58, 126, 224)' onPress={() => props.onPressCancel()}>
              Got it
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  } else {
    if (props.modalOpen) {
      return (
        <Portal>
          <Dialog visible={props.modalOpen} style={{ backgroundColor: 'white' }}>
            <Dialog.Content>{props.children}</Dialog.Content>
            <Dialog.Actions>
              <Button textColor='rgb(58, 126, 224)' onPress={() => props.onPressCancel()}>
                Cancel
              </Button>
              <Button textColor='rgb(58, 126, 224)' onPress={() => props.onPressOk()}>
                {props.okText}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      );
    } else {
      return null;
    }
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default withTheme(connect(mapStateToProps, {})(ModalContainer));
