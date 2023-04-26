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
	Text,
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
import OrderHistoryDisplay from "../components/common/orderHistoryDisplay";
import MenuCategorySelectionDisplay from "../components/common/menuCategorySelectionDisplay";
import ItemSelectionDisplay from "../components/manager/itemSelectionDisplay";
import nameToUrl from "../imageMapping";
import { GoogleLogin } from "@react-oauth/google";

const ManagerPage = () => {
	const [lookingAtMenu, setLookingAtMenu] = useState(true);
	const [category, setCategory] = useState("Sandwiches");
	const [order, setOrder] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [inventoryItems, setInventoryItems] = useState([]);

	useEffect(() => {
		const updateMenu = async () => {
			const menu = await Database.getMenuItems();
			for (let i = 0; i < menu?.length; i++) {
				let imageUrl = nameToUrl[menu[i].name];
				if (imageUrl) menu[i].image = imageUrl;
			}
			setMenuItems(menu);
		};
		const updateInventory = async () => {
			const inventory = await Database.getInventoryItems();
			console.log(inventory);
			setInventoryItems(inventory);
		};
		if (!menuItems?.length) {
			updateMenu();
		}
		if (!inventoryItems?.length) {
			updateInventory();
		}
	}, [menuItems, inventoryItems]);

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
		new_order = [
			...order,
			{ name: menuItemName, price: price, quantity: 1 },
		];
		setOrder(new_order);
	};

	return (
		<BaseLayout
			content={
				<>
					<Box position="fixed" width="15em">
						<GoogleLogin
							onSuccess={async (credentialResponse) => {
								console.log(credentialResponse);
								await Database.postGoogleAuth(
									credentialResponse
								);
								// Send the credentialResponse.id_token to your backend for verification and user creation or login
							}}
							onError={() => {
								console.log("Login Failed");
							}}
						/>
						;
						<Flex
							flexDirection="column"
							justify="center"
							gap={1}
							pt={2}
							mb={2}
						>
							<Text textStyle="body3Semi" textAlign="center">
								Viewing:
							</Text>
							<Button
								size="md"
								fontSize="1.5rem"
								colorScheme="primary"
								variant="solid"
								onClick={() => setLookingAtMenu(true)}
								isDisabled={lookingAtMenu === true}
								p={3}
								px="2em"
							>
								Menu
							</Button>
							<Button
								size="md"
								fontSize="1.5rem"
								colorScheme="primary"
								variant="solid"
								onClick={() => setLookingAtMenu(false)}
								isDisabled={lookingAtMenu === false}
								p={3}
								px="2em"
							>
								Inventory
							</Button>
						</Flex>
						{lookingAtMenu ? (
							<Flex
								flexDirection="column"
								justify="center"
								gap="1em"
							>
								<MenuCategorySelectionDisplay
									selectedCategory={category}
									onSelectCategory={setCategory}
								/>
								<Button
									size="md"
									fontSize="1.5rem"
									colorScheme="primary"
									variant="solid"
									onClick={() => {}}
									p={3}
									px="2em"
								>
									New Menu Item
								</Button>
							</Flex>
						) : (
							""
						)}
						<Box mt="1em">
							<OrderHistoryDisplay />
						</Box>
					</Box>
					<Flex justify="center">
						<ItemSelectionDisplay
							isMenu={lookingAtMenu}
							items={lookingAtMenu ? menuItems : inventoryItems}
							category={category}
							onUpdate={handleUpdate}
						/>
					</Flex>
					<Box
						position="absolute"
						right="10em"
						top="4em"
						width="15em"
					>
						<Flex
							flexDirection="column"
							justify="center"
							gap={1}
							pt={2}
							mb={2}
						>
							<Text textStyle="body3Semi" textAlign="center">
								Reports:
							</Text>
							<Button
								size="md"
								fontSize="1.5rem"
								colorScheme="primary"
								variant="solid"
								onClick={() => {}}
								p={3}
								px="2em"
							>
								X-Z Reports
							</Button>
							<Button
								size="md"
								fontSize="1.5rem"
								colorScheme="primary"
								variant="solid"
								onClick={() => {}}
								p={3}
								px="2em"
							>
								Sales Report
							</Button>
							<Button
								size="md"
								fontSize="1.5rem"
								colorScheme="primary"
								variant="solid"
								onClick={() => {}}
								p={3}
								px="2em"
							>
								Excess Report
							</Button>
							<Button
								size="md"
								fontSize="1.5rem"
								colorScheme="primary"
								variant="solid"
								onClick={() => {}}
								p={3}
								px="2em"
							>
								Restock Report
							</Button>
						</Flex>
					</Box>
				</>
			}
		/>
	);
};

export default ManagerPage;
