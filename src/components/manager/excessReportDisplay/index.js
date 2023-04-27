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

const ExcessReportDisplay = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <Flex flexDirection="column" justify="center" py="0.5em" border="solid 1px" borderColor="grey.100" rounded="md" boxShadow="lg">
      <Box fontSize="1.2rem" my={2} mx="auto">
        <Button 
          onClick={() => onOpen()}
          size="lg"
          fontSize="md"
          variant="solid"
          colorScheme="primary"
          boxShadow="0 4px 7px rgb(79 114 205 / 40%)"
        >
          Excess Report
        </Button>
      </Box>
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

export default ExcessReportDisplay;