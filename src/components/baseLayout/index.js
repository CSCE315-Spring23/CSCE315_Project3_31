import React, { useEffect, useState, useRef } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import {
	Box,
	Flex,
	Spacer,
	HStack,
	Image,
	Text,
	IconButton,
	Link,
	useColorMode,
	useMediaQuery,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	List,
	ListItem,
	Switch,
} from "@chakra-ui/react";
import { WiDaySunny } from "react-icons/wi";
import { IoMoon, IoClose } from "react-icons/io5";
import { HiMenuAlt4 } from "react-icons/hi";
import GoogleTranslate from "../common/googleTranslate";

const HamburgerMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<IconButton
				variant="unstyled"
				icon={<HiMenuAlt4 size={45} />}
				onClick={onOpen}
			/>
			<Drawer placement="right" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Flex justify="space-between">
							<Text textAlign="center" textStyle="body1Semi">
								Menu
							</Text>
							<IconButton
								my="auto"
								variant="unstyled"
								icon={<IoClose size={36} />}
								onClick={onClose}
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody>
						<List
							fontSize="1.4rem"
							listStylePos="inside"
							pl={0}
							pb={2}
							spacing={2}
							borderBottom="1px solid"
							borderColor="gray"
						>
							<ListItem mx={0}>
								<Link
									as={ReactLink}
									_hover={{ textDecoration: "none" }}
									to="/menu"
								>
									Menu
								</Link>
							</ListItem>
							<ListItem mx={0}>
								<Link
									as={ReactLink}
									_hover={{ textDecoration: "none" }}
									to="/customer"
								>
									Customer
								</Link>
							</ListItem>
							<ListItem mx={0}>
								<Link
									as={ReactLink}
									_hover={{ textDecoration: "none" }}
									to="/server"
								>
									Server
								</Link>
							</ListItem>
							<ListItem mx={0}>
								<Link
									as={ReactLink}
									_hover={{ textDecoration: "none" }}
									to="/manager"
								>
									Manager
								</Link>
							</ListItem>
						</List>
						<Box mt={3}>
							<Text fontSize="1.4rem" as="span" mr={3}>
								{colorMode[0].toUpperCase() +
									colorMode.substring(1)}{" "}
								Mode
							</Text>
							<Switch
								size="lg"
								colorScheme="primary"
								defaultChecked={colorMode === "dark"}
								onChange={toggleColorMode}
							/>
						</Box>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const MobileBaseNavbar = () => {
	const navigate = useNavigate();
	const { colorMode, toggleColorMode } = useColorMode();
	const navigateHome = () => navigate("/");

	return (
		<Flex justify="space-between" align="center" mt={1} mx={0}>
			<HamburgerMenu />
			<GoogleTranslate />
		</Flex>
	);
};

const BaseNavbar = () => {
	const navigate = useNavigate();
	const { colorMode, toggleColorMode } = useColorMode();
	const navigateHome = () => navigate("/");

	return (
		<Flex width="100%" mt="1" justify="center" align="center" px={2} pt={2}>
			<HStack
				fontSize="1.5rem"
				fontWeight="800"
				spacing="1.5em"
				width="fit-content"
			>
				<Link
					as={ReactLink}
					_hover={{ textDecoration: "none" }}
					to="/menu"
				>
					Menu
				</Link>
				<Link
					as={ReactLink}
					_hover={{ textDecoration: "none" }}
					to="/customer"
				>
					Customer
				</Link>
				<Link
					as={ReactLink}
					_hover={{ textDecoration: "none" }}
					to="/server"
				>
					Server
				</Link>
				<Link
					as={ReactLink}
					_hover={{ textDecoration: "none" }}
					to="/manager"
				>
					Manager
				</Link>
				<GoogleTranslate />
			</HStack>
		</Flex>
	);
};

const BaseContainer = ({ content }) => {
	return <Box mt={2}>{content}</Box>;
};

const BaseFooter = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate();

	return (
		<Flex width="100%" justify="center" pt={5} pb={1}>
			<Text fontSize={["sm", "md"]} mb={4} align="center" mx="auto">
				Developed by{" "}
				<Text
					as="span"
					fontWeight="bold"
					color={
						colorMode === "light" ? "primary.500" : "primary.300"
					}
				>
					David Chi
				</Text>
				{", "}
				<Text
					as="span"
					fontWeight="bold"
					color={
						colorMode === "light" ? "primary.500" : "primary.300"
					}
				>
					Jeffrey Li
				</Text>
				{", "}
				<Text
					as="span"
					fontWeight="bold"
					color={
						colorMode === "light" ? "primary.500" : "primary.300"
					}
				>
					Art Young
				</Text>
				{", and "}
				<Text
					as="span"
					fontWeight="bold"
					color={
						colorMode === "light" ? "primary.500" : "primary.300"
					}
				>
					Andrew Mao
				</Text>
				<br />
				a.k.a. Team 31
			</Text>
		</Flex>
	);
};

const ToggleColorMode = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Box
			position="fixed"
			bottom={["1", "2", "3", "4", "5"]}
			right={["1", "2", "3", "4", "5"]}
			zIndex={1000}
		>
			<IconButton
				variant="outline"
				colorScheme={colorMode === "dark" ? "orange" : "white"}
				boxSize={["3rem", "4rem"]}
				size={["3rem", "4rem"]}
				icon={
					colorMode === "dark" ? (
						<WiDaySunny size={50} />
					) : (
						<IoMoon
							size={50}
							style={{ transform: "rotate(270deg)" }}
						/>
					)
				}
				onClick={toggleColorMode}
				isRound
			/>
		</Box>
	);
};

const BaseLayout = ({ content }) => {
	const [isMobile] = useMediaQuery("(max-width: 480px)");

	return (
		<Flex justifyContent="center" overflowX="hidden" overflowY="hidden">
			{console.count("Base Layout")}
			<Box
				width={["312px", "472px", "760px", "984px", "1150px"]}
				m={0}
				p={0}
			>
				{isMobile ? <MobileBaseNavbar /> : <BaseNavbar />}
				<BaseContainer content={content} />
				<BaseFooter />
				{!isMobile ? <ToggleColorMode /> : ""}
			</Box>
		</Flex>
	);
};

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
