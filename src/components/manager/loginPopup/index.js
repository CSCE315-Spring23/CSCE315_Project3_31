import { Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, ModalBody, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const LoginPopup = ({ userType }) => {
    const [user, setUser] = useState(userType ? userType : "SERVER");

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, []);

    return (
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
    );
};

export default LoginPopup;