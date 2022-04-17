import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// UI
import { Box } from "@chakra-ui/react";
// Components
import Navbar from "components/Navbar";
import Table from "components/Table/Table";
import Main from "components/Main";
// Context
import { useAuth } from "context/AuthContext";

function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.currentUser) router.push("/");
    }, []);

    if (!user?.currentUser) return null;

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Box bg="blackAlpha.800" minH="100vh">
                <Navbar />
                <Main />
                <Table />
            </Box>
        </>
    );
}

export default DashboardPage;
