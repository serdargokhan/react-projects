import Link from "next/link";
// UI
import { Avatar, Flex, Text } from "@chakra-ui/react";
// Context
import { useAuth } from "context/AuthContext";
// Assets
import Logo from "assets/Logo";

function Navbar() {
    const { user } = useAuth();

    return (
        <Flex
            as="nav"
            bg="blackAlpha.400"
            w="100%"
            h="72px"
            borderTopWidth="6px"
            borderTopColor="cyan.300"
            align="center"
        >
            <Flex
                w="70%"
                mx="auto"
                align="center"
                justify="space-between"
                textColor="white"
            >
                <Flex align="center">
                    <Logo />
                    <Link href="/dashboard">
                        <Text
                            ml={5}
                            userSelect="none"
                            fontWeight="semibold"
                            _hover={{
                                textDecoration: "underline",
                                textDecorationThickness: "2px",
                                textUnderlineOffset: "8px",
                                cursor: "pointer",
                            }}
                        >
                            Dashboard
                        </Text>
                    </Link>
                </Flex>
                <Link href="/profile">
                    <Avatar
                        cursor="pointer"
                        src={user?.currentUser?.photoURL!}
                    />
                </Link>
            </Flex>
        </Flex>
    );
}

export default Navbar;
