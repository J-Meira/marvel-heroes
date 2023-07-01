import { BrowserRouter } from 'react-router-dom';

import { Paper } from '@mui/material';
import { useMultiContext } from '@j-meira/mui-theme';

import { Footer, Header } from '..';

import { AppRoutes } from '../../routes';

export const Layout = () => {
  const { backgroundColor } = useMultiContext();

  return (
    <BrowserRouter>
      <Header />
      <Paper
        sx={{
          backgroundColor: backgroundColor,
        }}
        className='main-container'
        square
        elevation={0}
      >
        <AppRoutes />
      </Paper>
      <Footer />
    </BrowserRouter>
  );
};
