import { useNavigate } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';
import { Button } from '@j-meira/mui-theme';
import { SEO } from '../../components';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Grid container className='not-found-page'>
      <SEO title='M-Heroes - 404' />
      <Typography variant='h2'>404</Typography>
      <Typography variant='h3'>Not Found!</Typography>
      <Button size='large' onClick={() => navigate('/')} fullWidth={false}>
        Black to home
      </Button>
    </Grid>
  );
};
