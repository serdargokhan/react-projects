import { useRef, useState } from "react";
import { useSWRConfig } from "swr";
// UI
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useToast,
} from "@chakra-ui/react";
// Context
import { useAuth } from "context/AuthContext";
// Firebase
import { addSite } from "lib/database";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function Main({ isOpen, onClose }: Props) {
    const [siteName, setSiteName] = useState("");
    const [siteUrl, setSiteUrl] = useState("");

    const { mutate } = useSWRConfig();

    const { user } = useAuth();

    const toast = useToast();

    const initialRef = useRef(null);

    function saveData() {
        toast({
            title: "Site has been created successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
        addSite(user?.currentUser?.uid!, {
            siteName,
            siteUrl,
        });
        setTimeout(() => {
            mutate("/api/user");
        }, 500);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            initialFocusRef={initialRef}
            isCentered
            motionPreset="slideInBottom"
            size="lg"
        >
            <ModalContent>
                <ModalHeader>Create your site</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={5}>
                    <FormControl mb={5}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            onChange={(e) => setSiteName(e.target.value)}
                            ref={initialRef}
                            placeholder="Your site name"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>URL</FormLabel>
                        <Input
                            onChange={(e) => setSiteUrl(e.target.value)}
                            placeholder="Your site URL"
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={saveData} colorScheme="linkedin" mr={4}>
                        Save
                    </Button>
                    <Button colorScheme="blackAlpha" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Main;
