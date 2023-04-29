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
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ userType }) => {
    const [user, setUser] = useState(userType ? userType : "SERVER");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        onOpen();
    }, []);

    return (
		<>
			<Button colorScheme='primary' p={2} width='10em'>Switch Views</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
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
								<Button colorScheme="primary" width='10em' height='3em' onClick={onClose}>
									<Text textStyle='body3Semi'>
									Login
									</Text>
								</Button> :
								<Button colorScheme="primary" width='10em' height='3em' onClick={onClose}>
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

const BaseNavbar = () => {
	return (
		<Flex width="100%" mt="1" justify="center" align="center" px={2} pt={2}>
			<HStack
				fontSize="1.5rem"
				fontWeight="800"
				spacing="1.5em"
				width="fit-content"
			>
				<LoginPopup />
				<GoogleTranslate />
			</HStack>
		</Flex>
	);
};

const BaseContainer = ({ content }) => {
	return <Box mt={2}>{content}</Box>;
};

const BaseFooter = () => {
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

const BaseLayout = ({ content }) => {
	return (
		<Flex justifyContent="center" overflowX="hidden" overflowY="hidden">
			<Box
				width="1150px"
				m={0}
				p={0}
			>
				<BaseNavbar />
				<BaseContainer content={content} />
				<BaseFooter />
			</Box>
		</Flex>
	);
};

export default BaseLayout;
export { BaseNavbar, BaseContainer, BaseFooter };
