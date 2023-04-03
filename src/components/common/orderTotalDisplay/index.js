import React, { useState, useEffect } from "react";
import { 
  Box, Text, Flex, Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const OrderTotalDisplay = ({ order }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const total = order.reduce((partialSum, a) => partialSum + a.price * a.quantity, 0);

  return (
    <Flex flexDirection="column" justify="center" py="0.5em" border="solid 1px" borderColor="grey.100" rounded="md" boxShadow="lg">
      <Box mt={2} mx="auto">
        <Text fontSize="1.5rem"><b>Total: </b>${total}</Text>
      </Box>
      <Box fontSize="1.2rem" my={2} mx="auto">
        <Button 
          onClick={() => onOpen()}
          size="lg"
          fontSize="lg"
          variant="solid"
          colorScheme="primary"
          boxShadow="0 4px 7px rgb(79 114 205 / 40%)"
        >
          View Order
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Confirm Your Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              order.map(
                menuItem => 
                <Box>
                  {menuItem.name} | {menuItem.price} | {menuItem.quantity}
                </Box>
              )
            }
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default OrderTotalDisplay;