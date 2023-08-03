import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { Button } from '@j-meira/mui-theme';

import { ReactComponent as LogoContext } from '../../assets/logo-context.svg';
import { ReactComponent as LogoRedux } from '../../assets/logo-redux.svg';
import { SEO } from '../../components';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Grid container className='home-page'>
      <SEO title='M-Heroes' />
      <Typography variant='h2' component='h2'>
        To start choose the state control framework:
      </Typography>
      <Box className='nav-buttons'>
        <Button
          size='large'
          onClick={() => navigate('/context')}
          fullWidth={false}
        >
          <LogoContext />
          <Typography variant='caption'>With Context</Typography>
        </Button>
        <Button
          size='large'
          onClick={() => navigate('/redux')}
          fullWidth={false}
        >
          <LogoRedux />
          <Typography variant='caption'>With Redux</Typography>
        </Button>
      </Box>
    </Grid>
  );
};
