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
  useToast,
  IconButton
} from "@chakra-ui/react";
import {
  InfoIcon
} from "@chakra-ui/icons";
import Database from "../../../../data";

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
        Sales Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Text textStyle="body2Semi">Excess Report</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justify="center" gap={10}>
                <GridItem>
                  <Text textStyle="body3">Start Date:</Text>
                  <Input
                    type="date"
                    placeholder="Start Date"
                    onChange={(e) => setMinimumQty(e.target.value)}
                    style={{
                      background: "#f3f3f3",
                      border: "1px solid",
                      padding: "0.5rem",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Text textStyle="body3">End Date:</Text>
                  <Input
                    type="date"
                    placeholder="Start Date"
                    onChange={(e) => setMinimumQty(e.target.value)}
                    style={{
                      background: "#f3f3f3",
                      border: "1px solid",
                      padding: "0.5rem",
                    }}
                  />
                </GridItem>
              </Flex>
              {refillItems ? (
                  <Box my={4}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={0}>
                      <GridItem>
                        <Text textStyle="body3Semi">Item</Text>
                      </GridItem>
                      <GridItem></GridItem>
                      <GridItem>
                        <Text textStyle="body3Semi">Total Sales</Text>
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
                        <GridItem></GridItem>
                        <GridItem>
                          <Text textStyle="body3">{item.quantity}</Text>
                        </GridItem>
                      </Grid>
                    ))}
                  </Box>
                ) : (
                  <Text>No Sales In Time Period</Text>
                )}
            </ModalBody>
            <ModalFooter justifyContent="center" gap={1}>
              <Button type="submit" colorScheme="primary">
                Generate Report
              </Button>
              <IconButton 
                aria-label="Info"
                icon={<InfoIcon color="blue.500"/>}
                size="lg"
                variant="ghost"
                _hover={{ bg: "transparent" }}
              >
              </IconButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default RestockReportDisplay;