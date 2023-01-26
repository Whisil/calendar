import { CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useContext, useEffect, useRef, useState } from 'react';
import { setFilterDate } from '../../api/date';
import GlobalContext from '../../context/globalContext';
import ArrowBtn from '../arrowBtn';
import DatePicker from './datePicker';
import EventModal from './eventModal';

const Header = () => {
  const { monthIndex, setMonthIndex, setEventIsSaving } =
    useContext(GlobalContext);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedMonthIndex, setSelectedMonthIndex] =
    useState<number>(monthIndex);

  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showDatePicker) return;
    function handleOutsideClick(e: Event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target as Document)
      ) {
        setShowDatePicker(false);
      }
    }
    window.addEventListener(`click`, handleOutsideClick);

    return () => window.removeEventListener(`click`, handleOutsideClick);
  }, [showDatePicker]);

  useEffect(() => {
    setMonthIndex(selectedMonthIndex);
    setFilterDate(selectedMonthIndex, setEventIsSaving);

    window.dispatchEvent(new Event('storage'));
  }, [selectedMonthIndex, setMonthIndex, setEventIsSaving]);

  useEffect(() => {
    setSelectedMonthIndex(monthIndex);
  }, [monthIndex]);

  return (
    <Flex justify="space-between" mb="24px">
      <EventModal variant="add" />

      <Flex alignItems="center" gap="15px">
        <Flex alignItems="center" gap="5px">
          <ArrowBtn
            onClick={() => setSelectedMonthIndex((prevState) => prevState - 1)}
            ariaLabel="previous month"
          />
          <Text>
            {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
          </Text>
          <ArrowBtn
            onClick={() => setSelectedMonthIndex((prevState) => prevState + 1)}
            facingRight
            ariaLabel="next month"
          />
        </Flex>

        <Box pos="relative" ref={datePickerRef}>
          <Button
            isActive={showDatePicker}
            bg="transparent"
            h="28px"
            variant="outline"
            onClick={() =>
              setShowDatePicker((showDatePicker) => !showDatePicker)
            }
            aria-label="show date picker"
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
