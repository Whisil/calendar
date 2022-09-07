import dayjs from "dayjs";
import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./globalContext";

function savedEventsReducer(
  state: any[],
  {
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
  }
) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt: any) => (evt.createdAt === payload.createdAt ? payload : evt));
    case "delete":
      return state.filter((evt: any) => evt.createdAt !== payload.createdAt);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [year, setYear] = useState<number>(dayjs().year());
  const [datePickerMonth, setDatePickerMonth] = useState<number>(
    dayjs().month()
  );
  const [selectedDate, setSelectedDate] = useState(
    JSON.parse(localStorage.getItem("selectedDate") as string)
  );
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (datePickerMonth !== null) {
      setMonthIndex(datePickerMonth);
    }
  }, [datePickerMonth]);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("selectedDate") as string);
    if (storage) {
      setMonthIndex(storage[1] - 1);
      setYear(storage[2]);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        year,
        setYear,
        datePickerMonth,
        setDatePickerMonth,
        selectedDate,
        setSelectedDate,
        dispatchCalEvent,
        savedEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
