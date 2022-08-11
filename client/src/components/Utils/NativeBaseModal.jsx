import React from 'react';
import { Text } from 'react-native';
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider } from 'native-base';
import NBProvider from './NativeBaseProvider';

const BaseModal = () => {
  return (
    <NBProvider>
      <Center flex={1} px='3'>
        <Center>
          <Modal isOpen={props.modalOpen} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth='400px'>
              <Modal.CloseButton />
              <Modal.Header>{props.title}</Modal.Header>
              <Modal.Body>
                <Text>{props.description}</Text>
                {/* <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input />
                </FormControl>
                <FormControl mt='3'>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input />
                </FormControl> */}
                {children}
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant='ghost'
                    colorScheme='blueGray'
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    Done
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
        ;
      </Center>
    </NBProvider>
  );
};

export default BaseModal;
