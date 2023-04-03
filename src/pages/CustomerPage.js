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
import CreateDuelForm from "../components/manager/createDuelForm";
import WaitingDuelsTable from "../components/manager/waitingDuelsTable";
import OngoingDuelsTable from "../components/manager/ongoingDuelsTable";
import FinishedDuelsTable from "../components/manager/finishedDuelsTable";
import DuelCounter from "../components/manager/duelCounter";
import Database, { getUID } from "../data";
import { useNavigate } from "react-router-dom";
import OrderTotalDisplay from "../components/common/orderTotalDisplay";
import MenuCategorySelectionDisplay from "../components/common/menuCategorySelectionDisplay";
import MenuItemSelectionDisplay from "../components/common/menuItemSelectionDisplay";


const InADuelAlert = ({ duelLink }) => {
  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(false);
  const backgroundColor = useColorModeValue("#ffa987", "");

  return (
    <Alert
      width={["19em", "25em", "45em", "60em", "72em"]}
      height={[null, null, "3em", "4em"]}
      status="warning"
      variant="left-accent"
      backgroundColor={backgroundColor}
    >
      <AlertIcon />
      <AlertTitle>You are currently in a duel!</AlertTitle>
      <Button
        variant="solid"
        colorScheme="primary"
        isLoading={navigating}
        ml={5}
        transform={[null, "scale(0.9)", null, "none"]}
        onClick={() => {
          setNavigating(true);
          window.location.href = duelLink;
        }}
      >
        Return
      </Button>
    </Alert>
  );
};

const CustomerPage = () => {
  const [category, setCategory] = useState("Sandwiches");
  const [order, setOrder] = useState([]);

  const handleUpdate = (menuItemName, price, add) => {
    let new_order;
    for (let i = 0; i < order.length; i++) {
      if (order.at(i).name === menuItemName) {
        new_order = [...order];
        new_order.at(i).quantity += add ? 1 : -1;
        setOrder(new_order);
        return;
      }
    }
    new_order = [...order, { name: menuItemName, price: price, quantity: 1}];
    setOrder(new_order);
  }

  const menuItems = [
    {
      name: "Food 1",
      price: 1.00
    },
    {
      name: "Food 2",
      price: 2.00
    },
    {
      name: "Food 3",
      price: 3.00
    },
    {
      name: "Food 4",
      price: 4.00
    },
    {
      name: "Food 5",
      price: 5.00
    },
    {
      name: "Food 6",
      price: 6.00
    },
    {
      name: "Food 7",
      price: 7.00
    }
  ];

  return (
    <BaseLayout
      content={
        <>
          {console.log(order)}
          <Box position='fixed'>
            <MenuCategorySelectionDisplay selectedCategory={category} onSelectCategory={setCategory} />
            <Box mt="1em">
              <OrderTotalDisplay order={order} />
            </Box>
          </Box>
          <Flex justify='flex-end'>
            <MenuItemSelectionDisplay menuItems={menuItems} order={order} onUpdate={handleUpdate} />
          </Flex>
        </>
      }
    />
  );
};

export default CustomerPage;