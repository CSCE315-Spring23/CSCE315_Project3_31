import {
  Box,
  Flex,
  Button,
  ButtonGroup,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const MenuItemCard = ({ info, subtract, onUpdate }) => {
  const border = useColorModeValue(
    "solid 1px rgb(0, 0, 0, 0.5)",
    "solid 1px #7d7dff"
  );
  const shadow = useColorModeValue("2xl", "#7d7dff 0 8px 50px");
  const onHover = useColorModeValue(
    { boxShadow: "0 8px 50px" },
    { borderColor: "#ffd543", boxShadow: "#ffd543 0 8px 50px" }
  );
  const [isMobile] = useMediaQuery("(max-width: 991px)");

  return (
    <Box
      rounded="md"
      border={border}
      boxShadow={shadow}
      width="18em"
      height="fit-content"
      paddingBottom={5}
      _hover={isMobile ? "" : onHover}
      transition="border-color 0.25s ease, box-shadow 0.25s ease"
    >
      <Box
        mx="auto"
        width="18em"
        height="18em"
        rounded='md'
        overflow="hidden"
        bg="black"
      >
        {info.image ? <img src={info.image} /> : ""}
      </Box>
      <Text margin="5px auto 0" mt={5} width="fit-content" textStyle="body2Semi">
        {info.name}
      </Text>
      <Text
        mx="auto"
        width="fit-content"
        textStyle="body3"
      >
        Price: ${info.price.toFixed(2)}
      </Text>
      <Flex justify='center' gap={1} pt={2}>
          <Button 
            size="md" fontSize="1.5rem" 
            colorScheme='primary' variant='solid'
            onClick={() => onUpdate(info.name, info.price, false)} isDisabled={!subtract}
            p={3} px="2em"
          >{"-"}</Button>
          <Button 
            size="md" fontSize="1.5rem"
            colorScheme='primary' variant='solid'
            onClick={() => onUpdate(info.name, info.price, true)}
            p={3} px="2em"
          >{"+"}</Button>
        </Flex>
    </Box>
  );
};

export default MenuItemCard;
