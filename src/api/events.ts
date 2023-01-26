import { Event } from '../context/globalContext';

export const setEvents = async (
  events: Event[],
  setLoader: (indicator: boolean) => void,
) => {
  setLoader(true);
  await localStorage.setItem('savedEvents', JSON.stringify(events));
  setLoader(false);
};

export const getEvents = () => {
  return localStorage.getItem('savedEvents');
};
