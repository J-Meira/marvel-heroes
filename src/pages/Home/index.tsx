import { useNavigate } from 'react-router-dom';

import { Box, Grid2, Typography } from '@mui/material';
import { Button } from '@j-meira/mui-theme';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Grid2 container className='home-page'>
      <Typography variant='h2' component='h2'>
        To start choose the state control framework:
      </Typography>
      <Box className='nav-buttons'>
        <Button
          size='large'
          onClick={() => navigate('/context')}
          fullWidth={false}
        >
          <img src='/assets/logo-context.svg' alt='logo-context' />
          <Typography variant='caption'>With Context</Typography>
        </Button>
        <Button
          size='large'
          onClick={() => navigate('/redux')}
          fullWidth={false}
        >
          <img src='/assets/logo-redux.svg' alt='logo-redux' />
          <Typography variant='caption'>With Redux</Typography>
        </Button>
      </Box>
    </Grid2>
  );
};
