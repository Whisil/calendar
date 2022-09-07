import React from "react";

const GlobalContext = React.createContext<{
  monthIndex: number;
  setMonthIndex: Function;
  year: number;
  setYear: Function;
  datePickerMonth: number | null;
  setDatePickerMonth: Function;
  selectedDate: any;
  setSelectedDate: Function;
  dispatchCalEvent: Function;
}>({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  year: 0,
  setYear: (year: number) => {},
  datePickerMonth: 0,
  setDatePickerMonth: (index: number) => {},
  selectedDate: null,
  setSelectedDate: (day: any) => {},
  dispatchCalEvent: ({
    type,
    payload,
  }: {
    type: string;
    payload: {
      title: string;
      description: string;
      date: string;
      beginTime: string;
      createdAt: string;
    };
  }) => {},
});

export default GlobalContext;
