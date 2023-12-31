import { BrowserRouter } from 'react-router-dom';
import { MultiProvider } from '@j-meira/mui-theme';

import { Footer, Header, UpdateSnackBar } from './components';
import { AppRoutes } from './routes';

export const App = () => (
  <MultiProvider
    snackAnchorHorizontal='right'
    snackAnchorVertical='top'
    snackAutoHideDuration={5000}
    snackMax={3}
    palette={{
      primary: {
        light: '#ffb402',
        main: '#FF9100',
        dark: '#ff7100',
        contrastText: '#fff',
      },
      secondary: {
        light: '#74706f',
        main: '#494544',
        dark: '#221e1d',
        contrastText: '#fff',
      },
    }}
  >
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
      <UpdateSnackBar />
    </BrowserRouter>
  </MultiProvider>
);
