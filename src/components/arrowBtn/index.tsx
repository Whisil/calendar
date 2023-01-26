import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

interface ArrowBtnProps {
  onClick(): void;
  facingRight?: boolean;
  ariaLabel: string;
}

const ArrowBtn = ({ onClick, facingRight, ariaLabel }: ArrowBtnProps) => {
  return (
    <Button
      minW="unset"
      w="24px"
      h="24px"
      p="0"
      bg="transparent"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {facingRight ? (
        <ChevronRightIcon boxSize="16px" />
      ) : (
        <ChevronLeftIcon boxSize="16px" />
      )}
    </Button>
  );
};

export default ArrowBtn;
