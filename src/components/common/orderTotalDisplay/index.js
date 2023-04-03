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
  Grid,
  GridItem,
} from "@chakra-ui/react";

const OrderTotalDisplay = ({ order }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const total = order.reduce((partialSum, a) => partialSum + a.price * a.quantity, 0);

  return (
    <Flex flexDirection="column" justify="center" py="0.5em" border="solid 1px" borderColor="grey.100" rounded="md" boxShadow="lg">
      <Box mt={2} mx="auto">
        <Text fontSize="1.5rem"><b>Total: </b>${total.toFixed(2)}</Text>
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
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
              <Text textStyle="body2Semi">Confirm Your Order</Text>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(3, 1fr)' gap={0}>
              <GridItem>
                <Text textStyle="body3Semi">Item</Text>
              </GridItem>
              <GridItem>
                <Text textStyle="body3Semi">Price</Text>
              </GridItem>
              <GridItem>
                <Text textStyle="body3Semi">Quantity</Text>
              </GridItem>
            </Grid>
            {
              order.map(
                menuItem => 
                <Grid templateColumns='repeat(3, 1fr)' gap={0}>
                  <GridItem>
                    <Text textStyle="body3">{menuItem.name}</Text>
                  </GridItem>
                  <GridItem>
                    <Text textStyle="body3">{menuItem.price}</Text>
                  </GridItem>
                  <GridItem>
                    <Text textStyle="body3">{menuItem.quantity}</Text>
                  </GridItem>
                </Grid>
              )
            }
            <Flex justify='space-between' pt={7}>
              <Text textStyle="body2Semi">Order Total:</Text>
              <Text textStyle="body2">${total.toFixed(2)}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Confirm
            </Button>
            <Button colorScheme="primary" variant='outline' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default OrderTotalDisplay;