import React from "react";
import { Link as ReactLink } from "react-router-dom";
import {
	Box,
	Flex,
	HStack,
	Text,
	Link,
	useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, ModalBody
} from "@chakra-ui/react";
import GoogleTranslate from "../common/googleTranslate";


import { useState, useEffect } from "react";
import CustomerPage from "../../pages/CustomerPage";
import ServerPage from "../../pages/ServerPage";
import ManagerPage from "../../pages/ManagerPage";
import MenuPage from "../../pages/MenuPage";

const LoginPopup = ({ userType, onEnter, loggedIn, onSwitching }) => {
    const [user, setUser] = useState(userType ? userType : "SERVER");

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
		if (!loggedIn && !isOpen) {
	        onOpen();
		}
    }, [loggedIn]);

	const handleEnter = () => {
		onEnter(user);
		onClose();
	}

	const handleLogin = () => {
		//Login
		onEnter(user);
		onClose();
	}

    return (
		<>
			<Button colorScheme='primary' p={2} width='10em' onClick={onSwitching}>Switch Views</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false} closeOnEsc={false}>
				<ModalOverlay backdropFilter='blur(10px)' />
				<ModalContent>
					<ModalHeader>
						<Flex justify='center' gap='0' align='center'>
							<Button colorScheme="primary"
								variant={
									user === 'MENU'
									? "solid" : "outline"
								}
								borderRightRadius={0} p={1} onClick={() => setUser("MENU")}
								width='7em'
							>
							Menu
							</Button>
							<Button colorScheme="primary" 
								variant={
									user === 'CUSTOMER'
									? "solid" : "outline"
								}
								borderRadius={0} p={1} onClick={() => setUser("CUSTOMER")}
								width='7em'
							>
							Customer
							</Button>
							<Button colorScheme="primary"
								variant={
									user === 'SERVER'
									? "solid" : "outline"
								}
								borderRadius={0} p={1} onClick={() => setUser("SERVER")}
								width='7em'
							>
							Server
							</Button>
							<Button colorScheme="primary" 
								variant={
									user === 'MANAGER'
									? "solid" : "outline"
								}
								borderLeftRadius={0} p={1} onClick={() => setUser("MANAGER")}
								width='7em'
							>
							Manager
							</Button>
						</Flex>
						<Text width='fit-content' mx='auto' textAlign='center' textStyle='body1'
							py='1em'
						>
						Welcome to Chick-Fil-A!
						</Text>
					</ModalHeader>
					<ModalBody>
						<Flex justifyContent='center'>
							{
								user === "MANAGER" || user === "SERVER"
								?
								<Button colorScheme="primary" width='10em' height='3em' onClick={() => handleLogin()}>
									<Text textStyle='body3Semi'>
									Login
									</Text>
								</Button> :
								<Button colorScheme="primary" width='10em' height='3em' onClick={() => handleEnter()}>
									<Text textStyle='body3Semi'>
									Enter
									</Text>
								</Button>
							}
						</Flex>
					</ModalBody>
					<ModalFooter justifyContent="center">
						<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/582px-Chick-fil-A_Logo.svg.png'
							width='200px'
						/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
    );
};

const Navbar = ({ userType, onEnter, loggedIn, onSwitching }) => {
	return (
		<Flex width="100%" mt="1" justify="center" align="center" px={2} pt={2}>
			<HStack
				fontSize="1.5rem"
				fontWeight="800"
				spacing="1.5em"
				width="fit-content"
			>
				<LoginPopup userType={userType} onEnter={onEnter} loggedIn={loggedIn} onSwitching={onSwitching} />
				<GoogleTranslate />
			</HStack>
		</Flex>
	);
};

const ContentContainer = ({ content }) => {
	return <Box mt={2}>{content}</Box>;
};

const Footer = () => {
	return (
		<Flex width="100%" justify="center" pt={5} pb={1}>
			<Text fontSize="md" mb={4} align="center" mx="auto">
				Developed by{" "}
				<Text
					as="span"
					fontWeight="bold"
					color="primary.500"
				>
					David Chi
				</Text>
				{", "}
				<Text
					as="span"
					fontWeight="bold"
					color="primary.500"
				>
					Jeffrey Li
				</Text>
				{", "}
				<Text
					as="span"
					fontWeight="bold"
					color="primary.500"
				>
					Art Young
				</Text>
				{", and "}
				<Text
					as="span"
					fontWeight="bold"
					color="primary.500"
				>
					Andrew Mao
				</Text>
				<br />
				a.k.a. Team 31
			</Text>
		</Flex>
	);
};

const MainView = () => {
	const [userType, setUserType] = useState("SERVER");
	const [content, setContent] = useState(<ServerPage />);
	const [loggedIn, setLoggedIn] = useState(false);

	const switchViews = (user) => {
		if (user === 'SERVER') setContent(<ServerPage />);
		else if (user === 'MANAGER') setContent(<ManagerPage />);
		else if (user === 'CUSTOMER') setContent(<CustomerPage />);
		else if (user === 'MENU') setContent(<MenuPage />);

		setUserType(user);
		setLoggedIn(true);
	};

	const enterLoginPopup = () => {
		setLoggedIn(false);
	}

	return (
		<Flex justifyContent="center" overflowX="hidden" overflowY="hidden">
			<Box
				width="1150px"
				m={0}
				p={0}
			>
				<Navbar userType={userType} onEnter={switchViews} loggedIn={loggedIn} onSwitching={enterLoginPopup} />
				<ContentContainer content={content} />
				<Footer />
			</Box>
		</Flex>
	);
};

export default MainView;
export { Navbar, ContentContainer, Footer };
