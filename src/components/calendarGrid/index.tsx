import { Grid } from '@chakra-ui/react';
import { Dayjs } from 'dayjs';
import React, { useContext } from 'react';
import GlobalContext from '../../context/globalContext';
import Day from './day';

const CalendarGrid = ({ month }: { month: Dayjs[][] }) => {
  const { savedEvents } = useContext(GlobalContext);

  return (
    <Grid
      templateColumns={{
        base: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(7, 1fr)',
      }}
      borderTop="2px"
      borderBottom="1px"
      borderRight="1px"
      borderLeft="2px"
      borderColor="gray.200"
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, dayI) => (
            <Day day={day} key={dayI} events={savedEvents} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default CalendarGrid;
