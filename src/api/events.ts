import { Event } from '../context/globalContext';

export const setEvents = (events: Event[]) => {
  localStorage.setItem('savedEvents', JSON.stringify(events));
};

export const getEvents = () => {
  return localStorage.getItem('savedEvents');
};
