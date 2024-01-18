import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Button, } from '@chakra-ui/react';

const CustomModal = ({isOpen, onClose, initialRef, finalRef}) => {
  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={['xs', 'md', 'lg']} colorScheme='teal'>
            <ModalOverlay backdropFilter='blur(8px) hue-rotate(90deg)' />
                <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input ref={initialRef} placeholder='First name' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder='Last name' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
        </Modal>
    </div>
  )
}

export default CustomModal