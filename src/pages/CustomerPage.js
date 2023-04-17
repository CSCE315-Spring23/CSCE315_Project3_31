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
import OrderTotalDisplay from "../components/common/orderTotalDisplay";
import MenuCategorySelectionDisplay from "../components/common/menuCategorySelectionDisplay";
import MenuItemSelectionDisplay from "../components/common/menuItemSelectionDisplay";
import nameToUrl from "../imageMapping";


const CustomerPage = () => {
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

  const handleUpdate = (menuItemName, price, add) => {
    let new_order;
    for (let i = 0; i < order.length; i++) {
      if (order.at(i).name === menuItemName) {
        new_order = [...order];
        new_order.at(i).quantity += add ? 1 : -1;
        if (new_order.at(i).quantity === 0)
          new_order = new_order.filter((_, index) => index !== i);
        setOrder(new_order);
        return;
      }
    }
    new_order = [...order, { name: menuItemName, price: price, quantity: 1 }];
    setOrder(new_order);
  };

  return (
    <BaseLayout
      content={
        <>
          {console.log(order)}
          <Box position="fixed">
            <MenuCategorySelectionDisplay
              selectedCategory={category}
              onSelectCategory={setCategory}
            />
            <Box mt="1em">
              <OrderTotalDisplay order={order} />
            </Box>
          </Box>
          <Flex justify="flex-end">
            <MenuItemSelectionDisplay
              menuItems={menuItems}
              category={category}
              order={order}
              onUpdate={handleUpdate}
            />
          </Flex>
        </>
      }
    />
  );
};

export default CustomerPage;
