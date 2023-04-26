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
  Textarea,
  Grid
} from "@chakra-ui/react";

const CreateMenuItemForm = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inventoryItems, setInventoryItems] = useState([]);

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <Flex flexDirection="column" justify="center" py="0.5em">
      <Button 
        onClick={() => onOpen()}
        size="md" fontSize="1.5rem" 
        colorScheme='primary' variant='solid'
        p={3} px="2em"
      >
        New Menu Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
              <Text textStyle="body2Semi">Add New Menu Item</Text>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
              <Box style={{
                  width: "100%"
                }}
              >
                <Text textStyle="body3">Item Name</Text>
                <input type="text" name="itemName"
                      placeholder="Chicken Sandwich"
                      style={{
                        background: "#f3f3f3",
                        borderRadius: "0.25rem",
                        border: "1px solid",
                        padding: "0.5rem",
                        width: "50%",
                        height: "2.25rem",
                        margin: "0 auto"
                      }}
                />
              </Box>
              <Box mt={2} style={{
                  width: "20%"
                }}
              >
                <Text textStyle="body3">Cost</Text>
                <Flex flexDirection="row" justify="center">
                  <Text textStyle="body3">$</Text>
                  <input type="number" name="cost"
                        placeholder="00.00"
                        style={{
                          background: "#f3f3f3",
                          borderRadius: "0.25rem",
                          border: "1px solid",
                          padding: "0.5rem",
                          width: "75%",
                          height: "2.25rem",
                          margin: "0 auto"
                        }}
                  />
                </Flex>
              </Box>
              <Box mt={2} style={{
                    width: "70%"
                  }}>
                <multi-input>
                  <Text textStyle="body3">Item Type</Text>
                  <select type="text" name="type" 
                        list="item-categories" 
                        style={{
                          background: "#f3f3f3",
                          borderRadius: "0.25rem",
                          border: "1px solid",
                          padding: "0.5rem",
                          width: "75%",
                          height: "2.25rem",
                          margin: "0 auto",
                        }}
                  >
                    <option value="">- Select Item Type -</option>
                    <option value="Sandwiches">Sandwiches</option>
                    <option value="Sides">Sides</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Other">Other</option>
                  </select>
                </multi-input>
              </Box>
              <Box mt={2} 
                style={{
                  width: "100%"
                }}
              >
                <Text textStyle="body3">Ingredients</Text>
                <Textarea type="text" name="ingredients"
                      placeholder="Ingredient | QTY&#10;Ingredient | QTY&#10;Ingredient | QTY&#10;..."
                      style={{
                        background: "#f3f3f3",
                        borderRadius: "0.25rem",
                        border: "1px solid",
                        padding: "0.5rem",
                        width: "50%",
                        height: "6.75rem",
                        margin: "0 auto"
                      }}
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="primary" onClick={onClose}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default CreateMenuItemForm;