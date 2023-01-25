import { Box, Button, Flex, GridItem, Text } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import GlobalContext, { Event } from '../../../context/globalContext';
import EventModal from '../../header/eventModal';

interface DayProps {
  day: Dayjs;
  variant?: 'picker';
  onClick?(): void;
  selected?: boolean;
  events?: Event[];
}

const Day = ({ day, variant, onClick, selected, events = [] }: DayProps) => {
  const { monthIndex, selectedDate } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (variant !== 'picker') {
      setDayEvents(() =>
        events.filter((evt) => evt.date === day.format('YYYY-MM-DD')),
      );
    }
  }, [events, day, variant]);

  return (
    <GridItem
      h={variant === 'picker' ? '10' : '48'}
      borderBottom={variant !== 'picker' ? '1px' : 0}
      borderRight={variant !== 'picker' ? '1px' : 0}
      borderColor="gray.200"
      borderRadius={variant !== 'picker' ? 0 : 'md'}
      p={variant !== 'picker' ? '2' : 0}
      color={
        dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY') ===
        day.format('MMMM YYYY')
          ? 'black'
          : 'blackAlpha.400'
      }
      bgColor={
        day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
          ? 'rgb(72, 187, 120, 0.3)'
          : selectedDate && day.format('YYYY-MM-DD') === selectedDate
          ? 'gray.200'
          : 'transparent'
      }
      transition="color .2s ease"
    >
      {variant !== 'picker' ? (
        <Flex justify={variant !== 'picker' ? 'space-between' : 'center'}>
          <Text fontWeight="bold" fontSize="14px">
            {day.format('D')}
          </Text>

          <Text fontWeight="bold" fontSize="14px">
            {day.format('dd')}
          </Text>
        </Flex>
      ) : (
        <Button
          size="sm"
          w="100%"
          h="100%"
          variant="ghost"
          onClick={onClick}
          isActive={selected}
          aria-label="day selection"
        >
          <Text fontWeight="bold" fontSize="14px">
            {day.format('D')}
          </Text>
        </Button>
      )}
      <Box overflowY="auto" maxH="36" h="100%">
        {dayEvents.map((item: Event) => (
          <EventModal key={item.id} selectedEvent={item}>
            <Button
              size="xs"
              colorScheme="gray"
              w="100%"
              justifyContent="flex-start"
              mb="1"
              aria-label="event selection"
            >
              {item.title}
            </Button>
          </EventModal>
        ))}
      </Box>
    </GridItem>
  );
};

export default Day;
