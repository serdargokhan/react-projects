import { Td, Tr, Skeleton } from "@chakra-ui/react";
import TableWrapper from "./TableWrapper";

function EmptyTable() {
    const longSkeleton = <Skeleton color="white" w="200px" h="20px" />;
    const smallSkeleton = <Skeleton color="white" w="125px" h="20px" />;

    return (
        <TableWrapper>
            <Tr>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
            </Tr>
            <Tr>
                <Td>{smallSkeleton}</Td>
                <Td>{smallSkeleton}</Td>
                <Td>{smallSkeleton}</Td>
                <Td>{smallSkeleton}</Td>
            </Tr>
            <Tr>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
            </Tr>
            <Tr>
                <Td>{smallSkeleton}</Td>
                <Td>{smallSkeleton}</Td>
                <Td>{smallSkeleton}</Td>
                <Td>{smallSkeleton}</Td>
            </Tr>
            <Tr>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
                <Td>{longSkeleton}</Td>
            </Tr>
        </TableWrapper>
    );
}

export default EmptyTable;
