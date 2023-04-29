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

const XReportDisplay = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <Flex flexDirection="column" justify="center" justifyContent="center" alignItems="center" textAlign="center" py="0.5em">
      <Button
        onClick={() => onOpen()}
        size="md" fontSize="md"
        width="75%"
        colorScheme="primary" variant="solid"
        p={3} px="2em"
      >
        X Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
              <Text textStyle="body2Semi">Past Orders</Text>
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
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="primary" onClick={onClose}>
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default XReportDisplay;