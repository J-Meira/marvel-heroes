import { BrowserRouter } from 'react-router-dom';

import { MultiProvider } from '@j-meira/mui-theme';

import { Footer, Header, PWABadge } from './components';
import { AppRoutes } from './routes';

export const App = () => (
  <MultiProvider
    snackAnchorHorizontal='right'
    snackAnchorVertical='top'
    snackAutoHideDuration={5000}
    snackMax={3}
    palette={{
      primary: {
        light: '#F04647',
        main: '#E62429',
        dark: '#C7081F',
        contrastText: '#FFFFFF',
      },
      secondary: {
        light: '#74706F',
        main: '#494544',
        dark: '#221E1D',
        contrastText: '#FFFFFF',
      },
    }}
  >
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
      <PWABadge />
    </BrowserRouter>
  </MultiProvider>
);
