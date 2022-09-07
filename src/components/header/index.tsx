import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import GlobalContext from "../context/globalContext";
import DatePicker from "./datePicker";
import EventModal from "./eventModal";

const Header = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { monthIndex, year, setMonthIndex } = useContext(GlobalContext);

  return (
    <Flex justify="space-between" mb="24px">
      <EventModal variant="add" />

      <Flex alignItems="center" gap="15px">
        <Flex alignItems="center" gap="5px">
          <Button
            minW="unset"
            w="24px"
            h="24px"
            p="0"
            bg="transparent"
            onClick={() => setMonthIndex(monthIndex - 1)}
          >
            <ChevronLeftIcon boxSize="16px" />
          </Button>
          <Text>
            {`${dayjs(new Date(dayjs().year(), monthIndex)).format(
              "MMMM YYYY"
            )} ${year}`}
          </Text>
          <Button
            minW="unset"
            w="24px"
            h="24px"
            p="0"
            bg="transparent"
            onClick={() => setMonthIndex(monthIndex + 1)}
          >
            <ChevronRightIcon boxSize="16px" />
          </Button>
        </Flex>

        <Box pos="relative">
          <Button
            isActive={showDatePicker}
            bg="transparent"
            h="28px"
            variant="outline"
            onClick={() =>
              setShowDatePicker((showDatePicker) => !showDatePicker)
            }
          >
            <CalendarIcon />
          </Button>
          {showDatePicker && <DatePicker />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;