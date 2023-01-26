export const setFilterDate = async (
  monthIndex: number,
  setLoader: (indicator: boolean) => void,
) => {
  setLoader(true);
  await localStorage.setItem('selectedDate', JSON.stringify(monthIndex));
  setLoader(false);
};

export const getFilterMonth = () => {
  return JSON.parse(localStorage.getItem('selectedDate') as string);
};
