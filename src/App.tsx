import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import CalendarGrid from './components/calendarGrid';
import GlobalContext from './context/globalContext';
import Header from './components/header';
import { getMonth } from './util';

function App() {
  const [currentMonth, setCurrentMonth] = useState<any[]>(getMonth());

  const { monthIndex } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Box p="5" minH="100vh">
      <Header />
      <CalendarGrid month={currentMonth} />
    </Box>
  );
}

export default App;
