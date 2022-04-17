import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// UI
import { Box } from "@chakra-ui/react";
// Components
import Navbar from "components/Navbar";
import Profile from "components/Profile/Profile";
// Context
import { useAuth } from "context/AuthContext";

function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.currentUser) router.push("/");
    }, []);

    if (!user?.currentUser) return null;

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Box bg="blackAlpha.800" minH="100vh">
                <Navbar />
                <Profile />
            </Box>
        </>
    );
}

export default ProfilePage;
