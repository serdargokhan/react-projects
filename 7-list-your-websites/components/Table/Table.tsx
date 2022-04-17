import useSWR from "swr";
// UI
import { Td, Tr, Avatar, Link, Flex } from "@chakra-ui/react";
// Icons
import { FiExternalLink } from "react-icons/fi";
// Context
import { useAuth } from "context/AuthContext";
// Components
import Welcome from "components/Welcome";
import EmptyTable from "./EmptyTable";
import TableWrapper from "./TableWrapper";

type UserType = {
    email: string;
    name: string;
    photoUrl: string;
    uid: string;
    sites: {
        siteName: string;
        siteUrl: string;
        createdAt: string;
    }[];
}[];

function TableComponent() {
    const { user } = useAuth();

    const { data } = useSWR<UserType>("/api/user", (url: string) =>
        fetch(url).then((res) => res.json())
    );

    const userSites: UserType = data!?.filter(
        (item) => item.uid === user?.currentUser?.uid
    );

    if (!data) return <EmptyTable />;

    if (userSites[0]?.sites === undefined) {
        return <Welcome />;
    }

    return (
        <>
            {data && userSites && (
                <TableWrapper>
                    {userSites[0]?.sites.map((item) => {
                        return (
                            <Tr key={item.createdAt}>
                                <Td
                                    textColor="white"
                                    fontWeight="bold"
                                    textAlign="center"
                                >
                                    {item.siteName}
                                </Td>
                                <Td textColor="white" textAlign="center">
                                    <Link
                                        href={item.siteUrl}
                                        textColor="blue.300"
                                        isExternal
                                        _hover={{
                                            textColor: "blue.100",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        <Flex
                                            align="center"
                                            justify="center"
                                            gap={1}
                                        >
                                            {item.siteUrl} <FiExternalLink />
                                        </Flex>
                                    </Link>
                                </Td>
                                <Td textColor="white" textAlign="center">
                                    <Avatar
                                        title={user?.currentUser?.displayName!}
                                        src={user?.currentUser?.photoURL!}
                                    />
                                </Td>
                                <Td textColor="white" textAlign="center">
                                    {item.createdAt.substring(0, 10)}
                                </Td>
                            </Tr>
                        );
                    })}
                </TableWrapper>
            )}
        </>
    );
}

export default TableComponent;
