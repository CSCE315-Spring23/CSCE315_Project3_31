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
  const toast = useToast();
  const handleSubmit = async (e) => {
    
    e.preventDefault();
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
        Z Report
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <Text textStyle="body2Semi">Z Report</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
