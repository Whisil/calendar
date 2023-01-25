import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';
import ContextWrapper from './context/contexWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const theme = extendTheme({
  fonts: {
    body: `'Roboto', sans-serif`,
  },
  layerStyles: {
    currentMonth: {
      color: 'black.400',
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </ChakraProvider>
  </React.StrictMode>,
);
