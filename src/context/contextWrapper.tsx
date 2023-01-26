import dayjs from 'dayjs';
import React, { useEffect, useReducer, useState } from 'react';
import GlobalContext, { Event } from './globalContext';
import { getFilterMonth } from '../api/date';
import { getEvents, setEvents } from '../api/events';
import { Center, Spinner } from '@chakra-ui/react';

function savedEventsReducer(
  state: Event[],
  {
    type,
    payload,
  }: {
    type: string;
    payload: Event;
  },
) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map((evt: Event) => {
        return evt.id === payload.id ? payload : evt;
      });
    case 'delete':
      return state.filter((evt: Event) => evt.id !== payload.id);
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventIsSaving, setEventIsSaving] = useState(false);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const storageStateHandler = () => {
    setMonthIndex(getFilterMonth());
  };

  useEffect(() => {
    setEvents(savedEvents, setEventIsSaving);
    isLoading && setIsLoading(false);
  }, [savedEvents]); // eslint-disable-line

  useEffect(() => {
    storageStateHandler();
    window.addEventListener('storage', () => {
      storageStateHandler();
    });
    return () =>
      window.removeEventListener('storage', () => storageStateHandler());
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
        eventIsSaving,
        setEventIsSaving,
      }}
    >
      {isLoading ? (
        <Center h="100px">
          <Spinner size="xl" />
        </Center>
      ) : (
        children
      )}
    </GlobalContext.Provider>
  );
}
