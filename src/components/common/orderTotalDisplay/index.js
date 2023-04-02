import React, { useState, useEffect } from "react";
import { 
  Box, Text, Flex, Button
} from "@chakra-ui/react";

const OrderTotalDisplay = ({ order }) => {

  return (
    <Flex flexDirection="column" justify="center" py="0.5em" border="solid 1px" borderColor="grey.100" rounded="md" boxShadow="lg">
      <Box mt={2} mx="auto">
        <Text fontSize="1.5rem"><b>Total: </b>${order.price}</Text>
      </Box>
      <Box fontSize="1.2rem" my={2} mx="auto">
        <Button 
          onClick={() => {}}
          size="lg"
          fontSize="lg"
          variant="solid"
          colorScheme="primary"
          boxShadow="0 4px 7px rgb(79 114 205 / 40%)"
        >
          View Order
        </Button>
      </Box>
    </Flex>
  );
};

export default OrderTotalDisplay;