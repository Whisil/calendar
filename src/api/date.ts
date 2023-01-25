export const setFilterDate = (monthIndex: number) => {
  localStorage.setItem('selectedDate', JSON.stringify(monthIndex));
};

export const getFilterMonth = () => {
  try {
    return JSON.parse(localStorage.getItem('selectedDate') as string);
  } catch (err) {
    return null;
  }
};
