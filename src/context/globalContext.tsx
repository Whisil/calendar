import React from 'react';

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  beginTime?: string;
  createdAt: string;
  updatedAt?: string;
}

interface dispatchEventType {
  type: string;
  payload: Event;
}

const GlobalContext = React.createContext<{
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  selectedDate: string | null;
  setSelectedDate: (day: string | null) => void;
  dispatchCalEvent: ({ type, payload }: dispatchEventType) => void;
  savedEvents: Event[];
  eventIsSaving: boolean;
  setEventIsSaving: (indicator: boolean) => void;
}>({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  selectedDate: null,
  setSelectedDate: (day: string | null) => {},
  dispatchCalEvent: ({ type, payload }: dispatchEventType) => {},
  savedEvents: [],
  eventIsSaving: false,
  setEventIsSaving: (indicator: boolean) => {},
});

export default GlobalContext;
