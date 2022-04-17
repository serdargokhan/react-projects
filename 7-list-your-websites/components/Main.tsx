// UI
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
// Components
import Modal from "./Modal";

function Main() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex
                as="main"
                w="70%"
                mx="auto"
                textColor="white"
                align="flex-start"
                justify="space-between"
                my="4rem"
            >
                <Flex direction="column">
                    <Text fontSize="sm">Dashboard</Text>
                    <Text fontSize={["2xl", "4xl"]} fontWeight="extrabold">
                        My Sites
                    </Text>
                </Flex>
                <Flex>
                    <Button
                        onClick={onOpen}
                        textColor="blackAlpha.900"
                        size="lg"
                        width={["100px", "160px"]}
                    >
                        Add Site
                    </Button>
                </Flex>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export default Main;
