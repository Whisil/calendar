import dayjs from 'dayjs';
import React, { useEffect, useReducer, useState } from 'react';
import GlobalContext from './globalContext';
import { getFilterMonth } from '../api/date';
import { getEvents, setEvents } from '../api/events';

function savedEventsReducer(
  state: any[],
  {
    type,
    payload,
  }: {
    type: string;
    payload: {
      id: string;
      title: string;
      description: string;
      date: string;
      beginTime: string;
      createdAt: string;
      updatedAt: string;
    };
  },
) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map((evt: any) => {
        return evt.id === payload.id ? payload : evt;
      });
    case 'delete':
      return state.filter((evt: any) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = getEvents();
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [monthIndex, setMonthIndex] = useState<number>(
    getFilterMonth() || dayjs().month(),
  );
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents,
  );

  const storageStateHandler = () => {
    if (getFilterMonth()) {
      setMonthIndex(getFilterMonth());
    }
  };

  useEffect(() => {
    setEvents(savedEvents);
  }, [savedEvents]);

  useEffect(() => {
    storageStateHandler();
    window.addEventListener('storage', () => {
      storageStateHandler();
    });
    return () => window.removeEventListener('storage', () => {});
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
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
