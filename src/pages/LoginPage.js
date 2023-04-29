import { Box, Flex, Text } from "@chakra-ui/react";
import BaseLayout from "../components/baseLayout";

const LoginPage = () => {
    return (
        <BaseLayout
            content={
                <Flex justify='center' align='center'>
                    <Box 
                        margin='2em' 
                        width='25em' height='40em' 
                        rounded='md' 
                        border='solid 2px' borderColor='rgb(0, 0, 0, 0.2)'
                        boxShadow='md'
                    >
                        
                    </Box>
                </Flex>
            }
        />
    );
};

export default LoginPage;