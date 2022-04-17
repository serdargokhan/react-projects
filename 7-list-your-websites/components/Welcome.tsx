import { Flex, Text } from "@chakra-ui/react";

function Welcome() {
    return (
        <Flex
            w="70%"
            mx="auto"
            bg="blackAlpha.500"
            direction="column"
            align="center"
            textColor="white"
            borderRadius="xl"
            py={14}
            gap={5}
        >
            <Text fontSize="2xl" fontWeight="extrabold">
                Get feedback on your site instantly.
            </Text>
            <Text>Start today, then grow with us ☘️</Text>
        </Flex>
    );
}

export default Welcome;
