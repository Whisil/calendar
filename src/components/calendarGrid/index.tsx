import { Grid } from "@chakra-ui/react";
import React from "react";
import Day from "./day";

const CalendarGrid = ({ month }: { month: [][] }) => {
  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      borderTop="2px"
      borderBottom="1px"
      borderRight="1px"
      borderLeft="2px"
      borderColor="gray.200"
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, dayI) => (
            <Day day={day} key={dayI} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default CalendarGrid;
