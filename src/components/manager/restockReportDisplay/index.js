import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
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
  Input,
  useToast
} from "@chakra-ui/react";
import Database from "../../../data";

const RestockReportDisplay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [minimumQty, setMinimumQty] = useState(5000);
  const [refillItems, setRefillItems] = useState([]);
  const toast = useToast();
  const handleSubmit = async (e) => {
    if (!minimumQty) {
      toast({
        title: "ERROR",
        description: "No minimum value provided.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    e.preventDefault();
    const items = await Database.getRestockReport(minimumQty);
    console.log(items);
    setRefillItems(items);
    onClose();
  };

  return (
    <Flex flexDirection="column" justify="center" justifyContent="center" alignItems="center" textAlign="center" py="0.5em">
      <Button
        onClick={() => onOpen()}
        size="md" fontSize="md"
        width="75%"
        colorScheme="primary" variant="solid"
        p={3} px="2em"
      >
        Restock Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Text textStyle="body2Semi">Restock Report</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text textStyle="body3Semi">Minimum Quantity:</Text>
                </GridItem>
                <GridItem>
                  <Input
                    type="number"
                    placeholder="5000"
                    onChange={(e) => setMinimumQty(e.target.value)}
                  />
                </GridItem>
              </Grid>
              {refillItems ? (
                  <Box my={4}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={0}>
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
                    {refillItems.map((item) => (
                      <Grid
                        key={item.inventory_id}
                        templateColumns="repeat(3, 1fr)"
                        gap={0}
                      >
                        <GridItem>
                          <Text textStyle="body3">{item.name}</Text>
                        </GridItem>
                        <GridItem>
                          <Text textStyle="body3">N/A</Text>
                        </GridItem>
                        <GridItem>
                          <Text textStyle="body3">{item.quantity}</Text>
                        </GridItem>
                      </Grid>
                    ))}
                  </Box>
                ) : (
                  <Text>No Items to Refill</Text>
                )}
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button type="submit" colorScheme="primary">
                Generate Report
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default RestockReportDisplay;
