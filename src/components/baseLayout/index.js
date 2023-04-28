import React from "react";
import { Link as ReactLink } from "react-router-dom";
import {
	Box,
	Flex,
	HStack,
	Text,
	Link,
} from "@chakra-ui/react";
import GoogleTranslate from "../common/googleTranslate";


const BaseNavbar = () => {
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
