// UI
import { Button } from "@chakra-ui/react";

interface Props {
    onClick: () => void;
    title: string;
    leftIcon?: JSX.Element;
    disabled?: boolean;
    rightIcon?: JSX.Element;
}

function CustomButton({
    onClick,
    leftIcon,
    disabled,
    title,
    rightIcon,
}: Props) {
    return (
        <Button
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            onClick={onClick}
            size="lg"
            w="240px"
            colorScheme="pink"
            transitionDuration="1000ms"
            disabled={disabled}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
        >
            {title}
        </Button>
    );
}

export default CustomButton;
