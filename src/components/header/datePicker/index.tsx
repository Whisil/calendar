import { Box, Text, Flex, Grid } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { getMonth } from '../../../util';
import Day from '../../calendarGrid/day';
import GlobalContext from '../../../context/globalContext';
import { setFilterDate } from '../../../api/date';
import ArrowBtn from '../../arrowBtn';

const DatePicker = () => {
  const { setSelectedDate, selectedDate, monthIndex } =
    useContext(GlobalContext);
  const [currentMonthIndex, setCurrentMonthIndex] =
    useState<number>(monthIndex);
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(
    getMonth(monthIndex, dayjs().year()),
  );

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex, dayjs().year()));
  }, [currentMonthIndex]);

  const handleDaySelected = (day: Dayjs) => {
    if (selectedDate && selectedDate === day.format('YYYY-MM-DD')) {
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
        <ArrowBtn
          onClick={() =>
            setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex - 1)
          }
          ariaLabel="date picker previous month"
        />

        <Text>
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            'MMMM YYYY',
          )}
        </Text>

        <ArrowBtn
          facingRight
          onClick={() =>
            setCurrentMonthIndex((currentMonthIndex) => currentMonthIndex + 1)
          }
          ariaLabel="date picker next month"
        />
      </Flex>

      <Grid templateColumns="repeat(7, 1fr)" templateRows="6">
        {currentMonth[0].map((day, i) => (
          <Flex justify="center" alignItems="center" key={i}>
            <Text fontWeight="bold">{day.format('dd').charAt(0)}</Text>
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
                  setSelectedDate(day.format('YYYY-MM-DD'));
                  setFilterDate(currentMonthIndex);
                  window.dispatchEvent(new Event('storage'));
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
