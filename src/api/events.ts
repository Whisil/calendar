export const setEvents = (events: any[]) => {
  localStorage.setItem('savedEvents', JSON.stringify(events));
};

export const getEvents = () => {
  return localStorage.getItem('savedEvents');
};
