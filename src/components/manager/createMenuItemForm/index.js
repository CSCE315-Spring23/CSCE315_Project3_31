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
  useDisclosure
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
      <Modal isOpen={isOpen} onClose={onClose} size="md">
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
                   }}>
                <Text textStyle="body3">Item Name</Text>
                <input type="text" name="itemName" 
                      style={{
                        background: "#f3f3f3",
                        borderRadius: "0.25rem",
                        border: "1px solid",
                        padding: "0.5rem",
                        width: "75%",
                        margin: "0 auto"
                      }}
                />
              </Box>
              <Box mt={2} style={{
                     width: "100%"
                   }}>
                <Text textStyle="body3">Cost</Text>
                <input type="number" name="cost" 
                      style={{
                        background: "#f3f3f3",
                        borderRadius: "0.25rem",
                        border: "1px solid",
                        padding: "0.5rem",
                        width: "75%",
                        margin: "0 auto"
                      }}
                />
              </Box>
              <Box mt={2} style={{
                     width: "100%"
                   }}>
                <Text textStyle="body3">Ingredients</Text>
                <input type="text" name="ingredients" 
                      style={{
                        background: "#f3f3f3",
                        borderRadius: "0.25rem",
                        border: "1px solid",
                        padding: "0.5rem",
                        width: "75%",
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