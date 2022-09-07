import React from "react";

const GlobalContext = React.createContext<{
  monthIndex: number;
  setMonthIndex: Function;
  selectedDate: any;
  setSelectedDate: Function;
  dispatchCalEvent: Function;
  savedEvents: any[];
}>({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  selectedDate: null,
  setSelectedDate: (day: any) => {},
  dispatchCalEvent: ({
    type,
    payload,
  }: {
    type: string;
    payload: {
      title: string;
      description?: string;
      date: string;
      beginTime?: string;
      createdAt: string;
    };
  }) => {},
  savedEvents: [],
});

export default GlobalContext;
