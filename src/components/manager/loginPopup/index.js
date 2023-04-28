import { Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const LoginPopup = ({ userType }) => {
    const userType = useState(userType ? userType : "SERVER");

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex 
            flexDirection='column' justify='center' py='0.5em' border='solid 1px'
        >

        </Flex>
    );
};

export default LoginPopup;