import { useState } from "react";
import { useRouter } from "next/router";
// UI
import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Link,
    Tag,
    Text,
} from "@chakra-ui/react";
// Context
import { useAuth } from "context/AuthContext";
// Hooks
import useAuthFirebase from "hooks/useAuthFirebase";

function Profile() {
    const [logout, setLogout] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    function logoutHandler() {
        setLogout(true);
        router.push("/");
    }

    useAuthFirebase(false, logout);

    return (
        <Flex
            align="center"
            justify="center"
            direction="column"
            textColor="white"
            mt={14}
            gap={3}
        >
            <Avatar src={user?.currentUser?.photoURL!} size="2xl" />
            <Text textAlign="center" fontSize="4xl" fontWeight="bold">
                {user?.currentUser?.displayName}
            </Text>
            <Text mb={3} fontSize="xl">
                {user?.currentUser?.email}
            </Text>
            <Box maxW="600px" w="90%" bg="blackAlpha.500" borderRadius="xl">
                <Box borderBottom="4px">
                    <Flex align="center" justify="space-between" p={5}>
                        <Text>Settings</Text>
                        <Badge>Free</Badge>
                    </Flex>
                </Box>
                <Text
                    p={5}
                    textAlign="justify"
                    fontSize="lg"
                    fontWeight="semibold"
                >
                    I developed this project as a part of a tutorial from
                    Youtube thanks to{" "}
                    <Link
                        color="linkedin.300"
                        href="https://leerob.io/"
                        isExternal
                    >
                        Lee Robinson
                    </Link>{" "}
                    for inspiration. I have used Chakra UI, useSWR, and Skeleton
                    loading for the first time with this project. I also stored
                    the user information on Firebase Firestore and login was
                    implemented with Firebase authentication.
                </Text>
                <Flex py={2} px={5} gap={2}>
                    <Tag>Github</Tag>
                    <Tag>NextJS</Tag>
                    <Tag>Firebase</Tag>
                </Flex>
                <Flex justifyContent="flex-end">
                    <Button
                        onClick={logoutHandler}
                        size="lg"
                        colorScheme="whiteAlpha"
                        m={5}
                    >
                        Sign out
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}

export default Profile;
