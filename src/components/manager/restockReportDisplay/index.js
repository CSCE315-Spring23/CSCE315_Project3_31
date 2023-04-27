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
} from "@chakra-ui/react";
import Database from "../../../data";

const RestockReportDisplay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [minimumQty, setMinimumQty] = useState(5000);
  const [refillItems, setRefillItems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = await Database.getRestockReport(minimumQty);
    console.log(items);
    setRefillItems(items);
    onOpen();
  };

  return (
    <Flex
      flexDirection="column"
      justify="center"
      py="0.5em"
      border="solid 1px"
      borderColor="grey.100"
      rounded="md"
      boxShadow="lg"
    >
      <Box fontSize="1.2rem" my={2} mx="auto">
        <Button
          onClick={handleSubmit}
          size="lg"
          fontSize="md"
          variant="solid"
          colorScheme="primary"
          boxShadow="0 4px 7px rgb(79 114 205 / 40%)"
        >
          Restock Report
        </Button>
      </Box>
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
                    value={minimumQty}
                    onChange={(e) => setMinimumQty(e.target.value)}
                  />
                </GridItem>
              </Grid>
              {refillItems.length > 0 ? (
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
                  <Text>No items to refill</Text>
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
