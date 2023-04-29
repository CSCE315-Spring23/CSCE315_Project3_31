import React, { useEffect, useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  useColorModeValue,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Center,
} from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";
import Database, { getUID } from "../data";
import { useNavigate } from "react-router-dom";
import MenuCategorySelectionDisplay from "../components/common/menuCategorySelectionDisplay";
import MenuItemSelectionDisplay from "../components/common/menuItemSelectionDisplay";
import nameToUrl from "../imageMapping";


const MenuPage = () => {
  const [category, setCategory] = useState("Sandwiches");
  const [order, setOrder] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const updateMenu = async () => {
      const menu = await Database.getMenuItems();
      for (let i = 0; i < menu.length; i++) {
        let imageUrl = nameToUrl[menu[i].name];
        if (imageUrl) menu[i].image = imageUrl;
      }
      setMenuItems(menu);
    };
    updateMenu();
  }, []);

  return (
    <BaseLayout
      content={
        <>
          <Box position="fixed">
            <MenuCategorySelectionDisplay
              selectedCategory={category}
              onSelectCategory={setCategory}
            />
          </Box>
          <Flex justify="flex-end">
            <MenuItemSelectionDisplay
              menuItems={menuItems}
              readOnly={true}
              category={category}
              order={order}
            />
          </Flex>
        </>
      }
    />
  );
};

export default MenuPage;
