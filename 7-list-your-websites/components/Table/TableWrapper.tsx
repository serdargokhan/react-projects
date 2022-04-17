import { ReactNode } from "react";
// UI
import {
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Table,
} from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

function EmptyTable({ children }: Props) {
    return (
        <TableContainer w="70%" mx="auto" bg="blackAlpha.400" borderRadius="xl">
            <Table variant="simple" colorScheme="whiteAlpha">
                <Thead bg="blackAlpha.500">
                    <Tr mx="auto" w="full">
                        <Th textAlign="center" textColor="white">
                            NAME
                        </Th>
                        <Th textAlign="center" textColor="white">
                            SITE LINK
                        </Th>
                        <Th textAlign="center" textColor="white">
                            FEEDBACK LINK
                        </Th>
                        <Th textAlign="center" textColor="white">
                            DATE ADDED
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>{children}</Tbody>
            </Table>
        </TableContainer>
    );
}

export default EmptyTable;
