import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import Database, { getUID } from "../data";
import OrderTotalDisplay from "../components/common/orderTotalDisplay";
import OrderHistoryDisplay from "../components/common/orderHistoryDisplay";
import MenuCategorySelectionDisplay from "../components/common/menuCategorySelectionDisplay";
import MenuItemSelectionDisplay from "../components/common/menuItemSelectionDisplay";
import nameToUrl from "../imageMapping";


const ServerPage = () => {
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
    }
    if (!menuItems.length) {
      updateMenu();
    }
  }, [menuItems]);

  const handleUpdate = (menuItemName, menuId, price, add) => {
    let new_order;
    for (let i = 0; i < order.length; i++) {
      if (order.at(i).name === menuItemName) {
        new_order = [...order];
        new_order.at(i).quantity += add ? 1 : -1;
        if (new_order.at(i).quantity === 0) 
          new_order = new_order.filter(
            (_, index) => index !== i
          );
        setOrder(new_order);
        return;
      }
    }
    new_order = [...order, { name: menuItemName, menu_id: menuId, price: price, quantity: 1}];
    setOrder(new_order);
  }

  const toast = useToast();
  
  const handleOrderSubmit = async (e, cost_total, timestamp, customer_id, staff_id, menu_items) => {
    e.preventDefault();
    try {
      const loadToastId = toast({
        description: "Order Processing",
        status: "loading",
        duration: 500,
        isClosable: true,
      })
      const { order_id } = await Database.makeOrder(cost_total, timestamp, customer_id, staff_id, menu_items);
      if (!order_id || order_id < 0) {
        toast({
          title: "Order Failed",
          description: "There was an issue with processing your order.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return;
      }
      toast({
        title: "Order Received",
        description: "Your has been received and will be ready shortly. Your order id is " + order_id + ".",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      const new_order = [];
      setOrder(new_order);
    } catch (err) {
      console.error(err);
    }
    return;
  }

  return (
    <>
      <Box position='fixed'>
        <MenuCategorySelectionDisplay selectedCategory={category} onSelectCategory={setCategory} />
        <Box mt="1em">
          <OrderTotalDisplay order={order} onOrderSubmit={handleOrderSubmit} />
        </Box>
        <Box mt="1em">
          <OrderHistoryDisplay />
        </Box>
      </Box>
      <Flex justify='flex-end'>
        <MenuItemSelectionDisplay menuItems={menuItems} category={category} order={order} onUpdate={handleUpdate} />
      </Flex>
    </>
  );
};

export default ServerPage;