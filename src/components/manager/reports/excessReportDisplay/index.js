import React, { useState, useEffect } from "react";
import {
	Box,
	Text,
	Flex,
	Button,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalHeader,
	ModalContent,
	ModalCloseButton,
	ModalFooter,
	useDisclosure,
	Grid,
	GridItem,
	Input,
	useToast,
	IconButton,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import Database from "../../../../data";

const RestockReportDisplay = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [excessItems, setExcessItems] = useState([]);
	const toast = useToast();
	const handleSubmit = async (e) => {
		e.preventDefault();
    const selectedDate = document.getElementById("selectDate-input").value;

    const today = new Date();

		if (!selectedDate) {
			toast({
				title: "ERROR",
				description: "No date provided.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		} else if (new Date(selectedDate).getTime() > today.getTime()) {
      toast({
        title: "ERROR",
        description: "Dates provided can not be in the future.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
		const items = await Database.getExcessReport(selectedDate);
		console.log("easdf");
		console.log(items);
		setExcessItems(items);
		toast({
      title: "Excess Report Generated",
      description: "Showing excess inventory from sales since " + selectedDate,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
	};

	return (
		<Flex
			flexDirection="column"
			justify="center"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
			py="0.5em"
		>
			<Button
				onClick={() => onOpen()}
				size="md"
				fontSize="md"
				width="75%"
				colorScheme="primary"
				variant="solid"
				p={3}
				px="2em"
			>
				Excess Report
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit}>
						<ModalHeader>
							<Text textStyle="body2Semi">Excess Report</Text>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Flex justify="center">
								<GridItem>
									<Text textStyle="body3">Start Date:</Text>
								</GridItem>
								<GridItem>
									<Input
										type="date"
										id="selectDate-input"
										placeholder="Select date"
										style={{
											background: "#f3f3f3",
											border: "1px solid",
											padding: "0.5rem",
										}}
									/>
								</GridItem>
							</Flex>
							{excessItems ? (
								<Box my={4}>
									<Grid
										templateColumns="repeat(3, 1fr)"
										gap={0}
									>
										<GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={2}>
											<Text textStyle="body3Semi">
												Item
											</Text>
										</GridItem>
										<GridItem borderBottomWidth="1px" borderColor="gray.300">
											<Text textStyle="body3Semi">
												Amount Sold
											</Text>
										</GridItem>
									</Grid>
									{excessItems.map((item) => (
										<Grid
											key={item.inventory_id}
											templateColumns="repeat(3, 1fr)"
											gap={0}
										>
											<GridItem borderBottomWidth="1px" borderColor="gray.300" colSpan={2}>
												<Text textStyle="body4">
													{item.name}
												</Text>
											</GridItem>
											<GridItem borderBottomWidth="1px" borderColor="gray.300">
												<Text textStyle="body4">
													{item.percentage_sold.toFixed(4)}%
												</Text>
											</GridItem>
										</Grid>
									))}
								</Box>
							) : (
								<Text>No Excess Inventory</Text>
							)}
						</ModalBody>
						<ModalFooter justifyContent="center" gap={1}>
							<Button type="submit" colorScheme="primary">
								Generate Report
							</Button>
							<IconButton
								aria-label="Info"
								icon={<InfoIcon color="blue.500" />}
								size="lg"
								variant="ghost"
								_hover={{ bg: "transparent" }}
							></IconButton>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default RestockReportDisplay;
