import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// Context
import { useAuth } from "context/AuthContext";
// UI
import {
    Alert,
    AlertDescription,
    AlertIcon,
    CircularProgress,
    Flex,
    Text,
} from "@chakra-ui/react";
// Icons
import { FaGithub } from "react-icons/fa";
// Components
import CustomButton from "utils/Button";
// Hooks
import useAuthFirebase from "hooks/useAuthFirebase";

function HomePage() {
    const [submit, setSubmit] = useState(false);
    const [logout, setLogout] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    const { loading, error } = useAuthFirebase(submit, logout);

    function loginHandler() {
        setSubmit(true);
        setLogout(false);
    }

    function logoutHandler() {
        setLogout(true);
        setSubmit(false);
    }

    return (
        <>
            <Head>
                <title>Sign in with Github</title>
            </Head>
            <Flex
                justify="center"
                align="center"
                direction="column"
                minH="100vh"
                bg="blackAlpha.800"
            >
                <CustomButton
                    leftIcon={<FaGithub size={28} />}
                    rightIcon={
                        loading ? (
                            <CircularProgress
                                isIndeterminate
                                size="30px"
                                color="gray"
                                ml={2}
                            />
                        ) : undefined
                    }
                    onClick={loginHandler}
                    disabled={user ? true : false}
                    title="Sign in"
                />
                {error && (
                    <Alert mt={5} status="warning" maxW="300px">
                        <AlertIcon />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {user && (
                    <>
                        <Text
                            my={7}
                            fontSize="3xl"
                            fontWeight="bold"
                            color="whiteAlpha.800"
                            textAlign="center"
                        >
                            Welcome {user?.currentUser?.displayName}
                        </Text>
                        <Flex gap={7} direction={["column", "row"]}>
                            <CustomButton
                                onClick={() => router.replace("/dashboard")}
                                title="View Dashboard"
                            />
                            <CustomButton
                                onClick={logoutHandler}
                                title="Sign out"
                            />
                        </Flex>
                    </>
                )}
            </Flex>
        </>
    );
}

export default HomePage;
