import React from 'react';
import { Text, View } from 'react-native';
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider } from 'native-base';
import NBProvider from './NativeBaseProvider';

const BaseModal = (props) => {
  return (
    <>
      <Text>Hellloooooo</Text>
      <NBProvider>
        <Center px='3'>
          <Center>
            <Modal isOpen={props.modalOpen} onClose={() => props.onClose()}>
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>{props.title}</Modal.Header>
                <Modal.Body>
                  <Text>{props.description}</Text>
                  {/* please select the post type的な感じだな。*/}
                  {/* <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input />
                  </FormControl>
                  <FormControl mt='3'>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                  </FormControl> */}
                  {/* {props.children} */}
                  <View>
                    <Text>Select Genre</Text>
                  </View>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant='ghost'
                      colorScheme='blueGray'
                      onPress={() => {
                        props.onClose();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        props.onClose();
                      }}
                    >
                      Done
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
        </Center>
      </NBProvider>
    </>
  );
};

export default BaseModal;
