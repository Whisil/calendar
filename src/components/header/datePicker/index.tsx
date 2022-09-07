import { Box, Text, Button, Flex, Grid } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../../../util";
import Day from "../../calendarGrid/day";
import GlobalContext from "../../../context/globalContext";

const DatePicker = () => {
  const { setSelectedDate, selectedDate, monthIndex } =
    useContext(GlobalContext);
  const [currentMonthIndex, setCurrentMonthIndex] =
    useState<number>(monthIndex);
  const [currentMonth, setCurrentMonth] = useState<any[][]>(
    getMonth(monthIndex, dayjs().year())
  );

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex, dayjs().year()));
  }, [currentMonthIndex]);

  const handleDaySelected = (day: any) => {
    if (selectedDate && selectedDate === day.format("YYYY-MM-DD")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box
      pos="absolute"
      right="0px"
      boxShadow="lg"
      bgColor="white"
      border="1px"
      borderRadius="8px"
      borderColor="gray.200"
      p="2"
    >
      <Flex alignItems="center" gap="5px" mb="2" justify="space-between">
        <Button
          minW="unset"
          w="24px"
          h="24px"
          p="0"
          bg="transparent"
          onClick={() =>
            setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex - 1)
          }
        >
          <ChevronLeftIcon boxSize="16px" />
        </Button>
        <Text>
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}
        </Text>
        <Button
          minW="unset"
          w="24px"
          h="24px"
          p="0"
          bg="transparent"
          onClick={() =>
            setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex + 1)
          }
        >
          <ChevronRightIcon boxSize="16px" />
        </Button>
      </Flex>

      <Grid templateColumns="repeat(7, 1fr)" templateRows="6">
        {currentMonth[0].map((day, i) => (
          <Flex justify="center" alignItems="center" key={i}>
            <Text fontWeight="bold">{day.format("dd").charAt(0)}</Text>
          </Flex>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, dayIndex) => (
              <Day
                key={dayIndex}
                day={day}
                variant="picker"
                selected={handleDaySelected(day)}
                onClick={() => {
                  setSelectedDate(day);
                  localStorage.setItem(
                    "selectedDate",
                    JSON.stringify([
                      currentMonthIndex,
                      day.format("YYYY-MM-DD"),
                    ])
                  );
                  window.dispatchEvent(new Event("storage"));
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default DatePicker;
