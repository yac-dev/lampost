// main libraries
import React from 'react';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';

const ModalContainer = (props) => {
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
};

export default withTheme(ModalContainer);
